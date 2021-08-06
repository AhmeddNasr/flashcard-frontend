import {
  Card,
  IconButton,
  CardContent,
  CardActions,
  CardHeader,
  Grid,
} from "@material-ui/core"; 
import { Share, Edit } from "@material-ui/icons";
function GenerateFolders(props) {
  let folders = [];
  for (let i = 0; i < props.folders.length; i++) {
    let currentFolder = props.folders[i];
    folders.push(
      <Grid item xlg={4} md={6} xs={12} style={{ maxWidth: "300px" }}>
        <Card style={{backgroundColor: 'lightblue'}}>
          <CardHeader title={currentFolder.name}>
          </CardHeader>
          <CardContent>
            <div >
              {currentFolder.description}
            </div>
          </CardContent>
          <CardActions>
            <IconButton>
              <Share />
            </IconButton>
            <IconButton>
              <Edit />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    );
  }
  return folders;
}
// folders[1].forEach((folder) => {
//   foldersDOM.push(
//     <Grid item xlg={4} md={6} xs={12}>
//       <Button className="cry" variant="contained" color="secondary">
//         <Link to={`/study/folder/${folder.id}`} className="plain-link">
//           {folder.name}
//         </Link>
//       </Button>
//     </Grid>
//   );
// });

export default GenerateFolders;
