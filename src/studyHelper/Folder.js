import { useState, useEffect } from "react";
import fetchTerms from "./fetchTerms";
// import "./styles/studyHelper.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import FlashCardTermList from "./FlashCardTermList";
import CenteredSpinner from "./CenteredSpinner";

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
      <CenteredSpinner />
    );
  }

  //display flashcard, and term list if the class is not empty and contains some terms
  if (cardData.length > 0) {
    return (
      <FlashCardTermList
        cardData={cardData}
      />
    );
  }

  //If folder is empty
  return (
    <div>
      <h1>It looks like this class is empty!</h1>
      <Button
        component={Link}
        to={`/study/class/${props.match.params.folderID}/edit`}
        variant="contained"
        color="secondary"
        style={{ textDecoration: "none" }}
      >
        Start adding some terms
      </Button>
    </div>
  );
}

export default Folder;
