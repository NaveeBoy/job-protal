    import { createStore, combineReducers, applyMiddleware } from 'redux';
    import thunk from 'redux-thunk';
    import { composeWithDevTools } from '@redux-devtools/extension';
    import { loadJobReducer, loadJobSingleReducer, loadALLJobReducer } from './reducers/jobReducer';
    import { loadJobTypeReducer } from './reducers/jobTypeReducer';
    import { allUserReducer, userApplyJobReducer, userReducerLogout, userReducerProfile, userReducerSignIn,allUserLoadReducer } from './reducers/userReducer';
    import { loadJobTimeReducer } from './reducers/jobTimeReducer';

    //combine reducers
    const reducer = combineReducers({
        loadJobs: loadJobReducer,
        jobTypeAll: loadJobTypeReducer,
        signIn: userReducerSignIn,
        logOut: userReducerLogout,
        userProfile: userReducerProfile,
        singleJob: loadJobSingleReducer,
        userJobApplication: userApplyJobReducer,
        allUsers: allUserReducer,
        jobTime:loadJobTimeReducer,
        alljobs:loadALLJobReducer,
        allUsersDash:allUserLoadReducer

    });


    //initial state
    let initialState = {
        signIn: {
            userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
        }
    };
    const middleware = [thunk];
    const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


    export default store;