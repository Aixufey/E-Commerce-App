import {Pressable} from "react-native";
import {Avatar} from "react-native-paper";
import React from "react";
import {colors} from "../../styles";
import {useNavigation, useRoute} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import Toast from "react-native-toast-message";

// Header is a Component, we pass goBack from the parent component to activate the "back" button
// Using navigation hook to go back to the previous screen
export default function ({goBack, emptyCart = false}) {

    const nav = useNavigation();
    const route = useRoute();

    const { cartItems } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const emptyCartHandler = () => {
        if (cartItems.length > 0) {
            dispatch({
                type: "emptyCart",
            })
            Toast.show({
                type: "success",
                text1: "Cleared Cart",
            })
        }
    }

    return (
        <>
            {goBack &&
                <Pressable
                    style={{
                        position: 'absolute',
                        left: 20,
                        top: 40,
                        zIndex: 10
                    }}
                    onPress={() => {
                        nav.goBack()
                    }}
                >
                    <Avatar.Icon
                        style={{backgroundColor: colors.transparent}}
                        icon={'arrow-left'}
                        color={route.name === 'productDetails' ? colors.white : colors.gray}/>
                </Pressable>
            }

                <Pressable
                    style={{
                        position: 'absolute',
                        right: 20,
                        top: 40,
                        zIndex: 10
                    }}
                    onPress={emptyCart ? emptyCartHandler : () => {
                        nav.navigate('cart')
                    }}
                >
                    <Avatar.Icon
                        style={{backgroundColor: colors.transparent}}
                        icon={emptyCart ? "delete-outline" : 'cart-outline'}
                        color={route.name === 'productDetails' ? colors.white : colors.gray}/>
                </Pressable>

        </>
    )
}