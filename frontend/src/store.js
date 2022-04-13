import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {
    userDeleteReducer,
    userDetailsReducer,
    userListReducer, userUpdateReducer,
} from "./reducers/userReducer";

const reducer = combineReducers({
    userDetails: userDetailsReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;