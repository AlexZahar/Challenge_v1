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
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      //state is by default an object
      // candidates: [],
      showTable: false
    };
  }
  componentDidMount() {
    this.props.onFetchCandidates();
  }

  renderTableData() {
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
          <td>{birth_date}</td>
          <td>{year_of_experience}</td>
          <td>{position_applied}</td>
          <td>{application_date}</td>
          <td>{status}</td>
        </tr>
      );
    });
  }

  toggleTableHandler = () => {
    // this.getCandidates();
    this.props.onRenderTableData();
    // this.renderTableHeader();
    // this.renderTableData();
    const doesShow = this.state.showTable;
    this.setState({ showTable: !doesShow });
    console.log("SHOW TABLE", this.state.showTable);
    // const doesShow = this.state.showTable;
    // this.setState({ showTable: !doesShow });
  };

  renderTableHeader() {
    // console.log("render table HEADER FUNC", this.props.candidates[0]);
    let header = Object.keys(this.props.candidates[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  render() {
    let table = null;
    if (this.props.loadingCandidates) {
      table = <Spinner />;
    }
    if (this.state.doesShow) {
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
        <button onClick={this.toggleTableHandler}>Show Candidate Table</button>
        <div className={classes.Candidates__wrapper}>{table}</div>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    candidates: state.candidates,
    loadingCandidates: state.loading,
    tableData: state.tableData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchCandidates: () => dispatch(actionCreators.fetchCandidates()),
    onRenderTableData: () => dispatch(actionCreators.onRenderTableData())
    // onRenderTableDataHandler: () => dispatch(actionCreators.onRenderTableDataHandler()),
    // onToggleTableHandler: () => dispatch(actionCreators.onToggleTableHandler())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(CandidateTable, axios));
