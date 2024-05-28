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

export const loadJobTypeReducer = (state = { jobType: [], total: 0, loading: false, error: null }, action) => {
    switch (action.type) {
        case JOB_TYPE_LOAD_REQUEST:
            return { ...state, loading: true };
        case JOB_TYPE_LOAD_SUCCESS:
            return {
                loading: false,
                jobType: action.payload.jobT,
                total: action.payload.total,
                error: null
            };
        case JOB_TYPE_LOAD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case JOB_TYPE_UPDATE_REQUEST:
        case JOB_TYPE_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case JOB_TYPE_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                jobType: state.jobType.map(type => type._id === action.payload._id ? action.payload : type)
            };
        case JOB_TYPE_UPDATE_FAIL:
        case JOB_TYPE_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case JOB_TYPE_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                jobType: state.jobType.filter(type => type._id !== action.payload)
            };
        default:
            return state;
    }
};
