import {useEffect} from "react";
import {server} from "../../redux/store";
import axios from "axios";
import Toast from "react-native-toast-message";

export const useCategories = (setCategories, isFocused) => {

    axios.defaults.baseURL = server
    useEffect(() => {
        axios.get('/category/categories')
            .then(res => {
                const {categories} = res.data;

                if (res.status === 200) {
                    setCategories(categories)
                }
            })
            .catch(error => {
                Toast.show({
                    type: "error",
                    text1: error.response.data.message
                })
            })

    }, [isFocused]);
}