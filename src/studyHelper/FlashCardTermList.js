import { useEffect, useState } from "react";
import FlashCardBAK from "./FlashCardBAK";
import TermList from "./TermList";

function FlashCardTermList(props) {
  const [cardFront, setCardFront] = useState(true);

  const toggleCardFront = () => {
    setCardFront(!cardFront);
  };

  const handleSpaceBar = (event) => {
    if (event.key === " ") {
      event.preventDefault();
      toggleCardFront();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleSpaceBar);

    return () => {
      window.removeEventListener("keydown", handleSpaceBar);
    };
  }, [cardFront]);

  return (
    <div>
      <div>
        <FlashCardBAK
          flashcard={props.activeFlashCard}
          nextTerm={() => props.nextTerm()}
          cardFront={cardFront}
          toggleCardFront={() => toggleCardFront()}
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
