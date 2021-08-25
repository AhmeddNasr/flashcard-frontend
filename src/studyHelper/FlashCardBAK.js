import { Card, CardHeader } from "@material-ui/core";
import React from "react";

function FlashCardBAK(props) {
  let cardFront = props.cardFront;
  return (
    <Card
      onClick={() => {
        props.toggleCardFront();
      }}
      style={{maxWidth: "700px", height: "350px", userSelect: "none", margin: "30px auto" }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        {(() => {
          if (cardFront) {
            return (
              <React.Fragment>
                <div>
                  <CardHeader title="Term" />
                </div>
                <div>Question</div>
              </React.Fragment>
            );
          } else {
            return <div>Answer</div>;
          }
        })()}
      </div>
    </Card>
  );
}

export default FlashCardBAK;
