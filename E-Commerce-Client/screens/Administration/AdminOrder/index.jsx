import {Pressable, ScrollView, Text, View} from "react-native";
import {colors, defaultStyles} from "../../../styles";
import {Loading, OrderItem} from "../../../components";
import {Avatar, Headline, Searchbar} from "react-native-paper";
import {useEffect, useState} from "react";
import {useIsFocused} from "@react-navigation/native";
import {useGetOrders} from "../../../hooks/orders/useGetOrders";
import {useDispatch} from "react-redux";
import {processOrder} from "../../../redux/actions/orderActions";
import {useUpdateOrders} from "../../../hooks/orders/useUpdateOrders";

export default function ({navigation}) {
    const [query, setQuery] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);

    const isFocused = useIsFocused();
    const {isLoading, orders} = useGetOrders(setFilteredOrders, isFocused, true);

    const dispatch = useDispatch();
    const {isLoading: isProcessingOrder} = useUpdateOrders(dispatch, navigation);
    /**
     * Update the filter based on the query
     * Using a setter into hook to set a shallow copy of the orders.
     * This will not mutate the original orders array when we filter and clear the filter.
     * i.e. if query does not match, the orders is preserved.
     * @param query
     */
    const updateFilter = (query) => {
        const filter = orders && orders.filter(item => {
            return item.shippingInfo.address.toLowerCase().includes(query) ||
                item.shippingInfo.city.toLowerCase().includes(query) ||
                item.shippingInfo.country.toLowerCase().includes(query) ||
                item.shippingInfo.postCode.toLowerCase().includes(query)
        });
        setFilteredOrders(filter)
    }
    const updateHandler = (id) => {
        // console.log('updateHandler', id);
        dispatch(processOrder(id))
    }

    const searchHandler = (text) => {
        setQuery(text);
        const query = text.toLowerCase();
        updateFilter(query);
    }

    useEffect(() => {
        updateFilter(query);
    }, [])

    return (
        <View style={{...defaultStyles, backgroundColor: colors.light2}}>
            {/*Header*/}
            <Pressable
                className={"absolute left-[20px] top-[40px] z-10"}
                onPress={() => navigation.goBack()}>
                <Avatar.Icon
                    icon={"arrow-left"}
                    size={50}
                    color={colors.gray}
                    className={"bg-color4"}
                />
            </Pressable>

            {/*Heading*/}
            <View className={"mb-5 pt-[70px]"}>
                <Text className={"text-2xl text-center font-bold bg-color3 text-color2 p-2 rounded-xl"}>
                    Orders
                </Text>

                <Searchbar
                    elevation={2}
                    className={"mt-2"}
                    value={query}
                    onChangeText={searchHandler}
                />
            </View>
            {isLoading &&
            isLoading ? <Loading/> : (
                <View className={"flex-1 p-2"}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {filteredOrders &&
                        filteredOrders.length > 0 ?
                            filteredOrders.map((item, index) => {
                                const {address, city, country, postCode} = item.shippingInfo;
                                return (
                                    <OrderItem
                                        key={item._id}
                                        index={index}
                                        id={item._id}
                                        price={item.totalPrice}
                                        address={`${address} ${city} ${country} ${postCode}`}
                                        createdAt={item.createdAt.split('T').at(0)}
                                        orderStatus={item.orderStatus}
                                        paymentMethod={item.paymentMethod}
                                        isAdmin={true}
                                        isLoading={isProcessingOrder}
                                        updateHandler={updateHandler}
                                    />
                                )
                            }) : <Headline className={"text-center"}>No Orders</Headline>
                        }
                    </ScrollView>
                </View>
            )
            }
        </View>
    )
}