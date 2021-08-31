import { Button, CardHeader, Divider, IconButton } from "@material-ui/core";
import { useState } from "react";
import { FormGroup, FormControlLabel, Switch, Card } from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import "./styles/flashcard-settings.css";

function FlashCardSettings(props) {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const handleMenuExpansion = () => {
    setIsMenuActive(true);
  };

  const handleMenuMinimize = () => {
    setIsMenuActive(false);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Button onClick={() => handleMenuExpansion()} variant="contained">
        Customize Flashcards
      </Button>
      {/* menu */}
      {(() => {
        console.log(isMenuActive);
        if (!isMenuActive) {
          return null;
        }
        return (
          <React.Fragment>
            <div
              className="darken-screen"
              onClick={() => handleMenuMinimize()}
            />
            <Card id="flashcard-settings">
              <CardHeader
                className="responsive-cardHeader"
                title="Customize Cards"
                action={
                  <IconButton
                    id="flashcard-settings-action"
                    style={{
                      paddingTop: "20px",
                      backgroundColor: "transparent",
                    }}
                    onClick={() => handleMenuMinimize()}
                  >
                    <CloseIcon />
                  </IconButton>
                }
              />
              <Divider style={{ marginBottom: "10px" }} />
              <form>
                <FormGroup column>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={props.shuffleCards}
                        color="secondary"
                        name="shuffleCards"
                        onChange={(e) =>
                          props.setShuffleCards(e.target.checked)
                        }
                      />
                    }
                    label="Shuffle cards"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={props.isFrontFaceDefault}
                        color="secondary"
                        name="defaultFace"
                        onChange={(e) =>
                          props.setIsFrontFaceDefault(e.target.checked)
                        }
                      />
                    }
                    label="Show Answer First"
                  />
                </FormGroup>
              </form>
            </Card>
          </React.Fragment>
        );
      })()}
    </div>
  );
}

export default FlashCardSettings;
