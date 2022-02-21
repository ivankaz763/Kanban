import React from "react";
import "./App.css";
import BoardsContainer from "./components/BoardsContainer";
import ColumnCardContainer from "./components/ColumnCardContainer";

import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
  return(
    <div className="mainContainer">
        <Router>
          <Switch>
            <Route path="/boards" exact component={BoardsContainer}/>
            <Route path="/boards/:link" exact component={ColumnCardContainer}/>
          </Switch>
        </Router>
      </div>
  );
}


export default App;
