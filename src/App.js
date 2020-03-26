import React, { Component } from "react";
import classes from "./App.css";
import Navigation from "./components/Navigation/Navigation";
import CandidateTable from "./containers/CandidateTable/CandidateTable";
// import Footer from "./components/Footer/Footer";
import Candidate from './components/Candidate/Candidate'
// import Modal from "./components/Modal/Modal";
import Aux from "./hoc/Aux";
// 
class App extends Component{

  render() {
    return (
    <Aux>
      <div className={classes.App}>
        <Navigation />
        {/* <Modal></Modal> */}
        <Candidate/>
        <CandidateTable />
        {/* <Footer /> */}
      </div>
    </Aux>
    )}
    
  
    
}

export default App;
