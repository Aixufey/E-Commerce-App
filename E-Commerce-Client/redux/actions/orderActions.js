import axios from "axios";
import {server} from "../store";

axios.defaults.baseURL = server;
axios.defaults.withCredentials = true;
export const createOrderIntent = (order) => async (dispatch) => {
    try {
        dispatch({
            type: "createOrderRequest"
        })
        const {data, status} = await axios.post("/order/new", order, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (status === 201) {
            dispatch({
                type: "createOrderSuccess",
                payload: data.message
            })
        }

    } catch (error) {
        dispatch({
            type: "createOrderFailed",
            payload: error.response ? error.response.data.message : "Request Timeout"
        })
    }
}

export const processOrder = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "processOrderRequest"
        })

        const {data, status} = await axios.put(`/order/order/${id}`, {}, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        dispatch({
            type: "processOrderSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "processOrderFailed",
            payload: error.response ? error.response.data.message : "Request Timeout"
        })
    }
}