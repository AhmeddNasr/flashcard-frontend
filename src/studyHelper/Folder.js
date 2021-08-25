import { useState, useEffect } from "react";
import TermList from "./TermList";
import generateFlashcards from "./generateFlashcards";
import fetchTerms from "./fetchTerms";
import "./styles/studyHelper.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import FlashCardBAK from "./FlashCardBAK";
import FlashCardTermList from "./FlashCardTermList";
function Folder(props) {
  // auto size text area
  useEffect(() => {
    fetchTerms(props.match.params.folderID, setcardData);
  }, []);

  // index of displayed term on the flash card
  const [activeTerm, setActiveTerm] = useState(0);
  const [cardData, setcardData] = useState(null);

  //display loading spinner while fetching terms
  if (cardData === null) {
    return (
      //center
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <CircularProgress
          color="white"
          size={60}
          style={{ height: "30%", marginTop: "30vh" }}
        />
      </div>
    );
  }

  //display flashcard, and term list if the class is not empty and contains some terms
  if (cardData.length > 0) {
    let flashcards = generateFlashcards(cardData, null);

    // cycle displayed term when 'I got it' or 'Study again' button is pressed
    const nextTerm = () => {
      setActiveTerm((activeTerm + 1) % flashcards.length);
    };

    return (
      <FlashCardTermList
        nextTerm={() => nextTerm()}
        cardData={cardData}
        activeFlashCard={flashcards[activeTerm]}
      />
    );
  }

  //If folder is empty
  return (
    <div>
      <h1>It looks like this class is empty!</h1>
      <Button
        component={Link}
        to={"/study/create-new-class"}
        variant="contained"
        color="secondary"
        style={{ textDecoration: "none" }}
      >
        Add some terms
      </Button>
    </div>
  );
}

export default Folder;
