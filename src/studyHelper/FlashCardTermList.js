import { useEffect, useState } from "react";
import FlashCardBAK from "./FlashCardBAK";
import FlashCardControls from "./FlashCardControls";
import TermList from "./TermList";
import generateFlashcards from "./generateFlashcards";
import FlashCardSettings from "./FlashCardSettings";

function FlashCardTermList(props) {
  const [isBackFaceDefault, setIsBackFaceDefault] = useState(false);
  const [shuffleCards, setShuffleCards] = useState(false);
  //TODO
  const [cardFront, setCardFront] = useState(!isBackFaceDefault);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  //prevent user from accidentally going to the end of cards by pressing left arrow on activeCardIndex 0
  const [buffer, setBuffer] = useState(0);

  //TODO handle keys being held down

  const toggleCardFront = () => {
    setCardFront(!cardFront);
  };

  //spacebar and enter
  const handleSpaceBar = (event) => {
    if (activeCardIndex === flashCards.length) {
      event.preventDefault();
      return setActiveCardIndex(0);
    }
    if (
      (event.key === " " || event.key === "Enter") &&
      event.target === document.body
    ) {
      event.preventDefault();
      toggleCardFront();
    }
  };

  const incrementActiveCardIndex = () => {
    if (activeCardIndex !== flashCards.length) {
      setActiveCardIndex(activeCardIndex + 1);
    } else {
      //go back to the beginning when end is reached
      setActiveCardIndex(0);
      if (shuffleCards) {
        flashCards = generateFlashcards(shuffleCards);
      }
    }
    setCardFront(!isBackFaceDefault);
  };

  const decrementActiveCardIndex = () => {
    if (activeCardIndex !== 0) {
      setActiveCardIndex(activeCardIndex - 1);
      setCardFront(!isBackFaceDefault);
    } else {
      if (buffer === 0) {
        setBuffer(1);
      } else {
        setActiveCardIndex(flashCards.length - 1);
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

  const handleShuffle = () => {
    setShuffleCards(!shuffleCards);
    setActiveCardIndex(0);
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
  }, [cardFront, activeCardIndex, buffer, isBackFaceDefault]);

  let flashCards = generateFlashcards(props.cardData, shuffleCards);

  return (
    <div>
      <div>
        <FlashCardBAK
          flashCard={flashCards[activeCardIndex]}
          activeCardIndex={activeCardIndex}
          cardCount={flashCards.length}
          nextTerm={() => props.nextTerm()}
          cardFront={cardFront}
          toggleCardFront={() => toggleCardFront()}
          increment={() => incrementActiveCardIndex()}
        />
        <FlashCardControls
          increment={() => incrementActiveCardIndex()}
          decrement={() => decrementActiveCardIndex()}
          flip={() => toggleCardFront()}
          shuffle={() => handleShuffle()}
          isShuffled={shuffleCards}
        />
      </div>
      <FlashCardSettings 
          isBackFaceDefault={isBackFaceDefault}
          setIsBackFaceDefault={setIsBackFaceDefault}
          shuffleCards={shuffleCards}
          setShuffleCards={setShuffleCards}
          setCardFront={setCardFront}
        />
      <p className="termList-sectionTitle">
        List of terms in this class ({props.cardData.length})
      </p>
      <TermList terms={props.cardData} />
    </div>
  );
}
export default FlashCardTermList;
