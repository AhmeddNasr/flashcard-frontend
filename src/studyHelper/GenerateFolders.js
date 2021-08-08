import {
  Card,
  IconButton,
  CardContent,
  CardActions,
  CardHeader,
  Grid,
  ButtonBase,
  Button,
} from "@material-ui/core";
import { Share, Edit, Add } from "@material-ui/icons";

import { Link, useHistory } from "react-router-dom";
import { useCallback } from "react";
function GenerateFolders(props) {
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
  // add new card
  folders.push(
    <Grid item md={4} sm={6} xs={12} style={{ textAlign: "start" }}>
      <Card onClick={() => redirectToCreateNewClass()} className="classes">
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
          className={"classes"}
        >
          <div component={Button}>
            <CardHeader
              title={currentFolder.name}
              style={{ paddingBottom: "0px" }}
            ></CardHeader>
            <CardContent style={{ paddingTop: "0px" }}>
              <div style={{ fontStyle: "italic" }}>
                {currentFolder.count > 0
                  ? `${currentFolder.count} terms`
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
