import { useEffect, useState } from "react";
import FlashCard from "./FlashCard";
import FlashCardControls from "./FlashCardControls";
import TermList from "./TermList";
import generateFlashcards from "./generateFlashcards";
import FlashCardSettings from "./FlashCardSettings";
import { Button } from "@material-ui/core";
// import { Button } from "@material-ui/core";

function FlashCardTermList(props) {
  const [isBackFaceDefault, setIsBackFaceDefault] = useState(false);
  const [shuffleCards, setShuffleCards] = useState(false);
  const [cardFront, setCardFront] = useState(!isBackFaceDefault);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [flashCards, setFlashCards] = useState(
    generateFlashcards(props.cardData, shuffleCards)
  );
  const [isCustomPlaylistDisabled, setIsCustomPlaylistDisabled] =
    useState(true);
  //prevent user from accidentally going to the end of cards by pressing left arrow on activeCardIndex 0
  const [buffer, setBuffer] = useState(0);

  //flashcard settings
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  //filter cards
  const [flashcardQuery, setFlashcardQuery] = useState("Benzo");
  const [queryTarget, setQueryTarget] = useState(["term"]);

  const regenerateCards = () => {
    let query;
    if (!isCustomPlaylistDisabled) {
      query = {
        flashcardQuery,
        queryTarget,
      };
    }
    setActiveCardIndex(0);
    setFlashCards(generateFlashcards(props.cardData, shuffleCards, query));
  };

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
        regenerateCards();
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

  const handleMenuExpansion = () => {
    setIsMenuActive(true);
    document.body.style.overflow = "hidden";
  };

  const handleMenuMinimize = () => {
    setIsMenuActive(false);
    document.body.style.overflow = "initial";
    setCurrentPage(0);
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

  // let flashCards = generateFlashcards(props.cardData, shuffleCards);

  useEffect(() => {
    regenerateCards();
  }, [shuffleCards]);

  return (
    <div>
      <Button onClick={() => regenerateCards()}>Regenerate</Button>
      <div>
        <FlashCard
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
          setShuffleCards={setShuffleCards}
          shuffleCards={shuffleCards}
          regenerateCards={regenerateCards}
          handleMenuExpansion={handleMenuExpansion}
        />
      </div>
      <FlashCardSettings
        isBackFaceDefault={isBackFaceDefault}
        setIsBackFaceDefault={setIsBackFaceDefault}
        shuffleCards={shuffleCards}
        setShuffleCards={setShuffleCards}
        setCardFront={setCardFront}
        regenerateCards={regenerateCards}
        isCustomPlaylistDisabled={isCustomPlaylistDisabled}
        setIsCustomPlaylistDisabled={setIsCustomPlaylistDisabled}
        handleMenuExpansion={handleMenuExpansion}
        handleMenuMinimize={handleMenuMinimize}
        isMenuActive={isMenuActive}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setFlashcardQuery={setFlashcardQuery}
        setQueryTarget={setQueryTarget}
        cardData={props.cardData}
      />

      <TermList terms={props.cardData} />
    </div>
  );
}
export default FlashCardTermList;
