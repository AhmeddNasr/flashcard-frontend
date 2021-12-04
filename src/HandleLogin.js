import React from "react";
import CenteredSpinner from "./studyHelper/CenteredSpinner";
import { useHistory } from "react-router-dom";
const queryString = require("query-string");

function HandleLogin() {
  const history = useHistory();

  React.useEffect(() => {
    let parsedCode;
    if (window.location.search !== null) {
      parsedCode = queryString.parse(window.location.search);
      if (parsedCode.code === null) {
        return;
      }
      if (!/^\d+$/.test(parsedCode.code)) {
        console.log("not int");
        return;
      }
    }

    fetch("http://localhost:8080/api/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedCode),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", data);
        history.push('/study#');
      });
  }, []);

  return <CenteredSpinner />;
}

export default HandleLogin;
