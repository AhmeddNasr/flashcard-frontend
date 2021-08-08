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
import { Share, Edit } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";
function GenerateFolders(props) {
  let folders = [];
  const history = useHistory();
  const handleClick = useCallback(
    (i) => history.push(`/study/class/${i}`),
    [history]
  );
  for (let i = 0; i < props.folders.length; i++) {
    let currentFolder = props.folders[i];
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
              <div>
                {currentFolder.count > 0
                  ? `${currentFolder.count} terms`
                  : "This Class Is Empty"}
              </div>
              <div style={{paddingTop: '12px'}}>{currentFolder.description}</div>
            </CardContent>
          </div>
          {/* <CardActions >
            <IconButton>
              <Share className="classes-icons" />
            </IconButton>
            <IconButton>
              <Edit className="classes-icons" />
            </IconButton>
          </CardActions> */}
        </Card>
      </Grid>
    );
  }
  return folders;
}

export default GenerateFolders;
