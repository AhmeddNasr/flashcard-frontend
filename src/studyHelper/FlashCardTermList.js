import { useEffect, useState } from "react";
import FlashCardBAK from "./FlashCardBAK";
import FlashCardControls from "./FlashCardControls";
import TermList from "./TermList";

function FlashCardTermList(props) {
  //TODO change true to user preference
  const [cardFront, setCardFront] = useState(true);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  //prevent user from accidentally going to the end of cards by pressing left arrow on activeCardIndex 0
  const [buffer, setBuffer] = useState(0);

  //TODO
  // const [isKeyBeingHeldDown, setIsKeyBeingHeldDown] = useState(false);

  const toggleCardFront = () => {
    setCardFront(!cardFront);
  };

  const handleSpaceBar = (event) => {
    if (activeCardIndex === props.flashCards.length) {
      event.preventDefault();
      return setActiveCardIndex(0);
    }
    if (event.key === " " && event.target === document.body) {
      event.preventDefault();
      toggleCardFront();
    }
  };

  const incrementActiveCardIndex = () => {
    if (activeCardIndex !== props.flashCards.length) {
      setActiveCardIndex(activeCardIndex + 1);
    } else {
      //go back to the beginning when end is reached
      setActiveCardIndex(0);
    }
    //TODO change true to user preference
    setCardFront(true);
  };

  const decrementActiveCardIndex = () => {
    if (activeCardIndex !== 0) {
      setActiveCardIndex(activeCardIndex - 1);
      //TODO change true to user preference
      setCardFront(true);
    } else {
      if (buffer === 0) {
        setBuffer(1);
      } else {
        setActiveCardIndex(props.flashCards.length-1);
      }
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
  }, [cardFront, activeCardIndex, buffer]);

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
          increment={() => incrementActiveCardIndex()}
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
