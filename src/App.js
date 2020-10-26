import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

/* Firebase */

/* App Components */
import Welcome from "./Components/Welcome.jsx";
import SignIn from "./Components/SignIn.jsx";
import SignUp from "./Components/SignUp.jsx";
import Inventory from "./Components/Inventory.jsx";
import Inventories from "./Components/Inventories.jsx";

const App = () => {
  const [currentInventory, setCurrentInventory] = useState(0);

  const updateCurrentInventory = (inv) => {
    setCurrentInventory(inv);
  };

  return (
    <Router>
      <div className="main-container">
        <Switch>
          <Route path="/signin">
            <SignIn />{" "}
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/inventory">
            <Inventory inventory={currentInventory} />
          </Route>
          <Route path="/inventories">
            <Inventories updateCurrentInventory={updateCurrentInventory} />
          </Route>
          <Route path="/">
            <Welcome />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
