
export const GET_CANDIDATES_REQUEST = "GET_CANDIDATES_REQUEST";
export const GET_CANDIDATES_SUCCESS = "GET_CANDIDATES_SUCCESS";
export const GET_CANDIDATES_ERROR = "GET_CANDIDATES_ERROR";

export const SET_CANDIDATES = "SET_CANDIDATES";




// Candidates Actions.js
// export function loadCandidatesRequest(){
//  return {
//  type: GET_CANDIDATES_REQUEST
//  }
// }

// export function loadCandidatesSuccess(results){
//  return {
//  type: GET_CANDIDATES_SUCCESS,
//  data: results,
//  error: null
//  }
// }

// export function loadCandidatesError(error){
//  return {
//  type: GET_CANDIDATES_SUCCESS,
//  data: null,
//  error: error
//  }
// }


// export const loadCandidates = () => {
//     return async function(dispatch) {
//     dispatch(loadCandidatesRequest());
//     try{
//     let response = (await axios.get("http://yourapi.com/todo/all")).data;
    
//     if(response.status == "ok"){
//     // check if the internal status is ok
//     // then pass on the data
//     dispatch(loadCandidatesSuccess(response.data));
//     }else{
//     // if internally there are errors
//     // pass on the error, in a correct implementation
//     // such errors should throw an HTTP 4xx or 5xx error
//     // so that it directs straight to the catch block
//     dispatch(loadCandidatesError(response.error));
//     } 
//     }catch(error){
//     // any HTTP error is caught here
//     // can extend this implementation to customiz the error messages
//     // ex: dispatch(loadTodoError("Sorry can't talk to our servers right now"));
//     dispatch(loadCandidatesError(response.error));
//     }
//     }
//    }