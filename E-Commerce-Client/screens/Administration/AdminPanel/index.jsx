import {Pressable, ScrollView, Text, View} from "react-native";
import {colors, defaultStyles} from "../../../styles";
import {Loading} from "../../../components";
import {ButtonBox} from "../../Profile";
import {ProductListHeading, ProductListItem} from "../../../components/Administration";
import Chart from "../../../components/Administration/Chart";
import {Avatar} from "react-native-paper";
import {useAdminProducts} from "../../../hooks/admin/useAdminProducts";
import {useDispatch} from "react-redux";
import {deleteProduct} from "../../../redux/actions/productActions";

export default function ({navigation}) {
    const {navigate} = navigation;

    const dispatch = useDispatch();
    const isFocused = navigation.isFocused();
    const {isLoading, products, inStock, outOfStock} = useAdminProducts(dispatch, isFocused)

    const navigationHandler = (key) => {
        switch (key) {
            case "Product":
                navigate("adminProduct");
                break;
            case "All Orders":
                navigate("adminOrder");
                break;
            case "Category":
                navigate("adminCategory");
        }
    }

    const deleteProductHandler = (id) => {
        //console.info("Delete Product: ", id)
        dispatch(deleteProduct(id))
    }

    return (
        <View style={defaultStyles}>
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
                    Admin Panel
                </Text>
            </View>
            {isLoading ? <Loading/> : (
                <>
                    {/*Chart*/}
                    <View className={"bg-color3 rounded-2xl items-center"}>
                        <Chart inStock={inStock} outOfStock={outOfStock}/>
                    </View>
                    <View>
                        <View className={"justify-between flex-row m-2"}>
                            <ButtonBox
                                icon={"plus"}
                                text={"Product"}
                                handler={navigationHandler}
                            />
                            <ButtonBox
                                icon={"format-list-bulleted-square"}
                                text={"All Orders"}
                                handler={navigationHandler}
                                isReverse={true}
                            />
                            <ButtonBox
                                icon={"plus"}
                                text={"Category"}
                                handler={navigationHandler}
                            />
                        </View>
                    </View>

                    {/*Dashboard Column*/}
                    <ProductListHeading/>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            {products &&
                                products.length > 0 &&
                                products.map((item, index) => (
                                    <ProductListItem
                                        key={item._id}
                                        id={item._id}
                                        index={index}
                                        price={item.price}
                                        name={item.name}
                                        stock={item.stock}
                                        category={item.category?.category}
                                        image={item.images.at(0)?.url}
                                        navigate={navigate}
                                        deleteHandler={() => deleteProductHandler(item._id)}
                                    />

                                ))

                            }
                        </View>
                    </ScrollView>
                </>
            )

            }
        </View>
    )
}