import React from "react";
import ReactDOM from "react-dom";
import "./studyHelper/styles/colors.css";
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
import AuthenticatedRouter from "./AuthenticatedRouter";
import HandleLogin from "./HandleLogin";

function HandleAuthentication(props) {
  const directToLogin = () => {
    window.location.href = "http://localhost:8080/google";
  };

  if (false) {
    directToLogin();
  }

  return <AuthenticatedRouter />;
}

const theme = createTheme({
  palette: {
    type: "dark",
    background: {
      default: "#181a1f",
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
      <BrowserRouter>
        <Switch>
          <Route path="/login/" component={HandleLogin} />
          <Route path="/" component={HandleAuthentication} />
        </Switch>
        {/* <HandleAuthentication /> */}
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
