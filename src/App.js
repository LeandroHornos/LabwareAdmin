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
  const [messages, setMessages] = useState([]);

  // App Navigation:

  const updateCurrentInventory = (inv) => {
    setCurrentInventory(inv);
  };

  const updateCurrentItem = (item) => {
    setCurrentItem(item);
  };

  // Message Handling. "messages" needs. CRUD-like operations:

  const delMessageById = (id) => {
    /* Permite eliminar un mensaje a partir del id */
    const updatedMessages = messages.filter((msg) => {
      return msg.id !== id;
    });
    setMessages(updatedMessages);
    console.log(
      "se han eliminado los mensajes, he aqui la nueva lista",
      updatedMessages
    );
  };

  const delMessagesByComponent = (componentName) => {
    /* Permite eliminar loss mensajes del componente indicado */
    const updatedMessages = messages.filter((msg) => {
      return msg.component !== componentName;
    });
    setMessages(updatedMessages);
    console.log(
      "se han eliminado los mensajes, he aqui la nueva lista",
      updatedMessages
    );
  };

  const delShownMessages = () => {
    /* Permite eliminar loss mensajes del componente indicado */
    const updatedMessages = messages.filter((msg) => {
      return msg.shown == false;
    });
    setMessages(updatedMessages);
    console.log(
      "se han eliminado los mensajes, he aqui la nueva lista",
      updatedMessages
    );
  };

  const addMessage = (msg) => {
    console.log("agregando mensajes...");
    setMessages([...messages, msg]);
  };

  return (
    <Router>
      <div className="main-container">
        <ScrollToTop />
        <Switch>
          <Route exact path="/error" component={ErrorPage} />
          <Route exact path="/signin">
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
                addMessage={addMessage}
                delMessageById={delMessageById}
                delMessagesByComponent={delMessagesByComponent}
                delShownMessages={delShownMessages}
                messages={messages}
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

// var sampleMessages = [
//   {
//     id: "bu9545kf896kffiuobce",
//     component: "inventory",
//     variant: "danger",
//     body: "Hola señor don pepito",
//   },
//   {
//     id: "bu954behe554g4g54hh4wesgve",
//     component: "inventory",
//     variant: "warning",
//     body: "Hola señor don josé",
//   },
//   {
//     id: "i93f9n3f9n3f9hw2df9hhfw9h922",
//     component: "inventory",
//     variant: "success",
//     body: "La olio usté a mi abuela?",
//   },
//   {
//     id: "09kut43wdrt67890piujhgw45rtgh",
//     component: "items",
//     variant: "success",
//     body: "A su abuela yo la olí",
//   },
//   {
//     id: "ftyu9okjhgr43wsdrt6789oi",
//     component: "inventory",
//     variant: "success",
//     body: "Adiós don pepito",
//   },
//   {
//     id: "0okmngt54334567fghnjiu",
//     component: "inventory",
//     variant: "success",
//     body: "Adiós don josé",
//   },
// ];

export default App;
