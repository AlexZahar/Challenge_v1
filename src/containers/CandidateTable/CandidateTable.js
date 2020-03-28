import React, { Component, Fragment } from "react";
import classes from "./CandidateTable.module.css";
import Aux from "../../hoc/Aux";
import { connect } from "react-redux";
import Modal from "../../components/Modal/Modal";
import axios from "../../axios-config";
import PropTypes from "prop-types";
import Spinner from "../../components/Spinner/Spinner";
import { orderBy, filter } from "lodash";
import * as actionTypes from "../../store/reducers/actions/actionTypes";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionCreators from "../../store/reducers/actions/actionCreators";

class CandidateTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // users: [
      //   {
      //     id: 2,
      //     name: "Colette Morar",
      //     email: "corinnestark@pacocha.co",
      //     birth_date: "1998-08-03",
      //     year_of_experience: 3,
      //     position_applied: "backend",
      //     application_date: "2017-11-18",
      //     status: "rejected"
      //   },
      //   {
      //     id: 1,
      //     name: "Bishop",
      //     email: "corinnestark@pacocha.co",
      //     birth_date: "1998-08-03",
      //     year_of_experience: 3,
      //     position_applied: "frontend",
      //     application_date: "2017-11-18",
      //     status: "aproved"
      //   },
      //   {
      //     id: 5,
      //     name: "Janette",
      //     email: "corinnestark@pacocha.co",
      //     birth_date: "1998-08-03",
      //     year_of_experience: 3,
      //     position_applied: "Designer",
      //     application_date: "2017-11-18",
      //     status: "waiting"
      //   },
      //   {
      //     id: 3,
      //     name: "BAMBOLEO",
      //     email: "corinnestark@pacocha.co",
      //     birth_date: "1998-08-03",
      //     year_of_experience: 3,
      //     position_applied: "Designer",
      //     application_date: "2017-11-18",
      //     status: "waiting"
      //   }
      // ],
      collection: this.props.candidates,
      undefinedDataRefreshBtn: false,
      sortParams: {
        direction: undefined
      }
    };
  }
  componentDidMount() {
    this.props.onFetchCandidates();
  }

  renderTableData(collection) {
    let currentYear = new Date().getFullYear();
    // let collectionData = this.props.candidates;
    // if (this.collection.length >= 2) {
    //   collectionData = this.state.collection;
    // }
    let tableData = null;
    if (this.state.collection.length > 1) {
      tableData = this.state.collection;
    } else if (this.props.candidates.length) {
      tableData = this.props.candidates;
    }

    return tableData.map((candidate, index) => {
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
        <Fragment key={id}>
          <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{currentYear - birth_date.slice(0, 4)}</td>
            <td>{parseInt(year_of_experience)}</td>
            <td>{position_applied}</td>
            <td>{application_date}</td>
            <td>{status}</td>
          </tr>
        </Fragment>
      );
    });
  }

  onRefreshTable = () => {
    this.props.onFetchCandidates();
    this.setState({ undefinedDataRefreshBtn: false });
  };

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
  handleSortColumnHeaderClick(sortKey) {
    const {
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
  }
  handleFilterClick = filterValue => {
    const { collection } = this.state;
    // let filteredByStatus = filter(collection, { status: "waiting" });
    // console.log(filteredByStatus);
    //   // Check, what direction now should be

    //   const sortDirection = direction === "desc" ? "asc" : "desc";

    //   // Sort collection

    const filteredCollection = filter(this.props.candidates, filterValue);

    //   //Update component state with new data

    this.setState({
      collection: filteredCollection
    });
  };

  // checkCandidateList = () => {
  //   this.setState({ collection: this.props.candidates });
  // };

  render() {
    // let isDataPresent = null;
    // let spinner = null;
    // let refreshDataButton = null;

    // if (typeof this.props.candidates === "undefined") {
    //   isDataPresent = null;
    //   refreshDataButton = <button>Refresh</button>;
    // } else if (
    //   this.props.candidates.length &&
    //   typeof this.props.candidates !== "undefined"
    // ) {
    //   refreshDataButton = null;
    //   isDataPresent = (
    //     <Aux>
    //       <button>Refresh Table</button>
    //       <button onClick={() => this.handleFilterClick("waiting")}>
    //         Sort By status: APROVED
    //       </button>

    //       <div className={classes.Candidates__wrapper}>
    //         <table className={classes.Candidates}>
    //           <thead>
    //             <tr>
    //               <th>ID</th>
    //               <th>Name</th>
    //               <th>Email</th>
    //               <th>Age</th>
    //               <th
    //                 onClick={() =>
    //                   this.handleSortColumnHeaderClick("year_of_experience")
    //                 }
    //               >
    //                 Years of Experience
    //               </th>
    //               <th
    //                 onClick={() =>
    //                   this.handleSortColumnHeaderClick("position_applied")
    //                 }
    //               >
    //                 Position Applied
    //               </th>
    //               <th
    //                 onClick={() =>
    //                   this.handleSortColumnHeaderClick("application_date")
    //                 }
    //               >
    //                 Application Date
    //               </th>
    //               <th>Status</th>
    //             </tr>
    //           </thead>
    //           <tbody>{this.renderTableData()}</tbody>
    //         </table>
    //       </div>
    //     </Aux>
    //   );
    // } else {
    //   isDataPresent = <Spinner />;
    // }

    return typeof this.props.candidates === "undefined" ? (
      <button onClick={this.onRefreshTable}>REFRESH TABLE</button>
    ) : this.props.candidates.length >= 1 ? (
      <Aux>
        <button>Refresh Table</button>
        <button onClick={() => this.handleFilterClick("waiting")}>
          Sort By status: APROVED
        </button>

        <div className={classes.Candidates__wrapper}>
          <table className={classes.Candidates}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th
                  onClick={() =>
                    this.handleSortColumnHeaderClick("year_of_experience")
                  }
                >
                  Years of Experience
                </th>
                <th
                  onClick={() =>
                    this.handleSortColumnHeaderClick("position_applied")
                  }
                >
                  Position Applied
                </th>
                <th
                  onClick={() =>
                    this.handleSortColumnHeaderClick("application_date")
                  }
                >
                  Application Date
                </th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{this.renderTableData()}</tbody>
          </table>
        </div>
      </Aux>
    ) : (
      <Spinner />
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

CandidateTable.propTypes = {
  handleColumnHeaderClick: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  birth_date: PropTypes.string,
  year_of_experieynce: PropTypes.number,
  position_applied: PropTypes.string,
  application_date: PropTypes.string,
  status: PropTypes.oneOf(["approved", "rejected", "waiting"])
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(CandidateTable, axios));
