import { useState, useEffect } from "react";
import FlashCard from "./FlashCard";
import TermList from "./TermList";
import NewTerm from "./NewTerm";
import textareaAutoSize from "./textareaAutoSize";
import addItemToArray from "./addItem";
import generateFlashcards from "./generateFlashcards";
import fetchTerms from "./fetchTerms";
import "./styles/studyHelper.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import FlashCardBAK from "./FlashCardBAK";
function Folder(props) {
  // auto size text area
  useEffect(() => {
    textareaAutoSize();
    fetchTerms(props.match.params.folderID, setcardData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // index of displayed term on the flash card
  const [activeTerm, setActiveTerm] = useState(0);
  const [cardData, setcardData] = useState(null);

  const addItem = () => {
    let newArray = addItemToArray(cardData);
    // check if error occured (when input is empty))
    if (newArray) {
      setcardData(newArray);
    }
  };

  //While fetching terms
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

  //check if folder is NOT empty
  if (cardData.length > 0) {
    let flashcards = generateFlashcards(cardData, null);

    // cycle displayed term when 'I got it' or 'Study again' button is pressed
    const nextTerm = () => {
      setActiveTerm((activeTerm + 1) % flashcards.length);
    };
    return (
      <div id="studyHelper">
        <FlashCardBAK 
          flashcard={flashcards[activeTerm]}
        />
        <FlashCard
          flashcard={flashcards[activeTerm]}
          nextTerm={() => nextTerm()}
        />
        <NewTerm addItem={(arr) => addItem(arr)} />
        <p className="termList-sectionTitle">
          List of terms in this class ({cardData.length})
        </p>
        <TermList terms={cardData} />
      </div>
    );
  }

  //If folder is empty
  return (
    <div>
      <h1>It looks like you have any terms</h1>
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
