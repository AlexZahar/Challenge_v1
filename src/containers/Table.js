import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import './Table.css'


class Table extends Component {
//     componentDidMount() {
//      // const candidatesData =
//      //   "http://personio-fe-test.herokuapp.com/api/v1/candidates";
 
//      axios
//        .get("http://personio-fe-test.herokuapp.com/api/v1/candidates")
//        .then(response => {
//          console.log(response);
//          // const candidates = response.data.slice(0, 4);
//          // const updateAplicants = candidates.map(post => {
//          //   return { ...candidates, email: "something" };
//          // });
//          this.setState({ candidates: response.data.data });
//        });
//    }

componentDidMount () {
    console.log(this.props); 
    this.props.onInitCandidates();
}
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { //state is by default an object
         candidates: [
            { id: 12111, name: 'Wasif', age: 21, email: 'wasif@email.com' },
            // { id: 2, name: 'Ali', age: 19, email: 'ali@email.com' },
            // { id: 3, name: 'Saad', age: 16, email: 'saad@email.com' },
            // { id: 4, name: 'Asad', age: 25, email: 'asad@email.com' }
         ]
      }
   }

   renderTableData() {
    return this.state.candidates.map((candidate, index) => {
       const { id, name, email,birth_date, year_of_experience,position_applied,application_date,status} = candidate //destructuring
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
       )
    })
 };
 renderTableHeader() {
    let header = Object.keys(this.state.candidates[0])
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }


   render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
    return (
        
          <div>
            <h1 id='title'>React Dynamic Table</h1>
            <table id='candidates'>
               <tbody>
                  <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>
     )
   }
}

const mapStateToProps = state => {
    return {
        // ctr: state.ctr.counter,
        // storedResult: state.res.results
    };
};
const mapDispatchToProps = dispatch => {
    return {
        // onIncrementCounter: () => dispatch(increment()),
        // onDecrementCounter: () => dispatch(decrement()),
        // onAddFiveCounter: () => dispatch(addFive(5)),
        // onSubtractFiveCounter: () => dispatch(subtractFive(5)),
        // onStoreResult: (result) => dispatch(storeResult(result)),
        // onDeleteResult: (id) => dispatch(deleteResult(id))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Table) //exporting a component make it reusable and this is the beauty of react
