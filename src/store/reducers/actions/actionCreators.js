import * as actionTypes from './actionTypes' 
import axios from 'axios'



export const fetchCandidatesSuccess = ( candidates ) => {
    return {
        type: actionTypes.FETCH_CANDIDATES_SUCCESS,
        candidates: candidates
    };
};

export const fetchCandidatesFail = ( error ) => {
    return {
        type: actionTypes.FETCH_CANDIDATES_FAILED,
        error: error
    };
};

export const fetchCandidatesStart = () => {
    return {
        type: actionTypes.FETCH_CANDIDATES_START
    };
};

export const fetchCandidates = () => {
    return dispatch => {
        // dispatch(fetchCandidatesStart());
        axios.get( 'http://personio-fe-test.herokuapp.com/api/v1/candidates' )
            .then( res => {
                console.log(res.data)
                const fetchedCandidates = [];
                // for ( let key in res.data.data ) {
                //     fetchedCandidates.push( {
                //         ...res.data.data[key],
                //         id: key
                //     } );
                // }
                dispatch(fetchCandidatesSuccess(fetchedCandidates));
            } )
            .catch( err => {
                dispatch(fetchCandidatesFail(err));
            } );
    };
};





// export const onGetCandidatesHandler = async () => {
//     return {
//         type: GET_CANDIDATES,
//     }
//     // try {
//     //   let res = await axios.get(
//     //     "http://personio-fe-test.herokuapp.com/api/v1/candidates"
//     //   );
//     //   console.log(res);
//     //   let { data } = res.data;
//     //   this.setState({ candidates: data });
//     // } catch (err) {
//     //   console.log(err);
//     //   throw err;
//     // }

//   };