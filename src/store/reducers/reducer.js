import * as actionTypes from './actions/actionTypes'
import { updateObject } from '../utility';

const initialState = {
    candidates: [],
    showTable: false,
    loading: false,
    error:false
    
}

const fetchCanditatesStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchCandidatesSuccess = ( state, action ) => {
    return updateObject( state, {
        candidates: action.candidates,
        loading: false
    } );
};

const fetchCandidatesFailed = ( state, action ) => {
    console.log(state.loading)
    return updateObject( state, { loading: false } );
};


const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_CANDIDATES_START: return fetchCanditatesStart(state,action)
        case actionTypes.FETCH_CANDIDATES_SUCCESS: return fetchCandidatesSuccess(state,action)
        case actionTypes.FETCH_CANDIDATES_FAILED: return fetchCandidatesFailed(state,action)
        default: return state
}
}

export default reducer;