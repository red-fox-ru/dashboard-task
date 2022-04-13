import axios from 'axios'
import {
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,

    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,

} from '../constants/userConstants'

const url = 'http://localhost:8000'

export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }

        const { data } = await axios.get(
            `${url}/api/v1/users/${id}/`,
            config
        )

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }

        const { data } = await axios.get(
            `${url}/api/v1/users/`,
            config
        )
        console.log(data)

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }

        const { data } = await axios.delete(
            `${url}/api/v1/users/${id}/`,
            config
        )

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateUser = (user) => async (dispatch) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.put(
            `${url}/api/v1/users/${user.id}/`,
            user,
            config
        )

        dispatch({
            type: USER_UPDATE_SUCCESS,
        })

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}