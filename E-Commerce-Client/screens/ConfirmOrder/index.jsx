import {Pressable, ScrollView, Text, View} from "react-native";
import {colors, defaultStyles} from "../../styles";
import {ConfirmOrderItem, Header, HeadingText} from "../../components";
import {cartItems} from "../../utils/cartItems";
import {Button} from "react-native-paper";
import {useSelector} from "react-redux";
import {useState} from "react";

export default function ({navigation}) {
    const {navigate} = navigation;

    const { cartItems } = useSelector(state => state.cart);

    const [itemPrice] = useState(
        cartItems.reduce((prev, curr) => prev + curr.quantity * curr.price, 0)
    );
    const [shipping] = useState(
        itemPrice > 500 ? 0 : 100
    );
    const [tax] = useState(
        Number((itemPrice * 0.25).toFixed())
    );
    const [total] = useState(
        itemPrice + shipping + tax
    );
    return (
        <View style={defaultStyles}>
            {/*Header*/}
            <Header goBack={true}/>

            {/*Heading*/}
            <HeadingText title={"Confirm"} subTitle={"Order"} styles={"pt-[70px]"}/>

            <View className={"py-2 flex-1"}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        cartItems.map(i => (
                            <ConfirmOrderItem
                                key={i.productId}
                                image={i.image}
                                name={i.name}
                                price={i.price}
                                quantity={i.quantity}
                            />
                        ))
                    }
                </ScrollView>
            </View>
            <PriceTag heading={"Subtotal"} value={itemPrice}/>
            <PriceTag heading={"Shipping"} value={shipping}/>
            <PriceTag heading={"Tax"} value={tax}/>
            <PriceTag heading={"Total"} value={total}/>

            <Pressable
                style={({pressed}) => ({opacity: pressed ? 0.7 : 1})}
                onPress={() => navigate("payment", {itemPrice, shipping, tax, total})}
            >
                <Button
                    className={"bg-color3 rounding-[100px] m-4 p-2"}
                    textColor={colors.white}
                    icon={"chevron-right"}
                >
                    Payment
                </Button>
            </Pressable>
        </View>
    )
}

const PriceTag = ({heading, value}) => (
    <View className={"flex-row justify-between items-center my-3"}>
        <Text className={"font-bold"}>{heading}</Text>
        <Text>${value}</Text>
    </View>
)