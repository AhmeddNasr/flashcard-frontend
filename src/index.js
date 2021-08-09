import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Index from "./studyHelper/Index";
import Folder from "./studyHelper/Folder";
import CreateClass from "./studyHelper/CreateClass";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import ErrorPage from "./studyHelper/ErrorPage";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { Menu, Info, AddBox, ExitToApp } from "@material-ui/icons";
function HandleAuthentication() {
  const [authenticationHandled, setAuthenticationHandled] = React.useState([
    false,
    false,
  ]);

  const updateAuthentication = (bool) => {
    console.log(bool);
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
            <AppBar position="sticky">
              <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                  <Menu />
                </IconButton>
                <Typography variant="h6">
                  <Link to="/study">Home</Link>
                </Typography>
                <ul id="appbar-navigation-large" className="appbar-navigation">
                  <li>
                    <Link to="/study">
                      <Typography variant="h6">My Classes</Typography>
                    </Link>
                  </li>
                  <li>
                    <Link to="/study/create-new-class">
                      <Typography variant="h6">Create</Typography>
                    </Link>
                  </li>
                  <li>
                    <Link to="/about">
                      <Typography variant="h6">About</Typography>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        window.location.href = "http://localhost:8080/logout";
                      }}
                    >
                      <Typography variant="h6">logout</Typography>
                    </Link>
                  </li>
                </ul>

                <ul id="appbar-navigation-small" className="appbar-navigation">
                  <li style={{ color: "black" }}>
                    <IconButton color="inherit">
                      <Link to="/study/create-new-class">
                        <AddBox />
                      </Link>
                    </IconButton>
                  </li>
                  <li>
                    <IconButton color="inherit">
                      <Link to="/about">
                        <Info />
                      </Link>
                    </IconButton>
                  </li>
                  <li>
                    <IconButton color="inherit">
                      <Link
                        onClick={() => {
                          window.location.href = "http://localhost:8080/logout";
                        }}
                      >
                        <ExitToApp />
                      </Link>
                    </IconButton>
                  </li>
                </ul>
              </Toolbar>
            </AppBar>

            <Container maxWidth="lg">
              <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/study" component={Index}></Route>
                <Route
                  exact
                  path="/study/create-new-class"
                  component={CreateClass}
                ></Route>
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
    primary: {
      main: "#fff",
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
