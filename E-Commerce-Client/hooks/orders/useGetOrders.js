import {useEffect, useState} from "react";
import {server} from "../../redux/store";
import axios from "axios";
import Toast from "react-native-toast-message";

export const useGetOrders = (setFilteredOrders, isFocused, isAdmin = false) => {

    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // console.log("Fetching Orders")
        setIsLoading(true)

        axios.defaults.withCredentials = true;
        axios.get(`${server}/order/${isAdmin ? 'admin' : 'all'}`)
            .then((res) => {
                setOrders(res.data.orders);
                setFilteredOrders && setFilteredOrders(res.data.orders)
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false)
                Toast.show({
                    type: 'error',
                    text1: err.response.data.message
                })
            })

        return () => {
            // console.log("Cleanup")
        }
    }, [isFocused]);

    return {
        orders,
        isLoading
    }
}