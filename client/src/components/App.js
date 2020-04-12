import React from "react";
import { Switch, Route } from "react-router-dom";
import About from "./about";
import Login from "./RegisterLogin";
import Register from "./RegisterLogin/Register";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  );
}

export default App;
