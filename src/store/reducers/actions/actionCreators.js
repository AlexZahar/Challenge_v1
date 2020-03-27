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
        let { data } = res.data;
        dispatch(fetchCandidatesSuccess(data));
      })
      .catch(err => {
        console.log(err.response);
        dispatch(fetchCandidatesFail(err));
      });
  };
};
