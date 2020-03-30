import React, { Component, Fragment } from "react";
import classes from "./CandidateTable.module.css";
import Aux from "../../hoc/Aux";
import { connect } from "react-redux";
import Modal from "../../components/Modal/Modal";
import axios from "../../axios-config";
import PropTypes from "prop-types";
import Spinner from "../../components/Spinner/Spinner";
import { orderBy, filter } from "lodash";
// import * as actionTypes from "../../store/reducers/actions/actionTypes";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionCreators from "../../store/reducers/actions/actionCreators";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

class CandidateTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortedCollection: [],
      undefinedDataRefreshBtn: false,
      filteredCollection: [],
      sortParams: {
        direction: undefined
      },
      querry: "",
      isListFiltered: false,
      columnToQuerry: "status"
    };
  }
  componentDidMount() {
    this.props.onFetchCandidates();
  }
  // ------------------------------------------------------------------------
  renderTableData() {
    let currentYear = new Date().getFullYear();
    let tableData = null;
    let lowerCaseQuerry = this.state.querry.toLowerCase();
    // this.state.columnToQuerry !== "Default"
    // if (this.state.querry && this.state.sortedCollection.length <= 1) {
    // let filteredData = this.props.candidates.filter(x =>
    //   x[this.state.columnToQuerry].toLowerCase().includes(lowerCaseQuerry)
    // );
    // tableData = filteredData;
    // } else if (this.state.querry && this.state.sortedCollection > 1) {
    //   tableData = this.state.sortedCollection;
    // } else if (this.state.sortedCollection.length >= 1) {
    //   tableData = this.state.sortedCollection;
    // } else {
    //   tableData = this.props.candidates;

    if (this.state.querry && this.state.sortedCollection.length <= 1) {
      let filteredData = this.props.candidates.filter(x =>
        x[this.state.columnToQuerry].toLowerCase().includes(lowerCaseQuerry)
      );
      tableData = filteredData;
    } else if (this.state.sortedCollection.length > 1) {
      let filteredData = this.state.sortedCollection.filter(x =>
        x[this.state.columnToQuerry].toLowerCase().includes(lowerCaseQuerry)
      );
      tableData = filteredData;
    } else {
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
  // ---------------------------------------------------------------------------
  onRefreshTable = () => {
    this.props.onFetchCandidates();
    this.setState({ undefinedDataRefreshBtn: false });
  };
  // ------------------------------------------------------------------------
  handleSortColumnHeaderClick(sortKey) {
    const {
      sortParams: { direction }
    } = this.state;

    // Check, what direction now should be

    const sortDirection = direction === "desc" ? "asc" : "desc";

    // Sort collection
    let collectionToSort;

    if (this.state.sortedCollection.length < 1) {
      collectionToSort = this.props.candidates;
    } else {
      collectionToSort = this.state.sortedCollection;
    }

    const sortedData = orderBy(
      collectionToSort,

      [sortKey],

      [sortDirection]
    );

    //Update component state with new data

    this.setState({
      sortedCollection: sortedData,
      sortParams: {
        direction: sortDirection
      }
    });
  }
  // ----------------------------------------------------------------------------

  // handleFilterClick = (filterKey, filterValue) => {
  //   const filteredCollectionData = filter(this.props.candidates, [
  //     filterKey,
  //     filterValue
  //   ]);

  //   //   //Update component state with new data

  //   this.setState({
  //     filteredCollection: filteredCollectionData,
  //     sortedCollection: filteredCollectionData
  //   });
  // };
  formSelectorFilter = () => {
    return (
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="filter-status">Search for</InputLabel>
        <Select
          native
          value={this.state.columnToQuerry}
          onChange={event => {
            this.setState({
              columnToQuerry: event.target.value
            });
          }}
          label="Search for"
          inputProps={{
            name: "",
            id: "outlined-age-native-simple"
          }}
        >
          <option aria-label="None" value="Default">
            Default
          </option>

          <option value="name">Name</option>
          <option value="position_applied">Position Applied</option>
          <option value="status">Status</option>
        </Select>
      </FormControl>
    );
  };
  searchBar = () => {
    if (this.state.columnToQuerry !== "Default") {
      return (
        <TextField
          id="outlined-search"
          label="Querry"
          type="search"
          value={this.state.querry}
          variant="outlined"
          onChange={e => this.setState({ querry: e.target.value })}
        />
      );
    }
  };

  // checkCandidateList = () => {
  //   this.setState({ collection: this.props.candidates });
  // };
  // ---------------------------------------------------------------------------------
  render() {
    // let lowerCaseQuerry = this.state.querry.toLowerCase();
    // if (this.state.querry) {
    //   this.props.candidates.filter(x =>
    //     x[this.state.columnToQuerry].toLowerCase().includes(lowerCaseQuerry)
    //   );
    // }
    return typeof this.props.candidates === "undefined" ? (
      <Modal />
    ) : this.props.candidates.length >= 1 ? (
      <Aux>
        <div className={classes.Candidates__wrapper}>
          {this.formSelectorFilter()}
          {this.searchBar()}
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
