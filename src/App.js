import React, { Component } from "react";
import classes from "./App.css";
import Navigation from "./components/Navigation/Navigation";
import CandidateTable from "./containers/CandidateTable/CandidateTable";
import { BrowserRouter } from "react-router-dom";
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
              <CandidateTable />
            </section>
            {/* <Footer /> */}
          </div>
        </Aux>
      </BrowserRouter>
    );
  }
}

export default App;
