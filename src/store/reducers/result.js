import * as actionTypes from '../reducers/actions/actionTypes'
import {updateObject} from '../utility'


const initialState = {
    candidates: [],
    error: false
}
const setCandidates = (state, action) => {
    return updateObject( state, {
        candidates: {
            id: action.candidates.id,
            email: action.candidates.email,
            
        },
        error: false
    } );
};

const fetchCandidatesFailed = (state, action) => {
    return updateObject( state, { error: true } );
};

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.GET_CANDIDATES_REQUEST: return setCandidates(state, action);    
        case actionTypes.GET_CANDIDATES_ERROR: return fetchCandidatesFailed(state, action);
        default: return state;
    }

  
};

export default reducer;

// http://personio-fe-test.herokuapp.com/api/v1/candidates