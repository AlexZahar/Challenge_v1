import React, { Component } from "react";
import classes from "./CandidateTable.module.css";
import Aux from "../../hoc/Aux";

class CandidateTable extends Component {
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      //state is by default an object
      candidates: [
        { id: 1, name: "Wasif", age: 21, email: "wasif@email.com" },
        { id: 2, name: "Ali", age: 19, email: "ali@email.com" },
        { id: 3, name: "Saad", age: 16, email: "saad@email.com" },
        { id: 4, name: "Asad", age: 25, email: "asad@email.com" }
      ]
    };
  }

  renderTableData() {
    return this.state.candidates.map((candidates, index) => {
      const { id, name, age, email } = candidates; //destructuring
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{age}</td>
          <td>{email}</td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    let header = Object.keys(this.state.candidates[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  render() {
    //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
    return (
      <Aux>
        <div className={classes.Candidates__wrapper}>
          <h2 className={classes.Title}>Candidates Table</h2>
          <table className={classes.Candidates}>
            <tbody>
              <tr>{this.renderTableHeader()}</tr>
              {this.renderTableData()}
            </tbody>
          </table>
        </div>
      </Aux>
    );
  }
}

export default CandidateTable;
