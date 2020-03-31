import React, { Component } from "react";
import classes from "./App.css";
import Navigation from "./components/Navigation/Navigation";
import CandidateTable from "./containers/CandidateTable/CandidateTable";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/Home/Home";
// import Footer from "./components/Footer/Footer";

// import Modal from "./components/Modal/Modal";
import Aux from "./hoc/Aux";
//
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Aux>
          <div className={classes.App}>
            <section>
              <Navigation />
            </section>
            {/* <Modal></Modal> */}

            <section>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/candidates" exact component={CandidateTable} />
                <Route
                  path={"/candidates/querry/:querry/sort/:order"}
                  component={CandidateTable}
                />
                <Route
                  path={"/candidates/querry/:querry"}
                  component={CandidateTable}
                />
                {/* <Redirect from="/" to="/candidates" /> */}
                <Route
                  render={() => (
                    <h1>Sorry, the requested page was not found..</h1>
                  )}
                ></Route>
              </Switch>
              {/* <Route path="/candidates/" component={CandidateTable} /> */}
            </section>
            {/* <Footer /> */}
          </div>
        </Aux>
      </BrowserRouter>
    );
  }
}

export default App;
