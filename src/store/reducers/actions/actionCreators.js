import * as actionTypes from "./actionTypes";
import axios from "../../../axios-config";

export const renderTableData = () => {
  return {
    type: actionTypes.RENDER_TABLE_DATA
  };
};

export const onRenderTableData = () => {
  return dispatch => {
    console.log("pulaaa");

    dispatch(renderTableData());
  };
};
// ----------------------------------------------

export const fetchCandidatesSuccess = candidates => {
  return {
    type: actionTypes.FETCH_CANDIDATES_SUCCESS,
    candidates: candidates
  };
};

export const fetchCandidatesFail = error => {
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
    dispatch(fetchCandidatesStart());
    axios
      .get("/candidates")
      .then(res => {
        console.log("RESPONSE:", res);
        // const fetchedCandidates = [];
        let { data } = res.data;
        // fetchedCandidates.push(data);
        // for (let candidate in res.data) {
        //   fetchedCandidates.push({
        //     ...res.data[candidate]
        //   });
        // }
        console.log("CONVERTED RESPONSE", data);
        dispatch(fetchCandidatesSuccess(data));
      })
      .catch(err => {
        console.log(err.response);
        dispatch(fetchCandidatesFail(err));
      });
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
