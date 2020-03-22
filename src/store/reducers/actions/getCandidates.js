import * as actionTypes from './actionTypes';
import axios from 'axios'


export const setCandidates = ( candidates ) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        candidates: candidates
    };
};

export const fetchCandidatesFailed = () => {
    return {
        type: actionTypes.GET_CANDIDATES_ERROR
    };
};


export const getCandidates = () => {
    return dispatch => {
        axios.get( 'http://personio-fe-test.herokuapp.com/api/v1/candidates' )
            .then( response => {
               dispatch(actionTypes.setCandidates(response.data.data));
            } )
            .catch( error => {
                dispatch(actionTypes.fetchCandidatesFailed());
            } );

        }
    };
