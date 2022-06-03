import axios from 'axios'
import {
    PROJECT_CREATE_FAIL,
    PROJECT_CREATE_REQUEST, PROJECT_CREATE_SUCCESS,
    PROJECT_DELETE_FAIL,
    PROJECT_DELETE_REQUEST, PROJECT_DELETE_SUCCESS,
    PROJECT_DETAILS_FAIL,
    PROJECT_DETAILS_REQUEST, PROJECT_DETAILS_SUCCESS,
    PROJECT_LIST_FAIL,
    PROJECT_LIST_REQUEST,
    PROJECT_LIST_SUCCESS, PROJECT_UPDATE_FAIL, PROJECT_UPDATE_REQUEST, PROJECT_UPDATE_SUCCESS
} from "../constants/projectConstants";


const url = 'http://localhost:8000'
export const listProject = () => async (dispatch) => {
    try {
        dispatch({type: PROJECT_LIST_REQUEST})

        const {data} = await axios.get(`${url}/api/v1/projects/`)

        dispatch({
            type: PROJECT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PROJECT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const ProjectDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: PROJECT_DETAILS_REQUEST})

        const {data} = await axios.get(`${url}/api/v1/projects/${id}`)
        console.log(data)

        dispatch({
            type: PROJECT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PROJECT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteProject = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PROJECT_DELETE_REQUEST
        })

        const {data} = await axios.delete(
            `${url}/api/v1/projects/${id}`,
        )

        dispatch({
            type: PROJECT_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PROJECT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createProject = (title) => async (dispatch) => {
    const project = {"title": title, "users": []}
    try {
        dispatch({
            type: PROJECT_CREATE_REQUEST
        })

        const {data} = await axios.post(
            `${url}/api/v1/projects/`,
            project,
        )
        dispatch({
            type: PROJECT_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: PROJECT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateProject = (project) => async (dispatch) => {
    try {
        dispatch({
            type: PROJECT_UPDATE_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const {data} = await axios.put(
            `${url}/api/v1/projects/${project.id}/`,
            project,
            config
        )
        dispatch({
            type: PROJECT_UPDATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type: PROJECT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PROJECT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
