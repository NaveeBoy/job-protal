import {
    ALL_USER_LOAD_FAIL,
    ALL_USER_LOAD_REQUEST,
    ALL_USER_LOAD_RESET,
    ALL_USER_LOAD_SUCCESS,
    USER_APPLY_JOB_FAIL,
    USER_APPLY_JOB_REQUEST,
    USER_APPLY_JOB_RESET,
    USER_APPLY_JOB_SUCCESS,
    USER_LOAD_FAIL,
    USER_LOAD_REQUEST,
    USER_LOAD_RESET,
    USER_LOAD_SUCCESS,
    USER_LOGOUT_FAIL,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_RESET, USER_LOGOUT_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_RESET,
    USER_SIGNIN_SUCCESS,
    ALL_SEEKERS_LOAD_REQUEST,
    ALL_SEEKERS_LOAD_SUCCESS,
    ALL_SEEKERS_LOAD_FAIL,
    USER_UPDATE_JOB_HISTORY_REQUEST,
    USER_UPDATE_JOB_HISTORY_SUCCESS,
    USER_UPDATE_JOB_HISTORY_FAIL,
    USER_DELETE_JOB_HISTORY_REQUEST,
    USER_DELETE_JOB_HISTORY_SUCCESS,
    USER_DELETE_JOB_HISTORY_FAIL
} from "../constants/userConstant"


export const userReducerSignIn = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true, userInfo: null, isAuthenticated: false }
        case USER_SIGNIN_SUCCESS:
            return {

                loading: false,
                userInfo: action.payload,
                isAuthenticated: true
            }
        case USER_SIGNIN_FAIL:
            return { loading: false, userInfo: null, isAuthenticated: false, error: action.payload }
        case USER_SIGNIN_RESET:
            return {}
        default:
            return state;
    }

}

//user SignUp

export const userReducerSignUp = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true, userInfo: null, isAuthenticated: false }
        case USER_SIGNIN_SUCCESS:
            return {

                loading: false,
                userInfo: action.payload,
                isAuthenticated: true
            }
        case USER_SIGNIN_FAIL:
            return { loading: false, userInfo: null, isAuthenticated: false, error: action.payload }
        case USER_SIGNIN_RESET:
            return {}
        default:
            return state;
    }

}

//user profile
export const userReducerProfile = (state = { user: null }, action) => {
    switch (action.type) {
        case USER_LOAD_REQUEST:
            return { loading: true, user: null }
        case USER_LOAD_SUCCESS:
            return {
                loading: false,
                user: action.payload.user,
            }
        case USER_LOAD_FAIL:
            return { loading: false, user: null, error: action.payload }
        case USER_LOAD_RESET:
            return {}
        default:
            return state;
    }

}

//log out reducer
export const userReducerLogout = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGOUT_REQUEST:
            return { loading: true }
        case USER_LOGOUT_SUCCESS:
            return {
                loading: false,
                user: action.payload,
            }
        case USER_LOGOUT_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT_RESET:
            return {}
        default:
            return state;
    }

}

// apply for a job reducer
export const userApplyJobReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_APPLY_JOB_REQUEST:
            return { loading: true }
        case USER_APPLY_JOB_SUCCESS:
            return {
                loading: false,
                userJob: action.payload,
            }
        case USER_APPLY_JOB_FAIL:
            return { loading: false, error: action.payload }
        case USER_APPLY_JOB_RESET:
            return {}
        default:
            return state;
    }

}


//all users reducer
export const allUserReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case ALL_USER_LOAD_REQUEST:
            return { loading: true, users: [] }
        case ALL_USER_LOAD_SUCCESS:
            return {
                loading: false,
                users: action.payload.users,
            }
        case ALL_USER_LOAD_FAIL:
            return { loading: false, users: [], error: action.payload }
        case ALL_USER_LOAD_RESET:
            return {}
        default:
            return state;
    }

}

//allUser
export const allUserLoadReducer = (state = { users: [], total: 0 }, action) => {
    switch (action.type) {
        case ALL_USER_LOAD_REQUEST:
            return { loading: true, users: [] }
        case ALL_USER_LOAD_SUCCESS:
            return {
                loading: false,
                users: action.payload.users,
                total: action.payload.total
            }
        case ALL_USER_LOAD_FAIL:
            return { loading: false, users: [], error: action.payload }
        case ALL_USER_LOAD_RESET:
            return {}
        default:
            return state;
    }
}

// all seekers

export const allSeekersReducer = (state = { seekers: [] }, action) => {
    switch (action.type) {
        case ALL_SEEKERS_LOAD_REQUEST:
            return { loading: true, seekers: [] };
        case ALL_SEEKERS_LOAD_SUCCESS:
            return { loading: false, seekers: action.payload };
        case ALL_SEEKERS_LOAD_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};


export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true };
        case USER_DELETE_SUCCESS:
            return { loading: false, success: true };
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};


// Update job history reducer
export const userUpdateJobHistoryReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_JOB_HISTORY_REQUEST:
            return { loading: true };
        case USER_UPDATE_JOB_HISTORY_SUCCESS:
            return { loading: false, success: true };
        case USER_UPDATE_JOB_HISTORY_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// Delete job history reducer
export const userDeleteJobHistoryReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_JOB_HISTORY_REQUEST:
            return { loading: true };
        case USER_DELETE_JOB_HISTORY_SUCCESS:
            return { loading: false, success: true };
        case USER_DELETE_JOB_HISTORY_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
