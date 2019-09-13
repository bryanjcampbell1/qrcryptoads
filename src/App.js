import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Page1 from "./Page1";
//import PayoutOptions from "./PayoutOptions";
import GoToCelar from "./GoToCelar";

function App() {
    return (
      <Router>
        <div className="App">

          <Route path="/" exact component={Page1} />
          <Route path="/celar/" component={GoToCelar} />

        </div>
      </Router>
    );
}

export default App;
