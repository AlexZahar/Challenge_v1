import React from "react";
import classes from "./App.css";
import Spinner from "./components/Spinner/Spinner";
import Navigation from "./components/Navigation/Navigation";
import CandidateTable from "./containers/CandidateTable/CandidateTable";
// import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div>
      <div className={classes.App}>
        <Navigation />
        {/* <Spinner></Spinner> */}
        <CandidateTable />
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default App;
