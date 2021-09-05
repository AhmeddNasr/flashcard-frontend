import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";

function FlashCardSettingsCustomizePlaylist(props) {
  const [query, setQuery] = useState("");
  const [queryTarget, setQueryTarget] = useState("");
  
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
            <Divider style={{margin: '5px 0'}} />
            <p style={{ margin: "10px 0 5px 0" }}>Selected Field: </p>
            <div>
              <div>
                <FormControl
                  variant="outlined"
                  color="secondary"
                  style={{ margin: "10px 0", width: "200px" }}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Field
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    // value={age}
                    // onChange={handleChange}
                    label="Filter Selected Field"
                  >
                    <MenuItem value={"term"}>Term</MenuItem>
                    <MenuItem value={"question"}>Question</MenuItem>
                    <MenuItem value={"answer"}>Answer</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <p>Must Contain:</p>
              <TextField
                name="query"
                label="Query"
                color="secondary"
                variant="outlined"
                style={{ width: "200px" }}
              />
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
      </div>
    </React.Fragment>
  );
}

export default FlashCardSettingsCustomizePlaylist;
