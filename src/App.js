import React from "react";
import "./App.css";
// import Spinner from "./components/Spinner/Spinner";
import Navigation from "./components/Navigation/Navigation";
import CandidateTable from "./containers/CandidateTable/CandidateTable";

function App() {
  return (
    <div className="App">
      <Navigation />
      {/* <Spinner></Spinner> */}
      <CandidateTable />
    </div>
  );
}

export default App;
