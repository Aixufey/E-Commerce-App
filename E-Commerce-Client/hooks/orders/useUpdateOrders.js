import {useEffect} from "react";
import Toast from "react-native-toast-message";
import {useSelector} from "react-redux";

export const useUpdateOrders = (dispatch, navigation, navigationPath = "adminPanel") => {

    const {isLoading, message, error} = useSelector(state => state.updateOrder);

    useEffect(() => {
        if (message) {
            Toast.show({
                type: "success", text1: message
            });

            dispatch({
                type: "clearMessage"
            })

            navigation.navigate("adminPanel")
        }

        if (error) {
            Toast.show({
                type: "error", text1: error
            });

            dispatch({
                type: "clearError"
            })
        }
    }, [error, message, dispatch])

    return {
        isLoading
    }
}