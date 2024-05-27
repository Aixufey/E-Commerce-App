import axios from "axios";
import {server} from "../store";

export const changePassword = (oldPassword, newPassword) => async (dispatch) => {
    try {
        dispatch({
            type: "changePassword"
        })

        const {data, status} = await axios.put(`${server}/user/changePassword`, {
            oldPassword,
            newPassword
        }, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            },
            timeout: 5000
        })

        if (status === 200) {
            dispatch({
                type: "changePasswordSuccess",
                payload: data.message
            })
        }

    } catch (error) {
        dispatch({
            type: "changePasswordFailed",
            payload: error.response ? error.response.data.message : "Request Timeout"
        })
    }
}

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({
            type: "forgotPasswordRequest"
        })
        const {data} = await axios.post(`${server}/user/forgotpassword`, {
            email: email
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch({
            type: "forgotPasswordSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "forgotPasswordFailed",
            payload: error.response ? error.response.data.message : "Request Timeout"
        })
    }
}

export const resetPassword = (otp, newPassword) => async (dispatch) => {
    try {
        dispatch({
            type: "resetPasswordRequest"
        })

        const {data} = await axios.put(`${server}/user/forgotpassword`, {
            otp,
            newPassword
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        dispatch({
            type: "resetPasswordSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "resetPasswordFailed",
            payload: error.response ? error.response.data.message : "Request Timeout"
        })
    }
}