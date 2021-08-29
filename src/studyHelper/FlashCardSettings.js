import { Button, CardHeader, Divider } from "@material-ui/core";
import { useState } from "react";
import { FormGroup, FormControlLabel, Switch, Card } from "@material-ui/core";
import React from "react";
import "./styles/flashcard-settings.css";

function FlashCardSettings(props) {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const handleClickAwayFromMenu = (e) => {
    if (!document.getElementById("flashcard-settings").contains(e.target)) {
      handleMenuMinimize();
      window.removeEventListener("click", handleClickAwayFromMenu);
    }
  };

  const handleMenuExpansion = () => {
    setIsMenuActive(true);
    setTimeout(() => {
      window.addEventListener("click", handleClickAwayFromMenu);
    }, 0);
  };

  const handleMenuMinimize = () => {
    setIsMenuActive(false);
  };

  return (
    <div>
      <Button onClick={() => handleMenuExpansion()} variant="contained">
        Customize Flashcards
      </Button>
      {/* menu */}
      {(() => {
        if (!isMenuActive) {
          return null;
        }
        return (
          <React.Fragment>
            <div className="darken-screen" />
            <Card id="flashcard-settings">
              <CardHeader title="Customize Cards" />
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
