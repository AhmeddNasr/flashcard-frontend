import { useEffect, useState } from "react";
import FlashCardBAK from "./FlashCardBAK";
import FlashCardControls from "./FlashCardControls";
import TermList from "./TermList";

function FlashCardTermList(props) {
  //TODO change true to user preference
  const [cardFront, setCardFront] = useState(true);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const toggleCardFront = () => {
    setCardFront(!cardFront);
  };

  const handleSpaceBar = (event) => {
    if (event.key === " " && event.target === document.body) {
      event.preventDefault();
      toggleCardFront();
    }
  };

  const incrementActiveCardIndex = () => {
    if (activeCardIndex !== props.flashCards.length - 1) {
      setActiveCardIndex(activeCardIndex + 1);
      //TODO change true to user preference
      setCardFront(true);
    }
  };

  const decrementActiveCardIndex = () => {
    if (activeCardIndex !== 0) {
      setActiveCardIndex(activeCardIndex - 1);
      //TODO change true to user preference
      setCardFront(true);
    }
  };

  const handleArrowKeys = (event) => {
    if (event.key === "ArrowRight") {
      incrementActiveCardIndex();
    }
    if (event.key === "ArrowLeft") {
      decrementActiveCardIndex();
    }
  };

  //handle key presses
  useEffect(() => {
    window.addEventListener("keydown", handleSpaceBar);
    window.addEventListener("keydown", handleArrowKeys);
    return () => {
      window.removeEventListener("keydown", handleSpaceBar);
      window.removeEventListener("keydown", handleArrowKeys);
    };
    // eslint-disable-next-line
  }, [cardFront, activeCardIndex]);

  return (
    <div>
      <div>
        <FlashCardBAK
          flashCard={props.flashCards[activeCardIndex]}
          activeCardIndex={activeCardIndex}
          cardCount={props.flashCards.length}
          nextTerm={() => props.nextTerm()}
          cardFront={cardFront}
          toggleCardFront={() => toggleCardFront()}
        />
        <FlashCardControls
          increment={() => incrementActiveCardIndex()}
          decrement={() => decrementActiveCardIndex()}
          flip={() => toggleCardFront()}
        />
      </div>
      <p className="termList-sectionTitle">
        List of terms in this class ({props.cardData.length})
      </p>
      <TermList terms={props.cardData} />
    </div>
  );
}
export default FlashCardTermList;
