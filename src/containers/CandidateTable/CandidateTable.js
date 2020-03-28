import React, { Component, Fragment } from "react";
import classes from "./CandidateTable.module.css";
import Aux from "../../hoc/Aux";
import { connect } from "react-redux";
import Modal from "../../components/Modal/Modal";
import axios from "../../axios-config";
import Spinner from "../../components/Spinner/Spinner";
import { orderBy } from "lodash";
import * as actionTypes from "../../store/reducers/actions/actionTypes";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionCreators from "../../store/reducers/actions/actionCreators";

class CandidateTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collection: this.props.candidates,

      sortParams: {
        direction: undefined
      }
    };
  }
  componentDidMount() {
    this.props.onFetchCandidates();
  }

  // renderTableData() {
  //   let currentYear = new Date().getFullYear();
  //   let collectionData = this.props.candidates;
  //   if (this.collection.length >= 2) {
  //     collectionData = this.state.collection;
  //   }
  //   return collectionData.map((candidate, index) => {
  //     const {
  //       id,
  //       name,
  //       birth_date,
  //       year_of_experience,
  //       position_applied,
  //       application_date,
  //       status,
  //       email
  //     } = candidate; //destructuring
  //     return (
  //       <tr key={id}>
  //         <td>{id}</td>
  //         <td>{name}</td>
  //         <td>{email}</td>
  //         <td>{currentYear - birth_date.slice(0, 4)}</td>
  //         <td>{year_of_experience}</td>
  //         <td>{position_applied}</td>
  //         <td>{application_date}</td>
  //         <td>{status}</td>
  //       </tr>
  //     );
  //   });
  // }

  // onRefreshTable = () => {
  //   this.props.onFetchCandidates();
  // };

  // renderTableHeader() {
  //   const objKeys = Object.keys(this.props.candidates[0]);
  //   let header = objKeys;
  //   return header.map((key, index) => {
  //     return (
  //       <th key={index}>
  //         {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}
  //       </th>
  //     );
  //   });
  // }
  // onSortByName() {
  //   // console.log("BEFORE SORT", this.state.candidates);
  //   // if (!this.props.loadingCandidates && this.props.candidates.length > 1) {
  //   const sortedOBJ = _.sortBy(this.props.candidates, ["name"]);
  //   // }
  //   console.log("AFTER SORT", sortedOBJ);
  // }
  handleColumnHeaderClick(sortKey) {
    const {
      collection,

      sortParams: { direction }
    } = this.state;

    // Check, what direction now should be

    const sortDirection = direction === "desc" ? "asc" : "desc";

    // Sort collection

    const sortedCollection = orderBy(
      this.props.candidates,

      [sortKey],

      [sortDirection]
    );

    //Update component state with new data

    this.setState({
      collection: sortedCollection,

      sortParams: {
        direction: sortDirection
      }
    });
    console.log("this is the collection", collection);
  }

  // checkCandidateList = () => {
  //   this.setState({ collection: this.props.candidates });
  //   console.log("this is the candidate list state", this.state.candidateList);
  // };
  render() {
    //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
    // let table = null;
    // if (this.props.loadingCandidates) {
    //   table = <Spinner />;
    // } else

    return (
      this.props.candidates.length > 1 && (
        <Aux>
          <button onClick={this.checkCandidateList}>Refresh Table</button>
          <button onClick={this.onSortByName}>Sort By Name</button>

          <div className={classes.Candidates__wrapper}>
            <table className={classes.Candidates}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Birth Date</th>
                  <th
                    onClick={() =>
                      this.handleColumnHeaderClick("year_of_experience")
                    }
                  >
                    Years of Experience
                  </th>
                  <th
                    onClick={() =>
                      this.handleColumnHeaderClick("position_applied")
                    }
                  >
                    Position Applied
                  </th>
                  <th
                    onClick={() =>
                      this.handleColumnHeaderClick("application_date")
                    }
                  >
                    Application Date
                  </th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {this.state.collection.map(candidate => (
                  <Fragment key={candidate.id}>
                    <tr>
                      <td>{candidate.id}</td>
                      <td>{candidate.name}</td>
                      <td>{candidate.email}</td>
                      <td>{candidate.birth_date}</td>
                      <td>{candidate.year_of_experience}</td>
                      <td>{candidate.position_applied}</td>
                      <td>{candidate.application_date}</td>
                      <td>{candidate.status}</td>
                    </tr>
                  </Fragment>
                ))}
                {/* {this.renderTableData()} */}
              </tbody>
            </table>
          </div>
        </Aux>
      )
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
