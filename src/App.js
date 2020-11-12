import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

/* Firebase */
import { AuthContext } from "./Auth";

/* App Components */
import Welcome from "./Components/Welcome.jsx";
import SignIn from "./Components/SignIn.jsx";
import SignUp from "./Components/SignUp.jsx";
import SignOut from "./Components/SignOut.jsx";
import Inventory from "./Components/Inventory.jsx";
import Inventories from "./Components/Inventories.jsx";
import Item from "./Components/Item.jsx";


const App = () => {
  const { currentUser } = useContext(AuthContext);
  const [currentInventory, setCurrentInventory] = useState("");
  const [currentItem, setCurrentItem] = useState("");

  const updateCurrentInventory = (inv) => {
    setCurrentInventory(inv);
  };

  const updateCurrentItem = (item) => {
    setCurrentItem(item);
  };

  return (
    <Router>
      <div className="main-container">
        <Switch>
          <Route path="/signin">
            {/* {!currentUser ? <SignIn /> : <Redirect to="/inventories" />} */}
            {currentUser ? (
              <Inventories updateCurrentInventory={updateCurrentInventory} />
            ) : (
              <SignIn />
            )}
          </Route>
          <Route path="/signup">
            {currentUser ? (
              <Inventories updateCurrentInventory={updateCurrentInventory} />
            ) : (
              <SignIn />
            )}
          </Route>
          <Route path="/signout">
            {currentUser ? <SignOut /> : <SignUp />}
          </Route>
          <Route path="/inventory">
            {currentUser ? (
              <Inventory
                inventoryId={currentInventory}
                updateCurrentInventory={updateCurrentInventory}
                updateCurrentItem={updateCurrentItem}
              />
            ) : (
              <SignUp />
            )}
          </Route>
          <Route path="/item">
            {currentUser ? <Item itemId={currentItem} /> : <SignUp />}
          </Route>
          <Route path="/inventories">
            {currentUser ? (
              <Inventories updateCurrentInventory={updateCurrentInventory} />
            ) : (
              <SignUp />
            )}
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
