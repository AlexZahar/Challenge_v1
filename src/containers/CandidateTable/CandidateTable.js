import React, { Component } from "react";
import classes from "./CandidateTable.module.css";
import Aux from "../../hoc/Aux";
import axios from "axios";

class CandidateTable extends Component {
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      //state is by default an object
      candidates: [
        { id: 1, name: "Wasif", age: 21, email: "wasif@email.com" }
        // { id: 2, name: "Ali", age: 19, email: "ali@email.com" },
        // { id: 3, name: "Saad", age: 16, email: "saad@email.com" },
        // { id: 4, name: "Asad", age: 25, email: "asad@email.com" }
      ],
      showTable: false
    };
  }
  componentDidMount() {
    // this.getCandidates();
  }

  getCandidates = async () => {
    try {
      let res = await axios.get(
        "http://personio-fe-test.herokuapp.com/api/v1/candidates"
      );
      console.log(res);
      let { data } = res.data;
      this.setState({ candidates: data });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  renderTableData() {
    return this.state.candidates.map((candidates, index) => {
      const {
        id,
        name,
        birth_date,
        years_of_experience,
        position_applied,
        application_date,
        status,
        email
      } = candidates; //destructuring
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{email}</td>
          <td>{birth_date}</td>
          <td>{years_of_experience}</td>
          <td>{position_applied}</td>
          <td>{application_date}</td>
          <td>{status}</td>
        </tr>
      );
    });
  }
  toggleTableHandler = () => {
    this.getCandidates();
    const doesShow = this.state.showTable;
    this.setState({ showTable: !doesShow });
  };

  renderTableHeader() {
    let header = Object.keys(this.state.candidates[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  render() {
    //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.

    let table = null;
    if (this.state.showTable) {
      table = (
        <table className={classes.Candidates}>
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      );
    }

    return (
      <Aux>
        <button onClick={this.toggleTableHandler}>Show Candidate Table</button>
        <div className={classes.Candidates__wrapper}>
          <h2 className={classes.Title}>Candidates Table</h2>
          {table}
        </div>
      </Aux>
    );
  }
}

export default CandidateTable;
