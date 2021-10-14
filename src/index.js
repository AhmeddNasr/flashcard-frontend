import React from "react";
import ReactDOM from "react-dom";
import "./studyHelper/styles/colors.css"
import "./index.css";
import App from "./App";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Index from "./studyHelper/Index";
import Folder from "./studyHelper/Folder";
import CreateClass from "./studyHelper/CreateClass";
import EditClass from "./studyHelper/EditClass";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import ErrorPage from "./studyHelper/ErrorPage";
import MyAppBar from "./MyAppBar";

function HandleAuthentication() {
  const [authenticationHandled, setAuthenticationHandled] = React.useState([
    false,
    false,
  ]);

  const updateAuthentication = (bool) => {
    setAuthenticationHandled([true, bool]);
  };

  function isLoggedIn() {
    fetch("http://localhost:8080/loggedin", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => updateAuthentication(data.logged_in))
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    isLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (authenticationHandled[0]) {
    if (!authenticationHandled[1]) {
      window.location.href = "http://localhost:8080/google";
      return null;
    }
  }

  if (!authenticationHandled[0]) {
    return null;
  } else {
    if (authenticationHandled[1]) {
      return (
        <BrowserRouter>
          <div>
            {/* TODO automate generation of Links */}
            <MyAppBar />
            <Container maxWidth="lg">
              <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/study" component={Index}></Route>
                <Route
                  exact
                  path="/study/create-new-class"
                  component={CreateClass}
                ></Route>
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
        </BrowserRouter>
      );
    }
  }
}

const theme = createTheme({
  palette: {
    type: "dark",
    background: {
      default: "#181a1f"
    },
    primary: {
      main: "#fff",
    },
    palette: {
      background: {
        default: "#13141b",
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HandleAuthentication />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
