import axios from "axios";
import {
    JOB_TYPE_LOAD_REQUEST, 
    JOB_TYPE_LOAD_SUCCESS, 
    JOB_TYPE_LOAD_FAIL,
    JOB_TYPE_UPDATE_REQUEST,
    JOB_TYPE_UPDATE_SUCCESS,
    JOB_TYPE_UPDATE_FAIL,
    JOB_TYPE_DELETE_REQUEST,
    JOB_TYPE_DELETE_SUCCESS,
    JOB_TYPE_DELETE_FAIL 
} from "../constants/jobTypeConstant";

export const jobTypeLoadAction = () => async (dispatch) => {
  dispatch({ type: JOB_TYPE_LOAD_REQUEST });
  try {
    const { data } = await axios.get("/api/type/jobs");
    dispatch({
      type: JOB_TYPE_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: JOB_TYPE_LOAD_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Update job type
export const jobTypeUpdateAction = (typeId, updatedData) => async (dispatch) => {
    dispatch({ type: JOB_TYPE_UPDATE_REQUEST });
    try {
        const { data } = await axios.put(`/api/type/update/${typeId}`, updatedData);
        dispatch({
            type: JOB_TYPE_UPDATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: JOB_TYPE_UPDATE_FAIL,
            payload: error.response.data.error
        });
    }
};

// Delete job type
export const jobTypeDeleteAction = (typeId) => async (dispatch) => {
    dispatch({ type: JOB_TYPE_DELETE_REQUEST });
    try {
        const { data } = await axios.delete(`/api/type/delete/${typeId}`);
        dispatch({
            type: JOB_TYPE_DELETE_SUCCESS,
            payload: data.message
        });
    } catch (error) {
        dispatch({
            type: JOB_TYPE_DELETE_FAIL,
            payload: error.response.data.error
        });
    }
};