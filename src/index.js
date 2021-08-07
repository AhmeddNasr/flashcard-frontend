import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Index from './studyHelper/Index';
import Folder from './studyHelper/Folder';
import CreateClass from './studyHelper/CreateClass';
import Container from '@material-ui/core/Container';

function HandleAuthentication() {
  const [authenticationHandled, setAuthenticationHandled] = React.useState([false, false]);

  const updateAuthentication = (bool) => {
    console.log(bool);
    setAuthenticationHandled([true, bool]);
  };

  function isLoggedIn() {
    fetch('http://localhost:8080/loggedin', {credentials: 'include'})
    .then((response => response.json()))
    .then((data) => updateAuthentication(data.logged_in))
    .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    isLoggedIn();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  if(authenticationHandled[0]) {
    if(!authenticationHandled[1]) {
      window.location.href = "http://localhost:8080/google";
      return(null);
    }
  }

  if(!authenticationHandled[0]) {
    return(null);
  } else {
    if (authenticationHandled[1]) {
      return (
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={App} />
              <Route exact path="/study" component={Index}></Route>
              <Route exact path="/study/create-new-class" component={CreateClass}></Route>
              <Route path="/study/folder/:folderID" component={Folder} />
            </Switch>
          </BrowserRouter>
      )
    }
  }
}

// function goToLogin() {
//   return (
//     window.location.assign('http://localhost:8080/google')
//   )
// }

ReactDOM.render(
  <React.StrictMode>
    <Container maxWidth="lg">
      <HandleAuthentication />
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);
