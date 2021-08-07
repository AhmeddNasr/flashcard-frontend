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
    fetch("http://localhost:8080/api/folders/87677", { credentials: "include" })
      .then((result) => {
        if (result.ok) {
          return result.json();
        }
      })
      .then((data) => {
        let folders = [];
        for (let i = 0; i < data.folders.length; i++) {
          let currentFolder = data.folders[i];
          folders.push({
            name: currentFolder.name,
            description: currentFolder.description,
            id: currentFolder.folder_id,
          });
        }
        setFolders([true, folders]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (folders[0] === true && folders[1].length === 0) {
    return (
      <div>
        <h4>It looks like you don't have any classes!</h4>
        <Button
          component={Link}
          to={"/study/create-new-class"}
          variant="contained"
        >
          Create your first class
          {/* <Link to="/study/create-new-class/" className="plain-link">
            Create your first class
          </Link> */}
        </Button>
      </div>
    );
  }

  if (folders[0] === true) {
    return (
      <Grid spacing={4} container direction="row" align="center">
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
