import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core";
import React from "react";
// eslint-disable-next-line
const generateLongWord = (count) => {
  let string = "";
  for (let i = 0; i < count; i++) {
    string += "r";
  }
  return string;
};

function FlashCard(props) {
  let currentFlashCard = props.flashCard;
  let cardFront = props.cardFront;
  return (
    <Card
      id="flashcard"
      onClick={() => {
        if (props.cardCount === props.activeCardIndex) {
          props.increment();
        } else {
          props.toggleCardFront();
        }
      }}
      style={{
        maxWidth: "700px",
        height: "350px",
        userSelect: "none",
        margin: "30px auto",
      }}
      className="card"
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
          // if user reached end of flashcards and tried to go to the next flashcard
          if (props.cardCount === props.activeCardIndex) {
            return (
              <React.Fragment>
                <CardHeader title="You are all done!" />
                <Button variant="contained" onClick={() => props.increment()}>
                  Restart
                </Button>
              </React.Fragment>
            );
          }
          //show the front of the card
          if (cardFront) {
            return (
              <React.Fragment>
                <div>
                  <CardHeader title={currentFlashCard.title} />
                </div>
                <div>{currentFlashCard.question}</div>
              </React.Fragment>
            );
          }
          //else show back of the card
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
        })()}
      </CardContent>
      <CardActions style={{ height: "40px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {(() => {
            if (props.cardCount === props.activeCardIndex) {
              return (
                <div>
                  {props.cardCount} / {props.cardCount}
                </div>
              );
            }
            return (
              <div>
                {props.activeCardIndex + 1} / {props.cardCount}
              </div>
            );
          })()}
        </div>
      </CardActions>
    </Card>
  );
}

export default FlashCard;
