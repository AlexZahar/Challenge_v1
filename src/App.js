import React from "react";
import classes from "./App.css";
import Spinner from "./components/Spinner/Spinner";
import Navigation from "./components/Navigation/Navigation";
import CandidateTable from "./containers/CandidateTable/CandidateTable";
// import Footer from "./components/Footer/Footer";
import Aux from "./hoc/Aux";

function App() {
  return (
    <Aux>
      <div className={classes.App}>
        <Navigation />
        {/* <Spinner></Spinner> */}
        <CandidateTable />
        {/* <Footer /> */}
      </div>
    </Aux>
  );
}

export default App;
