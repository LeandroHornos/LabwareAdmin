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
import ErrorPage from "./Components/ErrorPage.jsx";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import Blank from "./Components/Blank.jsx";

const App = () => {
  const { currentUser } = useContext(AuthContext);
  const currentLang = "es";
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
        <ScrollToTop />
        <Switch>
          <Route exact path="/error" component={ErrorPage} />
          <Route exact path="/signin">
            {/* {!currentUser ? <SignIn /> : <Redirect to="/inventories" />} */}
            {currentUser ? (
              <Redirect to="/inventories" />
            ) : (
              <SignIn lang={currentLang} />
            )}
          </Route>
          <Route path="/signup">
            {currentUser ? (
              <Redirect to="inventories" />
            ) : (
              <SignUp lang={currentLang} />
            )}
          </Route>
          <Route path="/signout">
            <SignOut />
          </Route>
          <Route path="/inventory">
            {currentUser ? (
              <Inventory
                lang={currentLang}
                inventoryId={currentInventory}
                updateCurrentInventory={updateCurrentInventory}
                updateCurrentItem={updateCurrentItem}
              />
            ) : (
              <Redirect to="/error" />
            )}
          </Route>
          <Route path="/item">
            {currentUser ? (
              <Item itemId={currentItem} lang={currentLang} />
            ) : (
              <Redirect to="/error" />
            )}
          </Route>
          <Route path="/inventories">
            {currentUser ? (
              <Inventories
                updateCurrentInventory={updateCurrentInventory}
                lang={currentLang}
              />
            ) : (
              <Redirect to="/error" />
            )}
          </Route>
          <Route path="/loading">
            <Blank />
          </Route>

          <Route path="/">
            <Welcome lang={currentLang} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
