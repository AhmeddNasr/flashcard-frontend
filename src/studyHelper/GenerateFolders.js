import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Add, Clear, Search } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useCallback, useState } from "react";
import React from "react";
import "./styles/class-view.css";
function GenerateFolders(props) {
  const [query, setQuery] = useState("");
  let folders = [];
  const history = useHistory();
  const handleClick = useCallback(
    (i) => history.push(`/study/class/${i}`),
    [history]
  );

  const redirectToCreateNewClass = useCallback(
    () => history.push("/study/create-new-class/"),
    [history]
  );

  //Title and search bar
  folders.push(
    <Grid item xs={12} style={{ marginTop: "30px" }}>
      <div className="class-view-title-search">
        <h1 style={{ fontSize: "2.5em", margin: "0" }}>My Classes</h1>
        <TextField
          value={query}
          onChange={(e) => {
            setQuery(e.target.value.toLowerCase());
          }}
          variant="outlined"
          style={{ maxWidth: "400px" }}
          label="Search"
          InputProps={{
            endAdornment: (
              <InputAdornment>
                {/* Display search icon if TextField is empty */}
                {query.length === 0 ? (
                  <IconButton disabled>
                    <Search />
                  </IconButton>
                ) : (
                  // Display Clickable clear button if TextField is NOT empty
                  <IconButton onClick={() => setQuery("")}>
                    <Clear />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      </div>
    </Grid>
  );

  // "Create a new class" card
  folders.push(
    <Grid item md={4} sm={6} xs={12} style={{ textAlign: "start" }}>
      <Card onClick={() => redirectToCreateNewClass()} className="classes card">
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Add fontSize="large" />
        </div>
      </Card>
    </Grid>
  );

  for (let i = 0; i < props.folders.length; i++) {
    let currentFolder = props.folders[i];
    if (query.length > 0) {
      if (
        !currentFolder.name.toLowerCase().includes(query) &&
        !currentFolder.description.toLowerCase().includes(query)
      ) {
        continue;
      }
    }
    // generate all cards
    folders.push(
      <Grid
        item
        md={4}
        sm={6}
        xs={12}
        style={{ textDecoration: "none", textAlign: "start" }}
      >
        <Card
          onClick={() => {
            handleClick(currentFolder.folder_id);
          }}
          className={"classes card"}
        >
          <div component={Button}>
            <CardHeader
              className="responsive-cardHeader"
              title={currentFolder.name}
              style={{ paddingBottom: "0px" }}
            />
            <CardContent style={{ paddingTop: "0px" }}>
              <div style={{ fontStyle: "italic" }}>
                {currentFolder.count > 0
                  ? `${currentFolder.count} ${
                      currentFolder.count > 1 ? "terms" : "term"
                    }`
                  : "This Class Is Empty"}
              </div>
              <div style={{ paddingTop: "12px" }}>
                {currentFolder.description}
              </div>
            </CardContent>
          </div>
        </Card>
      </Grid>
    );
  }
  return folders;
}

export default GenerateFolders;
