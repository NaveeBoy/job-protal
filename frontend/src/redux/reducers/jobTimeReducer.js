import { JOB_TIME_LOAD_FAIL, JOB_TIME_LOAD_REQUEST, JOB_TIME_LOAD_RESET, JOB_TIME_LOAD_SUCCESS } from "../constants/jobTimeConstant"


export const loadJobTimeReducer = (state = { jobTime: [] }, action) => {
    switch (action.type) {
        case JOB_TIME_LOAD_REQUEST:
            return { loading: true }
        case JOB_TIME_LOAD_SUCCESS:
            return {
                loading: false,
                jobTime: action.payload.jobTi
            }
        case JOB_TIME_LOAD_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case JOB_TIME_LOAD_RESET:
            return {}
        default:
            return state;
    }
}