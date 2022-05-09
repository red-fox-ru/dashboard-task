import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {
    userDeleteReducer,
    userDetailsReducer,
    userListReducer, userLoginReducer, userRegisterReducer, userUpdateReducer,
} from "./reducers/userReducer";
import {
    projectCreateReducer,
    projectDeleteReducer,
    projectDetailsReducer,
    projectListReducer,
    projectUpdateReducer
} from "./reducers/projectReducer";
import {
    todoCreateReducer,
    todoDeleteReducer,
    todoDetailsReducer,
    todoListReducer,
    todoUpdateReducer
} from "./reducers/todoReducer";

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    projectList: projectListReducer,
    projectCreate: projectCreateReducer,
    projectDetails: projectDetailsReducer,
    projectDelete: projectDeleteReducer,
    projectUpdate: projectUpdateReducer,

    todoDetails: todoDetailsReducer,
    todoCreate: todoCreateReducer,
    todoList: todoListReducer,
    todoDelete: todoDeleteReducer,
    todoUpdate: todoUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {userLogin: {userInfo: userInfoFromStorage},}

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;