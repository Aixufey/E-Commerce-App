import {useSelector} from "react-redux";
import {useEffect} from "react";
import Toast from "react-native-toast-message";

export const useMessageAndErrorOther = (
    dispatch,
    navigation,
    navigatePath,
    fn
) => {

    // For Password
    const {isLoading, message, error} = useSelector(state => state.password);

    // For Profile
    const {
        isLoading: isLoadingProfile,
        message: messageProfile,
        error: errorProfile
    } = useSelector(state => state.profile);

    // For Orders
    const {isLoading: isLoadingOrder, message: messageOrder, error: errorOrder} = useSelector(state => state.order);

    // For Category
    const {
        isLoading: isLoadingCategory,
        message: messageCategory,
        error: errorCategory
    } = useSelector(state => state.category);

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
            Toast.show({
                type: "success", text1: message
            });

            dispatch({
                type: "clearMessage"
            })

            navigatePath && navigation.navigate(navigatePath);
            fn && dispatch(fn())
        }

        if (errorProfile) {
            Toast.show({
                type: "error", text1: errorProfile
            });

            dispatch({
                type: "clearError"
            });
        }
        if (messageProfile) {
            Toast.show({
                type: "success", text1: messageProfile
            });

            dispatch({
                type: "clearMessage"
            })

            navigatePath && navigation.navigate(navigatePath);
            fn && dispatch(fn())
        }

        if (errorOrder) {
            Toast.show({
                type: "error", text1: errorOrder
            });

            dispatch({
                type: "clearError"
            });
        }

        if (messageOrder) {
            Toast.show({
                type: "success", text1: messageOrder
            });

            dispatch({
                type: "clearMessage"
            })

            // Redirect user back to Profile Page after successful orders.
            // dispatch object is passed to the hook via Payment.
            navigatePath && navigation && navigation.navigate(navigatePath);
            fn && dispatch(fn())
        }

        if (errorCategory) {
            Toast.show({
                type: "error", text1: errorCategory
            });

            dispatch({
                type: "clearError"
            });
        }

        if (messageCategory) {
            Toast.show({
                type: "success", text1: messageCategory
            });

            dispatch({
                type: "clearMessage"
            })
        }

    }, [error, message, errorProfile, messageProfile, errorOrder, errorCategory, messageCategory, dispatch]);


    return {
        isLoading,
        isLoadingProfile,
        isLoadingOrder,
        isLoadingCategory
    };
}