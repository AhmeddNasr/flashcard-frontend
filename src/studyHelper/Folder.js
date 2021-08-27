import { useState, useEffect } from "react";
import generateFlashcards from "./generateFlashcards";
import fetchTerms from "./fetchTerms";
// import "./styles/studyHelper.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import FlashCardTermList from "./FlashCardTermList";
function Folder(props) {
  // index of displayed term on the flash card
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    fetchTerms(props.match.params.folderID, setCardData);
    // eslint-disable-next-line
  }, []);

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
    return (
      <FlashCardTermList
        cardData={cardData}
        flashCards={flashcards}
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
