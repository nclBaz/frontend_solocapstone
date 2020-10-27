import React from "react";
import logo from "./logo.svg";
import Image from "./bgimage.jpg";
import "./App.css";
import Navbar from "./components/Header/Headers";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginWorker from "./pages/LoginWorker";
import HomePage from "./pages/HomePage";
import ProfileWorker from "./pages/Profile";
import Company from "./pages/HomeCompany";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={LoginWorker} />
          <Route path="/worker" exact component={HomePage} />
          <Route path="/workerProfile" exact component={ProfileWorker} />
          <Route path="/company" exact component={Company} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;