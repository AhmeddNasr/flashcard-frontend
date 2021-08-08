import FetchFolders from "./FetchFolders";
// import { ThemeProvider } from "@material-ui/core/styles";
// import {CssBaseLine, Button} from "@material-ui/core"

function Index() {
  return (
    <div>
      <h1 style={{fontSize: '2.5em'}}>My Classes</h1>
      <FetchFolders />
    </div>
  );
}

export default Index;
