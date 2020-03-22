import React, { Component } from 'react';
// import {connect} from 'react-redux';
// import * as actionType from '../reducers/actions';
import Candidate from '../../components/Candidate/Candidate';
import axios from 'axios'

class Candidates extends Component {
    state = {
        candidatesArr: []
    }
    componentDidMount() {
        // const candidatesData =
        //   "http://personio-fe-test.herokuapp.com/api/v1/candidates";
    
        axios
          .get("http://personio-fe-test.herokuapp.com/api/v1/candidates")
          .then(response => {
            console.log(response);
            // const candidates = response.data.slice(0, 4);
            // const updateAplicants = candidates.map(post => {
            //   return { ...candidates, email: "something" };
            // });
            this.setState({ candidatesArr: response.data.data });
          });
      }
    render () {
        const candidates = this.state.candidatesArr.map(candidate => {
            return <Candidate key={candidate.id} name={candidate.name} />;
          });
        return (
            <div>
                <section>{candidates}</section>
            </div>
        );
    }
}

export default Candidates;