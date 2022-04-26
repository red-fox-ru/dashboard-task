import axios from 'axios'
import {
    TODO_CREATE_FAIL,
    TODO_CREATE_REQUEST, TODO_CREATE_SUCCESS,
    TODO_DELETE_FAIL,
    TODO_DELETE_REQUEST, TODO_DELETE_SUCCESS,
    TODO_DETAILS_FAIL,
    TODO_DETAILS_REQUEST,
    TODO_DETAILS_SUCCESS, TODO_LIST_FAIL, TODO_LIST_REQUEST, TODO_LIST_SUCCESS,
    TODO_UPDATE_FAIL,
    TODO_UPDATE_REQUEST,
    TODO_UPDATE_SUCCESS
} from "../constants/todoConstants";


const url = 'http://localhost:8000'
export const listToDo = () => async (dispatch) => {
    try {
        dispatch({type: TODO_LIST_REQUEST})

        const {data} = await axios.get(`${url}/api/v1/todo/`)

        dispatch({
            type: TODO_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: TODO_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const ToDoDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: TODO_DETAILS_REQUEST})

        const {data} = await axios.get(`${url}/api/v1/todo/${id}`)

        dispatch({
            type: TODO_DETAILS_REQUEST,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: TODO_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteToDo = (id) => async (dispatch) => {
    try {
        dispatch({
            type: TODO_DELETE_REQUEST
        })

        const {data} = await axios.delete(
            `${url}/api/v1/todo/${id}/`,
        )

        dispatch({
            type: TODO_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: TODO_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createToDo = (todo) => async (dispatch) => {
    try {
        dispatch({
            type: TODO_CREATE_REQUEST
        })

        const {data} = await axios.post(
            `${url}/api/v1/todo/`,
            todo,
        )
        dispatch({
            type: TODO_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: TODO_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateToDo = (todo) => async (dispatch) => {
    try {
        dispatch({
            type: TODO_UPDATE_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const {data} = await axios.put(
            `${url}/api/v1/todo/${todo.id}/`,
            todo,
            config
        )
        dispatch({
            type: TODO_UPDATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type: TODO_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: TODO_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
