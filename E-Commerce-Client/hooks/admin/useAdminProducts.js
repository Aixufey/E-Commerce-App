import {useEffect} from "react";
import {getAllAdminProducts} from "../../redux/actions/productActions";
import {useSelector} from "react-redux";
import Toast from "react-native-toast-message";

export const useAdminProducts = (dispatch, isFocused) => {

    const {products, inStock, outOfStock, error, message, isLoading} = useSelector(state => state.product);

    useEffect(() => {
        if (error) {
            Toast.show({
                type: 'error',
                text1: error
            });

            dispatch({
                type: "clearError"
            })
        }

        if (message) {
            Toast.show({
                type: 'success',
                text1: message
            });

            dispatch({
                type: "clearMessage"
            })
        }

        dispatch && dispatch(getAllAdminProducts())

    }, [error, message, dispatch, isFocused])

    return {
        products,
        inStock,
        outOfStock,
        isLoading
    }
}