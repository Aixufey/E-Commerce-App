import {Pressable, Text, View} from "react-native";
import {colors, defaultStyles} from "../../styles";
import {Header, HeadingText, Loading} from "../../components";
import {Button, RadioButton} from "react-native-paper";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createOrderIntent} from "../../redux/actions/orderActions";
import {useMessageAndErrorOther} from "../../hooks/other/useMessageAndErrorOther";
import {useStripe} from "@stripe/stripe-react-native"
import Toast from "react-native-toast-message";
import axios from "axios";
import {server} from "../../redux/store";

export default function ({route, navigation}) {
    const [isLoadingPayment, setIsLoadingPayment] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("INVOICE");
    const {navigate} = navigation;

    const {itemPrice, shipping, tax, total} = route.params;
    const {cartItems} = useSelector(state => state.cart);
    const {
        user: {
            address,
            country,
            city,
            postCode
        }, isAuthenticated
    } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const stripe = useStripe()

    // After placing the orders, the user should be redirected to the profile page and chart should be emptied by dispatch the emptyCart action
    const {isLoadingOrder} = useMessageAndErrorOther(dispatch, navigation, "profile", () => ({
        type: "emptyCart"
    }))

    /**
     * If client chooses to pay later, paymentInfo is not provided.
     * Since this func accepts paymentInfo as an argument when referencing it we have to provide it as callBack.
     * () => payLaterHandler(paymentInfo)
     * @param paymentInfo
     */
    const payLaterHandler = (paymentInfo) => {
        //console.info("Order Placed");
        // TODO: Change orders controller to accept productId instead of product
        const transform = cartItems.map(item => {
            const {productId, ...rest} = item;
            return {
                product: productId,
                ...rest
            }
        })

        const order = {
            shippingInfo: {
                address: address,
                city: city,
                country: country,
                postCode: postCode,
            },
            orderItems: transform,
            paymentMethod: paymentMethod,
            paymentInfo: paymentInfo,
            itemsPrice: itemPrice,
            taxPrice: tax,
            shippingFee: shipping,
            totalPrice: total,
        }
        // console.log(orders)
        dispatch(createOrderIntent(order))
    }
    const payNowHandler = async () => {
        if (!route.params.total) {
            return Toast.show({
                type: "error",
                text1: "Total amount is required",
                text2: "Please contact the support"
            })
        }

        // Stripe requires the total amount in cents
        const total = route.params.total * 100
        console.log(total)

        try {
            const {
                data: {
                    client_secret
                }
            } = await axios.post(`${server}/order/payment`, {
                total: total
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })

            // 1. Initialize the payment sheet with the client secret returned from the server
            const initPayment = await stripe.initPaymentSheet({
                paymentIntentClientSecret: client_secret,
                merchantDisplayName: "AixufeyEcommerce"
            })

            if (initPayment.error) {
                return Toast.show({
                    type: "error",
                    text1: initPayment.error.message
                })
            }
            // 2. Present the payment sheet
            const presentSheet = await stripe.presentPaymentSheet()
            setIsLoadingPayment(true)

            if (presentSheet.error) {
                setIsLoadingPayment(false)
                return Toast.show({
                    type: "error",
                    text1: presentSheet.error.message
                })
            }
            // 3. Retrieve the payment intent
            const {paymentIntent} = await stripe.retrievePaymentIntent(client_secret)

            if (paymentIntent.status === "Succeeded") {
                // Utilize the payLaterHandler to place the orders.
                // Providing payment info from the paymentIntent if successful.
                payLaterHandler({
                    id: paymentIntent.id,
                    status: paymentIntent.status
                })
            }
        } catch (e) {
            return Toast.show({
                type: "error",
                text1: "Error",
                text2: e.message
            })
        }
    }

    const redirectToLogin = () => {
        navigate("login");
        // navigation.popToTop();
    }


    return (
        isLoadingPayment ? <Loading/> : (
            <View style={defaultStyles}>
                {/*Header*/}
                <Header goBack={true}/>

                {/*Heading*/}
                <HeadingText title={"Payment"} subTitle={"Method"} styles={"pt-[70px]"}/>

                <View className={"bg-color3 p-5 rounded-lg my-5 flex-1 justify-center"}>
                    <RadioButton.Group
                        onValueChange={setPaymentMethod}
                        value={paymentMethod}
                    >
                        <View className={"flex-row justify-between items-center my-2"}>
                            <Text className={"text-xl uppercase font-bold text-color2"}>
                                Pay Later
                            </Text>
                            <RadioButton color={colors.red1} value={"INVOICE"}/>
                        </View>
                        <View className={"flex-row justify-between items-center my-2"}>
                            <Text className={"text-xl uppercase font-bold text-color2"}>
                                Online
                            </Text>
                            <RadioButton color={colors.red1} value={"CARD"}/>
                        </View>
                    </RadioButton.Group>
                </View>

                <Pressable
                    disabled={isLoadingOrder}
                    style={({pressed}) => ({opacity: pressed ? 0.7 : 1})}
                    onPress={
                        !isAuthenticated ? redirectToLogin :
                            paymentMethod === "INVOICE" ? () => payLaterHandler() : payNowHandler
                    }
                >
                    <Button
                        loading={isLoadingOrder}
                        disabled={isLoadingOrder}
                        icon={
                            paymentMethod === "Later" ? "check-circle" : "credit-card"
                        }
                        textColor={colors.white}
                        className={"bg-color3 rounded-[100px] m-2.5 p-1"}>
                        {
                            paymentMethod === "Later" ? "Place Order" : "Pay Now"
                        }
                    </Button>
                </Pressable>

            </View>
        )
    )
}