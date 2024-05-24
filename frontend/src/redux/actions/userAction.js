import axios from 'axios';
import { toast } from "react-toastify";
import {
    ALL_USER_LOAD_FAIL,
    ALL_USER_LOAD_REQUEST,
    ALL_USER_LOAD_SUCCESS,
    USER_APPLY_JOB_FAIL,
    USER_APPLY_JOB_REQUEST,
    USER_APPLY_JOB_SUCCESS,
    USER_LOAD_FAIL,
    USER_LOAD_REQUEST,
    USER_LOAD_SUCCESS,
    USER_LOGOUT_FAIL,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    ALL_SEEKERS_LOAD_REQUEST,
    ALL_SEEKERS_LOAD_SUCCESS,
    ALL_SEEKERS_LOAD_FAIL
} from '../constants/userConstant';



export const userSignInAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST });
    try {
        const { data } = await axios.post("/api/signin", user);
        localStorage.setItem('userInfo', JSON.stringify(data));
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        toast.success("Login Successfully!");
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

//User SignUp

export const userSignUpAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST });
    try {
        const { data } = await axios.post("/api/signup", user);
        localStorage.setItem('userInfo', JSON.stringify(data));
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        toast.success("Sign Successfully!");
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

//log out action
export const userLogoutAction = () => async (dispatch) => {
    dispatch({ type: USER_LOGOUT_REQUEST });
    try {
        const { data } = await axios.get("/api/logout");
        localStorage.removeItem('userInfo');
        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data
        });
        toast.success("Log out successfully!");
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}


//user profile action
export const userProfileAction = () => async (dispatch) => {
    dispatch({ type: USER_LOAD_REQUEST });
    try {
        const { data } = await axios.get("/api/me");
        dispatch({
            type: USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}


//all user action
export const allUserAction = () => async (dispatch) => {
    dispatch({ type: ALL_USER_LOAD_REQUEST });
    try {
        const { data } = await axios.get("/api/allusers");
        dispatch({
            type: ALL_USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ALL_USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}

//user job apply action
export const userApplyJobAction = (job, cv) => async (dispatch) => {
    dispatch({ type: USER_APPLY_JOB_REQUEST });

    const formData = new FormData();
    formData.append('title', job.title);
    formData.append('description', job.description);
    formData.append('salary', job.salary);
    formData.append('location', job.location);
    formData.append('cv', cv);

    try {
        const { data } = await axios.post("/api/user/jobhistory", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        dispatch({
            type: USER_APPLY_JOB_SUCCESS,
            payload: data
        });
        toast.success("Apply Successfully for this Job!");
    } catch (error) {
        dispatch({
            type: USER_APPLY_JOB_FAIL,
            payload: error.response.data.error
        });
        toast.error("You must need to be a Registered Seeker");
    }
}

// get all seekers action
export const allSeekersAction = () => async (dispatch) => {
    dispatch({ type: ALL_SEEKERS_LOAD_REQUEST });
    try {
        const { data } = await axios.get("http://localhost:9000/api/seekers");
        dispatch({
            type: ALL_SEEKERS_LOAD_SUCCESS,
            payload: data.seekers
        });
    } catch (error) {
        dispatch({
            type: ALL_SEEKERS_LOAD_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
        toast.error(error.response.data.error || error.message);
    }
}
