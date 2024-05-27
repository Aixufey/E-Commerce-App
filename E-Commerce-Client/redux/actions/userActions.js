import {server} from '../store'
import axios from "axios";

export const signup = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "registerRequest"
        })

        const {data, status} = await axios.post(`${server}/user/signup`,
            formData,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                timeout: 5000
            })

        if (status === 201) {
            dispatch({
                type: "registerSuccess",
                payload: data.message
            })
        }

    } catch (error) {
        console.log(error.response.data.message)
        dispatch({
            type: "registerFailed",
            payload: error.response ? error.response.data.message : "Request Timeout"
        })
    }
}

export const login = (email, password) => async (dispatch) => {
    try {
        // Dispatch login request, set isLoading to true to show loading spinner
        dispatch({
            type: "loginRequest",
        });

        // Make a POST request to the server
        const {data, status} = await axios.post(`${server}/user/login`, {
            email,
            password
        }, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            },
            timeout: 5000
        });

        if (status === 200) {
            // Data received contains response from the server, example {message: "Login Successful"}
            dispatch({
                type: "loginSuccess",
                payload: data.message
            });
        }

    } catch (error) {
        // Error Object
        // console.log(Object.keys(error))
        // data.message is the error response json from the server, example {message: "Invalid Credentials"}
        dispatch({
            type: "loginFailed",
            payload: error.response ? error.response.data.message : "Request Timeout"
        })
    }
}

export const getUser = () => async (dispatch) => {
    try {
        // Dispatch get user request, set isLoading to true to show loading spinner
        // On app start, this action will be dispatched to get the user from the server.
        dispatch({
            type: "getUserRequest"
        })

        // This endpoint is protected by isAuthenticated middleware, so we need to send the cookie received from login.
        const {data, status} = await axios.get(`${server}/user/me`, {
            withCredentials: true
        });

        if (status === 200) {
            // Dispatch next builder action and send payload to the reducer
            dispatch({
                type: "getUserSuccess",
                payload: data.user
            })
        }
    } catch (error) {
        dispatch({
            type: "getUserFailed",
            payload: error.response ? error.response.data.message : "Request Timeout"
        })
    }
}

export const logout = () => async (dispatch) => {
    try {
        dispatch({
            type: "logoutRequest"
        })

        const {data, status} = await axios.get(`${server}/user/logout`, {
            withCredentials: true
        });

        if (status === 200) {
            dispatch({
                type: "logoutSuccess",
                payload: data.message
            })
        }
    } catch (error) {
        dispatch({
            type: "logoutFailed",
            payload: error.response ? error.response.data.message : "Request Timeout"
        })
    }
}