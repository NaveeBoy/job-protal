import axios from 'axios';
import {
    JOB_LOAD_FAIL,
    JOB_LOAD_REQUEST,
    JOB_LOAD_SINGLE_FAIL,
    JOB_LOAD_SINGLE_REQUEST,
    JOB_LOAD_SINGLE_SUCCESS,
    JOB_LOAD_SUCCESS,
    JOB_DELETE_REQUEST,
    JOB_DELETE_SUCCESS,
    JOB_DELETE_FAIL
} from "../constants/jobconstant"


export const jobLoadAction = (pageNumber, keyword = '', cat = '', location = '') => async (dispatch) => {
    
    try {
        dispatch({ type: JOB_LOAD_REQUEST });
        const { data } = await axios.get(`/api/jobs/show/?pageNumber=${pageNumber}&keyword=${keyword}&cat=${cat}&location=${location}`)
        dispatch({
            type: JOB_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: JOB_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}

// single job action
export const jobLoadSingleAction = (id) => async (dispatch) => {
    dispatch({ type: JOB_LOAD_SINGLE_REQUEST });
    try {
        const { data } = await axios.get(`/api/job/${id}`);
        dispatch({
            type: JOB_LOAD_SINGLE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: JOB_LOAD_SINGLE_FAIL,
            payload: error.response.data.error
        });
    }
}


//all jobs
export const jobAllLoadAction = () => async (dispatch) => {
    dispatch({ type: JOB_LOAD_REQUEST });
    try {
        const { data } = await axios.get('/api/jobs/allJobs');
        dispatch({
            type: JOB_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: JOB_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}


// Delete job by ID
export const deleteJobAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: JOB_DELETE_REQUEST });
        await axios.delete(`/api/job/delete/${id}`);
        dispatch({
            type: JOB_DELETE_SUCCESS,
            payload: id
        });
    } catch (error) {
        dispatch({
            type: JOB_DELETE_FAIL,
            payload: error.response.data.error
        });
    }
};
