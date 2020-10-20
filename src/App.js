import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

/* Firebase */
import { useUser } from "reactfire";

/* App Components */
import Welcome from "./Components/Welcome.jsx";
import SignIn from "./Components/SignIn.jsx";
import SignUp from "./Components/SignUp.jsx";
import Inventory from "./Components/Inventory.jsx";


const App = () => {
  // const user = useUser();

  return (
    <Router>
      <div className="main-container">
        <Switch>
          <Route path="/signin"><SignIn /> </Route>
          <Route path="/signup"><SignUp /></Route>
          <Route path="/inventory"><Inventory /></Route>
          <Route path="/">
            <Welcome />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
