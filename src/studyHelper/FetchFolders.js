import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import GenerateFolders from "./GenerateFolders";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./styles/style.css";
//TODO LAZY LOADING

function FetchFolders() {
  // eslint-disable-next-line
  const [folders, setFolders] = useState([false, []]);
  useEffect(() => {
    //TODO replace 8777 with ${id}
    //empty user 908858
    fetch("http://localhost:8080/api/folders/8777", { credentials: "include" })
      .then((result) => {
        if (result.ok) {
          return result.json();
        } else {
          window.location.href = "/error";
        }
      })
      .then((data) => {
        let folders = [];
        for (let i = 0; i < data.folders.length; i++) {
          //TODO is this needed?
          let currentFolder = data.folders[i];
          folders.push({
            name: currentFolder.name,
            description: currentFolder.description,
            folder_id: currentFolder.folder_id,
            count: currentFolder.count,
          });
        }
        setFolders([true, folders]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //folders[0] => checks if the request was completed
  //folders[1] => the folder response
  if (folders[0] === true && folders[1].length === 0) {
    return (
      <div>
        <h1 style={{fontSize: '2.5em'}}>My Classes</h1>
        <h4>It looks like you don't have any classes!</h4>
        <Button
          component={Link}
          to={"/study/create-new-class"}
          variant="contained"
          color="secondary"
        >
          Create your first class
        </Button>
      </div>
    );
  }

  if (folders[0] === true) {
    return (
      <Grid
        spacing={4}
        container
        align="center"
      >
        <GenerateFolders folders={folders[1]} />
      </Grid>
    );
  } else {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress color="white" style={{ marginTop: "15%" }} />
      </div>
    );
  }
}

export default FetchFolders;
