import React, { Component } from "react";
import classes from "./CandidateTable.module.css";
import Aux from "../../hoc/Aux";
import {connect} from 'react-redux'
import Modal from '../../components/Modal/Modal'
import axios from "../../axios-config";
import Spinner from "../../components/Spinner/Spinner";
import * as actionTypes from '../../store/reducers/actions/actionTypes'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionCreators from '../../store/reducers/actions/actionCreators'

class CandidateTable extends Component {
  
    // state = {
    //   //state is by default an object
    //   candidates: [],
    //   showTable: false
    // };
  
  componentDidMount() {
    return this.props.onFetchCandidates()
   
  }

  // onGetCandidatesHandler = async () => {
  //   try {
  //     let res = await axios.get(
  //       "http://personio-fe-test.herokuapp.com/api/v1/candidates"
  //     );
  //     console.log(res);
  //     let { data } = res.data;
  //     this.setState({ candidates: data });
  //   } catch (err) {
  //     console.log(err);
  //     throw err;
  //   }
  // };

  // onRenderTableData() {
  //   return this.state.props.candidates.map((candidates, index) => {
  //     const {
  //       id,
  //       name,
  //       birth_date,
  //       year_of_experience,
  //       position_applied,
  //       application_date,
  //       status,
  //       email
  //     } = candidates; //destructuring
  //     return (
  //       <tr key={id}>
  //         <td>{id}</td>
  //         <td>{name}</td>
  //         <td>{email}</td>
  //         <td>{birth_date}</td>
  //         <td>{year_of_experience}</td>
  //         <td>{position_applied}</td>
  //         <td>{application_date}</td>
  //         <td>{status}</td>
  //       </tr>
  //     );
  //   });
  // }
  // onToggleTableHandler = () => {
  //   this.onGetCandidatesHandler();
  //   const doesShow = this.state.showTable;
  //   this.setState({ showTable: !doesShow });
  // };

  // onRenderTableHeader() {
  //   let header = Object.keys(this.props.candidates[0]);
  //   return header.map((key, index) => {
  //     return <th key={index}>{key.toUpperCase()}</th>;
  //   });
  // }

  render() {
    //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
    // let spinner = null;
    // let table = null;
    // if (this.props.showTable | (this.props.candidates.length > 1)) {
    //   spinner = null;
    //   table = (
    //     <div>
    //       <h2 className={classes.Title}>Candidates Table</h2>
    //       <table className={classes.Candidates}>
    //         <tbody>
    //           <tr>{this.onRenderTableHeader()}</tr>
    //           {this.onRenderTableData()}
    //         </tbody>
    //       </table>
    //     </div>
    //   );
    // } else if (!this.props.showTable) {
    //   spinner = <Spinner />;
    // }
    let spinner = null
    if(!this.props.candidates.length){
      spinner = <Spinner/>
    }
    return (
   

      <Aux>
        {/* <button onClick={this.onInitCandidates()}>Show Candidate Table</button> */}
        <div className={classes.Candidates__wrapper}>
          {spinner}
          {/* {table}
          {spinner} */}
          {/* {this.props.candidates} */}
           </div>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
candidates: state.candidates
  };
}

const mapDispatchToProps = dispatch => {
  return {
    
    onFetchCandidates: () => dispatch(actionCreators.fetchCandidates()),
    // onRenderTableHeaderHandler: () => dispatch(actionCreators.onRenderTableHeaderHandler()),
    // onRenderTableDataHandler: () => dispatch(actionCreators.onRenderTableDataHandler()),
    // onToggleTableHandler: () => dispatch(actionCreators.onToggleTableHandler())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(CandidateTable, axios));
