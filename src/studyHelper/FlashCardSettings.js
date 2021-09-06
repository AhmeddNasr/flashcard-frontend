import { Button, CardHeader, Divider, IconButton } from "@material-ui/core";
import { useState } from "react";
import { FormGroup, FormControlLabel, Switch, Card } from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import "./styles/flashcard-settings.css";
import FlashCardSettingsHome from "./FlashCardSettingsHome";
import FlashCardSettingsCustomizePlayList from "./FlashCardSettingsCustomizePlaylist";
function FlashCardSettings(props) {
  return (
    <div style={{ marginTop: "20px" }}>
      <Button onClick={() => props.handleMenuExpansion()} variant="contained">
        FlashCard Settings
      </Button>
      {/* menu */}
      {(() => {
        if (!props.isMenuActive) {
          return null;
        }
        return (
          <React.Fragment>
            <div
              className="darken-screen"
              onClick={() => props.handleMenuMinimize()}
            />
            <Card id="flashcard-settings">
              <CardHeader
                className="responsive-cardHeader"
                title="Card Settings"
                action={
                  <IconButton
                    id="flashcard-settings-action"
                    style={{
                      paddingTop: "20px",
                      backgroundColor: "transparent",
                    }}
                    onClick={() => props.handleMenuMinimize()}
                  >
                    <CloseIcon />
                  </IconButton>
                }
              />
              <Divider style={{ marginBottom: "10px" }} />
              {(() => {
                if (props.currentPage === 0) {
                  return (
                    <FlashCardSettingsHome
                      setCardFront={props.setCardFront}
                      setIsBackFaceDefault={props.setIsBackFaceDefault}
                      setShuffleCards={props.setShuffleCards}
                      shuffleCards={props.shuffleCards}
                      isBackFaceDefault={props.isBackFaceDefault}
                      setCurrentPage={(num) => props.setCurrentPage(num)}
                    />
                  );
                } else {
                  if (props.currentPage === 1) {
                    return (
                      <FlashCardSettingsCustomizePlayList
                        setCurrentPage={(num) => props.setCurrentPage(num)}
                        isCustomPlaylistDisabled={props.isCustomPlaylistDisabled}
                        setIsCustomPlaylistDisabled={props.setIsCustomPlaylistDisabled}
                        cardData={props.cardData}                
                      />
                    );
                  }
                }
              })()}
            </Card>
          </React.Fragment>
        );
      })()}
    </div>
  );
}

export default FlashCardSettings;
