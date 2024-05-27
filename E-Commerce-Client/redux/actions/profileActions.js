import {server} from "../store";
import axios from "axios";

export const updatePicture = (file) => async (dispatch) => {
    try {
        dispatch({
            type: "updatePictureRequest"
        })

        axios.defaults.baseURL = server
        axios.defaults.withCredentials = true;
        axios.defaults.headers.put['Content-Type'] = 'multipart/form-data';

        const {data, status} = await axios.put("/user/updatePicture", file);

        if (status === 200) {
            dispatch({
                type: "updatePictureSuccess",
                payload: data.message
            })
        }

    } catch (error) {
        dispatch({
            type: "updatePictureFailed",
            payload: error.response ? error.response.data.message : "Request Timeout"
        })
    }
}

export const updateProfile = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "updateProfileRequest"
        })

        axios.defaults.baseURL = server
        axios.defaults.withCredentials = true;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        const {data, status} = await axios.put(`/user/updateProfile`, formData);

        if (status === 200) {
            dispatch({
                type: "updateProfileSuccess",
                payload: data.message
            })
        }

    } catch (error) {
        dispatch({
            type: "updateProfileFailed",
            payload: error.response ? error.response.data.message : "Request Timeout"
        })
    }
}

/**
 * UpdateProfile is a callback function that receives dispatch as an argument from the redux store
 * @param profile
 * @returns {(function(*): Promise<void>)|*}
 */
export const updateProfileClassic = (profile) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_PROFILE_REQUEST
        })

        axios.defaults.baseURL = server
        axios.defaults.withCredentials = true
        const {data, status} = await axios.put("/user/updateProfile", profile)
        console.log(data)
        if (status === 200) {
            dispatch({
                type: "updateProfileSuccess",
                payload: data.message
            })
        }

    } catch (error) {
        dispatch({
            type: "updateProfileFailed",
            payload: error.response ? error.response.data.message : "Request Timeout"
        })
    }
}