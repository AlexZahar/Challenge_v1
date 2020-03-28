import React, { Component } from "react";
import classes from "./CandidateTable.module.css";
import Aux from "../../hoc/Aux";
import { connect } from "react-redux";
import Modal from "../../components/Modal/Modal";
import axios from "../../axios-config";
import Spinner from "../../components/Spinner/Spinner";
import * as actionTypes from "../../store/reducers/actions/actionTypes";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionCreators from "../../store/reducers/actions/actionCreators";

class CandidateTable extends Component {
  // constructor(props) {
  //   super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
  //   this.state = {
  //     //state is by default an object
  //     // candidates: [],
  //     showTable: false
  //   };
  // }
  componentDidMount() {
    this.props.onFetchCandidates();
  }

  renderTableData() {
    let currentYear = new Date().getFullYear();

    return this.props.candidates.map((candidate, index) => {
      const {
        id,
        name,
        birth_date,
        year_of_experience,
        position_applied,
        application_date,
        status,
        email
      } = candidate; //destructuring
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{email}</td>
          <td>{currentYear - birth_date.slice(0, 4)}</td>
          <td>{year_of_experience}</td>
          <td>{position_applied}</td>
          <td>{application_date}</td>
          <td>{status}</td>
        </tr>
      );
    });
  }

  onRefreshTable = () => {
    this.props.onFetchCandidates();
  };

  renderTableHeader() {
    const objKeys = Object.keys(this.props.candidates[0]);
    let header = objKeys;
    return header.map((key, index) => {
      return (
        <th key={index}>
          {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}
        </th>
      );
    });
  }

  render() {
    //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.

    let table = null;
    if (this.props.loadingCandidates) {
      table = <Spinner />;
    } else if (
      !this.props.loadingCandidates &&
      this.props.candidates.length >= 1
    ) {
      table = (
        <div>
          <h2 className={classes.Title}>Candidates Table</h2>
          <table className={classes.Candidates}>
            <tbody>
              <tr>{this.renderTableHeader()}</tr>
              {this.renderTableData()}
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <Aux>
        <button onClick={this.onRefreshTable}>Refresh Table</button>
        <div className={classes.Candidates__wrapper}>{table}</div>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    candidates: state.candidates,
    loadingCandidates: state.loading,
    isShowTable: state.showTable
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchCandidates: () => dispatch(actionCreators.fetchCandidates()),
    onRenderTableData: () => dispatch(actionCreators.onRenderTableData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(CandidateTable, axios));
