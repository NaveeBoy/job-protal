import axios from 'axios';
import { JOB_TIME_LOAD_FAIL, JOB_TIME_LOAD_REQUEST, JOB_TIME_LOAD_SUCCESS } from '../constants/jobTimeConstant';



export const jobTimeLoadAction = () => async (dispatch) => {
    dispatch({ type: JOB_TIME_LOAD_REQUEST });
    try {
        const { data } = await axios.get('/api/type/jobs');
        dispatch({
            type: JOB_TIME_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: JOB_TIME_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}