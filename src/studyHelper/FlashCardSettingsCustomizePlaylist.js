import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import generateFlashcards from "./generateFlashcards";

function FlashCardSettingsCustomizePlaylist(props) {
  const [query, setQuery] = useState("");
  const [queryTarget, setQueryTarget] = useState("question");
  const [isValidQuery, setIsValidQuery] = useState(false);
  const [queryMessage, setQueryMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [noCardsFound, setNoCardsFound] = useState(false);

  //check if query is valid after user stopped typing
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setTyping(false);
      let count = checkValidityOfQuery();
      if (count > 0 && query.length > 0) {
        setQueryMessage(`${count} Cards found`);
        setIsValidQuery(true);
        setNoCardsFound(false);
      } else {
        if (query.length > 0) {
          setQueryMessage("Less than 2 Cards found");
          setNoCardsFound(true);
        }
      }
    }, 1000);
    return () => {
      setTyping(true);
      setIsValidQuery(false);
      setNoCardsFound(false);
      clearTimeout(timeOutId);
      setQueryMessage("");
    };
  }, [query]);

  function checkValidityOfQuery() {
    let queryObject = {
      queryTarget: "term",
      flashcardQuery: query,
    };
    let cardCount = generateFlashcards(
      props.cardData,
      false,
      queryObject
    ).length;
    if (cardCount < 2) {
      return -cardCount;
    }
    return cardCount;
  }

  return (
    <React.Fragment>
      <FormControlLabel
        control={
          <Switch
            checked={props.isCustomPlaylistDisabled}
            color="secondary"
            name="customPlaylist"
            onChange={(e) => {
              props.setIsCustomPlaylistDisabled(e.target.checked);
            }}
          />
        }
        label="Play all Cards"
      />
      {(() => {
        if (props.isCustomPlaylistDisabled) {
          return null;
        }
        return (
          <React.Fragment>
            <p style={{ margin: "10px 0 5px 0" }}>Selected Field: </p>
            <div>
              <div>
                <FormControl
                  variant="outlined"
                  color="secondary"
                  style={{ margin: "10px 0", width: "200px" }}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Filter on Field
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={queryTarget}
                    onChange={(e) => {
                      setQueryTarget(e.target.value);
                    }}
                    label="Filter Selected Field"
                  >
                    <MenuItem value={"question"}>Question</MenuItem>
                    <MenuItem value={"answer"}>Answer</MenuItem>
                    <MenuItem value={"term"}>Term</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <p style={{ margin: "10px 0" }}>Must Contain:</p>
              <TextField
                name="query"
                label="Query"
                color="secondary"
                variant="outlined"
                autoComplete="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ width: "200px" }}
                helperText={queryMessage}
                error={noCardsFound}
                placeholder="e.g. President"
              />
              {(() => {
                if (typing) {
                  return (
                    <CircularProgress
                      size="1.5rem"
                      style={{ margin: "0.75rem" }}
                      color="secondary"
                    />
                  );
                }
              })()}
            </div>
          </React.Fragment>
        );
      })()}

      <div>
        <Button
          onClick={() => {
            props.setCurrentPage(0);
          }}
          variant="outlined"
          style={{ marginTop: "15px" }}
        >
          back
        </Button>
        {(() => {
          if (!props.isCustomPlaylistDisabled) {
            return (
              <Button
                variant="outlined"
                style={{ marginTop: "15px", marginLeft: "5px" }}
                onClick={() => console.log("lol")}
                disabled={!isValidQuery}
              >
                apply filter
              </Button>
            );
          }
        })()}
      </div>
    </React.Fragment>
  );
}

export default FlashCardSettingsCustomizePlaylist;
