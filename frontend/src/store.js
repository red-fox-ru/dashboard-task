import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {
    userDeleteReducer,
    userDetailsReducer,
    userListReducer, userUpdateReducer,
} from "./reducers/userReducer";
import {
    projectCreateReducer,
    projectDeleteReducer,
    projectDetailsReducer,
    projectListReducer,
    projectUpdateReducer
} from "./reducers/projectReducer";
import {todoCreateReducer} from "./reducers/todoReducer";

const reducer = combineReducers({
    userDetails: userDetailsReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    projectList: projectListReducer,
    projectCreate: projectCreateReducer,
    projectDetails: projectDetailsReducer,
    projectDelete: projectDeleteReducer,
    projectUpdate: projectUpdateReducer,

    todoDetails: userDetailsReducer,
    todoCreate: todoCreateReducer,
    todoList: userListReducer,
    todoDelete: userDeleteReducer,
    todoUpdate: userUpdateReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;