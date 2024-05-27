import {useSelector} from "react-redux";
import {useEffect} from "react";
import Toast from "react-native-toast-message";
import {getUser} from "../../redux/actions/userActions";


/**
 * useMessageAndError hook to display error and message from the user reducer
 * @param navigation - navigation object from react-navigation
 * @param navigatePath - path to navigate after success message, default is profile
 * @param dispatch - dispatch function from react-redux
 * @returns {boolean} - isLoading state
 */
export const useMessageAndErrorUser = (navigation, navigatePath = "login", dispatch) => {
    // useSelector to extract state / data from the user reducer
    const {isLoading, message, error} = useSelector(state => state.user);

    useEffect(() => {
        if (error) {
            Toast.show({
                type: "error", text1: error
            });

            dispatch({
                type: "clearError"
            })
        }
        if (message) {
            // Disregard all active screen stacks and reset active screen to navigatePath
            navigation.reset({
                index: 0,
                routes: [{name: navigatePath}]
            })
            Toast.show({
                type: "success", text1: message
            });

            dispatch({
                type: "clearMessage"
            })

            //dispatch(getUser())
        }
    }, [error, message, dispatch]);

    return isLoading;
}