import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core";
import React from "react";

const generateLongWord = (count) => {
  let string = "";
  for (let i = 0; i < count; i++) {
    string += "r";
  }
  return string;
};

function FlashCardBAK(props) {
  let currentFlashCard = props.flashCard;
  let cardFront = props.cardFront;
  return (
    <Card
      id="flashcard"
      onClick={() => {
        props.toggleCardFront();
      }}
      style={{
        maxWidth: "700px",
        height: "350px",
        userSelect: "none",
        margin: "30px auto",
      }}
    >
      <CardContent
        style={{
          height: "310px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {(() => {
          if (cardFront) {
            return (
              <React.Fragment>
                <div>
                  <CardHeader title={currentFlashCard.title} />
                </div>
                <div>{currentFlashCard.question}</div>
              </React.Fragment>
            );
          } else {
            return (
              <p
                style={{
                  overflow: "auto",
                  wordBreak: "break-word",
                  hyphens: "auto",
                }}
              >
                {currentFlashCard.answer}
              </p>
            );
          }
        })()}
      </CardContent>
      <CardActions style={{ height: "40px" }}>
        <div style={{ display: "flex", justifyContent: "center", width: '100%' }}>
          {props.activeCardIndex + 1} / {props.cardCount}
        </div>
      </CardActions>
    </Card>
  );
}

export default FlashCardBAK;
