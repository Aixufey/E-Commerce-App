import {server} from "../store";
import axios from "axios";

axios.defaults.baseURL = server
axios.defaults.withCredentials = true
export const createCategory = (category) => async (dispatch) => {
    try {
        dispatch({
            type: "createCategoryRequest"
        })

        const {data, status} = await axios.post(`/category/createCategory`, {category}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        dispatch({
            type: "createCategorySuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "createCategoryFailed",
            payload: error.response ? error.response.data.message : "Request Timeout"
        })
    }
}

export const deleteCategory = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteCategoryRequest"
        })

        const {data, status} = await axios.delete(`/category/category/${id}`)

        dispatch({
            type: "deleteCategorySuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "deleteCategoryFailed",
            payload: error.response ? error.response.data.message : "Request Timeout"
        })
    }
}