import { Container } from "@material-ui/core";
import { Folder } from "@material-ui/icons";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import MyAppBar from "./MyAppBar";
import CreateClass from "./studyHelper/CreateClass";
import EditClass from "./studyHelper/EditClass";
import ErrorPage from "./studyHelper/ErrorPage";
import Index from "./studyHelper/Index";

function AuthenticatedRouter() {
  return (
      <div>
        {/* TODO automate generation of Links */}
        <MyAppBar />
        <Container maxWidth="lg">
          <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/study" component={Index} />
            <Route
              exact
              path="/study/create-new-class"
              component={CreateClass}
            />
            <Route
              exact
              path="/study/class/:folderID/edit"
              component={EditClass}
            />
            <Route exact path="/study/class/:folderID" component={Folder} />
            <Route path="/" component={ErrorPage} />
          </Switch>
        </Container>
      </div>
  );
}

export default AuthenticatedRouter;