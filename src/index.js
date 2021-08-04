import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Index from './studyHelper/Index';
import Folder from './studyHelper/Folder';

function checkAuthenticated() {
  return false;
}

function goToLogin() {
  return (
    window.location.assign('http://localhost:8080/google')
  )
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        {/* <Route exact path="/" component={Auth} /> */}
        <Route exact path="/study">
          {checkAuthenticated ? goToLogin : <Index />}
        </Route>
        <Route path="/study/folder/:folderID" component={Folder} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
