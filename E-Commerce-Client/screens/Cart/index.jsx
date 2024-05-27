import React from "react";
import {Pressable, ScrollView, Text, View} from "react-native";
import {defaultStyles} from "../../styles";
import {CartItem, Header, HeadingText} from "../../components";
import {Button} from "react-native-paper";
// import {cartItems} from "../../utils/cartItems";
import {useDispatch, useSelector} from "react-redux";
import Toast from "react-native-toast-message";


export default function ({route, navigation}) {
    const {navigate} = navigation;

    const dispatch = useDispatch();
    const {cartItems} = useSelector(state => state.cart);

    const incrementHandler = (id, name, price, image, stock, quantity) => {
        const newQuantity = quantity + 1;

        if (quantity >= stock) {
            return Toast.show({
                type: "error",
                text1: "Not enough stock"
            })
        }

        dispatch({
            type: "addToCart",
            payload: {
                productId: id,
                name,
                price,
                image,
                stock,
                quantity: newQuantity
            }
        })
    }
    const decrementHandler = (id, name, price, image, stock, quantity) => {
        const newQuantity = quantity - 1;

        if (quantity <= 1) {
            // remove from cart
            return dispatch({
                type: "removeFromCart",
                payload: id
            })
        }

        dispatch({
            type: "addToCart",
            payload: {
                productId: id,
                name,
                price,
                image,
                stock,
                quantity: newQuantity
            }
        })
    }

    return (
        <View style={{
            ...defaultStyles,
            padding: 0
        }}>
            {/*Header*/}
            <Header goBack={true} emptyCart={true}/>

            {/*Heading*/}
            <HeadingText
                styles={"mt-[70px] ml-[35px]"}
                title={"Shopping"}
                subTitle={"Cart"}
            />

            <View className={"flex-1 py-[20px]"}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {cartItems && cartItems.length > 0 ?
                        cartItems.map((item, index) => (
                            <CartItem
                                key={item.productId}
                                id={item.productId}
                                index={index}
                                name={item.name}
                                stock={item.stock}
                                price={item.price}
                                imageSrc={item.image}
                                quantity={item.quantity}
                                incrementHandler={incrementHandler}
                                decrementHandler={decrementHandler}
                                navigate={navigate}
                            />
                        )) : <Text className={"text-center text-xl"}>Cart is empty.</Text>
                    }
                </ScrollView>
            </View>

            <View className={"flex-row justify-between px-[35px]"}>
                <Text>{cartItems.length} items</Text>
                <Text>$ {cartItems.reduce((prev, curr) => prev + curr.quantity * curr.price, 0)}</Text>
            </View>

            <Pressable
                style={({pressed}) => ({opacity: pressed ? 0.7 : 1})}
                onPress={cartItems.length > 0 ? () => navigate('confirmOrder') : null}
            >
                <Button
                    icon={"cart"}
                    textColor={"white"}
                    className={"bg-color3 rounding-[100px] m-4 p-2"}>
                    Checkout
                </Button>
            </Pressable>

        </View>
    )
}