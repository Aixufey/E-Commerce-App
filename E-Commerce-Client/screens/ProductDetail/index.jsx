import {View, Text, Dimensions, StyleSheet, Image, Pressable} from "react-native";
import {colors, defaultStyles} from "../../styles";
import {Header} from "../../components";
import Carousel from "react-native-snap-carousel";
import React, {useEffect, useRef} from "react";
import {Avatar, Button} from "react-native-paper";
import Toast from "react-native-toast-message";
import {useDispatch, useSelector} from "react-redux";
import {useIsFocused} from "@react-navigation/native";
import {getProductById} from "../../redux/actions/productActions";

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SLIDER_WIDTH;

// Props is provided by Stack.Screen
export default function ({route}) {
    const [quantity, setQuantity] = React.useState(1);
    // Params is provided by navigation hook.
    const {params} = route;
    const isCarousel = useRef(null);

    const {product: {
        name, description, price, stock, images
    }} = useSelector(state => state.product);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    // const images = [{
    //     id: 'a!@#!',
    //     url: 'https://cdn-icons-png.flaticon.com/512/1867/1867565.png'
    // }, {
    //     id: 'b!@#4',
    //     url: 'https://cdn-icons-png.flaticon.com/512/14459/14459511.png'
    // }, {
    //     id: '11#@1',
    //     url: 'https://cdn-icons-png.flaticon.com/512/9404/9404699.png'
    // }]

    const incrementQty = () => {
        if (quantity >= stock) return Toast.show({
            type: "error",
            text1: "Not enough stock"
        })

        if (stock > quantity) {
            setQuantity(prev => prev + 1)
        }
    }
    const decrementQty = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1)
        }
    }

    const addToCartHandler = () => {
        //console.log("Add to cart", quantity)
        if (stock === 0) return Toast.show({
            type: "error",
            text1: "Out Of Stock"
        })

        dispatch({
            type: "addToCart",
            payload: {
                productId: params?.id,
                name,
                price,
                image: images[0]?.url,
                stock,
                quantity
            }
        })
        return Toast.show({
            type: 'success',
            text1: `Added to cart x ${quantity}`,
        })
    }

    // ProductCard is clicked and passed the id of the product in route
    // Use the id to fetch product from the server
    useEffect(() => {
        dispatch(getProductById(params?.id))
    }, [dispatch, params?.id, isFocused])

    return (
        <View style={{
            ...defaultStyles,
            padding: 0,
            backgroundColor: colors.red1
        }}>
            <Header goBack={true}/>

            {/*Carousel*/}
            <Carousel
                layout='stack'
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                ref={isCarousel}
                data={images}
                renderItem={CarouselCardItem}
            />

            {/*Descriptions*/}
            <View className="bg-white p-[35px] flex-1 mt-[-380] rounded-tl-[55px] rounded-tr-[55px]">
                <Text
                    numberOfLines={2}
                    className="text-2xl">{name}
                </Text>
                <Text
                    className="text-2xl font-bold">$ {price}
                </Text>
                <Text
                    numberOfLines={8}
                    className="mx-4 my-4 leading-[20px] tracking-widest">{description}
                </Text>

                <View className="flex-row justify-between items-center px-5 py-5">
                    <Text
                        style={{color: colors.gray}}
                        className={"font-light"}>Quantity
                    </Text>

                    <View className={"w-[80px] flex-row justify-between items-center"}>
                        <Pressable onPress={decrementQty}>
                            <Avatar.Icon className={"rounded-[5px] h-[25px] w-[25px]"}
                                         style={{backgroundColor: colors.light1}} size={20} icon={"minus"}/>
                        </Pressable>
                        <Text
                            style={{borderColor: colors.light2, backgroundColor: colors.white}}
                            className={"h-[25px] w-[25px] text-center border-x rounded-[5px]"}>{quantity}
                        </Text>
                        <Pressable onPress={incrementQty}>
                            <Avatar.Icon className={"rounded-[5px] h-[25px] w-[25px]"}
                                         style={{backgroundColor: colors.light1}} size={20} icon={"plus"}/>
                        </Pressable>
                    </View>
                </View>
                <Pressable
                    onPress={addToCartHandler}
                    style={({pressed}) => [{opacity: pressed ? 0.7 : 1.0}]}>
                    <Button className={"bg-black rounded-[100px] p-2 mx-[35px]"} textColor={colors.white} icon={"cart"}>
                        Add to Cart
                    </Button>
                </Pressable>

            </View>
        </View>
    )
}

const CarouselCardItem = ({item, index}) => (
    <View
        key={index}
        style={cardStyle.container}>
        <Image
            style={cardStyle.image}
            source={{
                uri: item.url
            }}
        />
    </View>
)
const cardStyle = StyleSheet.create({
    container: {
        backgroundColor: colors.red1,
        width: ITEM_WIDTH,
        paddingVertical: 40,
        height: 380
    },
    image: {
        width: ITEM_WIDTH,
        resizeMode: 'contain',
        height: 250,
    }
})