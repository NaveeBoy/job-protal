import axios from 'axios';
import { CATEGORY_REQUEST, CATEGORY_SUCCESS, CATEGORY_FAIL } from '../constants/categoryConstants';

export const getAllCategories = () => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_REQUEST });

        const { data } = await axios.get('/api/type/jobs'); // Adjust the API endpoint

        dispatch({
            type: CATEGORY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CATEGORY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
