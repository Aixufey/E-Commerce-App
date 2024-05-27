import {Pressable, ScrollView, Text, View} from "react-native";
import {colors, defaultStyles, inputStyles} from "../../../styles";
import {Header, Loading} from "../../../components";
import {Avatar, Button, Headline, TextInput} from "react-native-paper";
import {useEffect, useState} from "react";
import images from "../../../utils/images.json";
import Toast from "react-native-toast-message";
import {useDispatch, useSelector} from "react-redux";
import {addProduct, getProductById, updateProduct} from "../../../redux/actions/productActions";
import {useCategories} from "../../../hooks/categories/useCategories";
import {useAdminProducts} from "../../../hooks/admin/useAdminProducts";

export default function ({navigation, route}) {
    const [id] = useState(route.params.id);
    const [isVisible, setIsVisible] = useState(false);
    const [categories, setCategories] = useState([]);

    useCategories(setCategories, navigation.isFocused());
    const {product} = useSelector(state => state.product);

    const [form, setForm] = useState({
        name: product?.name,
        description: product?.description,
        price: String(product?.price),
        stock: String(product?.stock),
        category: product?.category?.category ?? "Please select a category",
        categoryID: product?.category?._id,
        categories: []
    });

    const nav = navigation;
    const bgLoading = false;
    const formLoading = false;


    const dispatch = useDispatch();
    const {isLoading} = useAdminProducts(dispatch, navigation.isFocused());

    const isFormValid = form.name !== "" || form.description !== "" || form.price !== "" || form.stock !== "";
    const submitHandler = () => {
        if (!isFormValid) {
            return Toast.show({
                type: "error",
                text1: "At least one field is required"
            })
        }

        dispatch({
            type: "clearError"
        })

        const data = {
            name: form.name,
            description: form.description,
            price: form.price,
            stock: form.stock,
            category: id
        }
        dispatch(updateProduct(id, data))
        navigation.navigate("adminPanel")
    }

    useEffect(() => {
        if (product) {
            setForm({
                name: product.name,
                description: product.description,
                price: String(product.price),
                stock: String(product.stock),
                category: product.category?.category ?? "Please select a category",
                categoryID: product.category?._id,
                categories: []
            });
        }
    }, [product]);

    useEffect(() => {
        dispatch(getProductById(id))
    }, [dispatch, id, navigation.isFocused()])

    return (
        <>
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
                        Update Product
                    </Text>
                </View>
                {bgLoading ? <Loading/> : (
                    <ScrollView style={{
                        padding: 20,
                        elevation: 10,
                        borderRadius: 10,
                        backgroundColor: colors.gray
                    }}>
                        <View className={"justify-center h-[650px]"}>
                            <Button
                                onPress={() => nav.navigate("updateProductImage", {
                                    id,
                                    images: product.images
                                })}
                                textColor={colors.red1}>
                                Manage Images
                            </Button>
                            <TextInput
                                style={inputStyles}
                                activeOutlineColor={colors.red3}
                                placeholder={"Name"}
                                value={form.name}
                                onChangeText={(val) => setForm(form => ({
                                    ...form,
                                    name: val
                                }))}
                            />
                            <TextInput
                                style={inputStyles}
                                activeOutlineColor={colors.red3}
                                placeholder={"Description"}
                                value={form.description}
                                onChangeText={(val) => setForm(form => ({
                                    ...form,
                                    description: val
                                }))}
                            />
                            <TextInput
                                style={inputStyles}
                                activeOutlineColor={colors.red3}
                                placeholder={"Price"}
                                value={form.price}
                                keyboardType={"number-pad"}
                                onChangeText={(val) => setForm(form => ({
                                    ...form,
                                    price: val
                                }))}
                            />
                            <TextInput
                                style={inputStyles}
                                activeOutlineColor={colors.red3}
                                placeholder={"Stock"}
                                value={form.stock}
                                keyboardType={"number-pad"}
                                onChangeText={(val) => setForm(form => ({
                                    ...form,
                                    stock: val
                                }))}
                            />
                            <Text
                                onPress={() => setIsVisible(true)}
                                style={{
                                    ...inputStyles,
                                    textAlign: "center",
                                    textAlignVertical: "center",
                                    borderRadius: 3
                                }}>{form.category}</Text>
                            <Button
                                textColor={colors.white}
                                className={"bg-color1 m-2 p-2"}
                                onPress={submitHandler}
                                loading={isLoading}
                                disabled={isLoading}
                            >
                                Update Product
                            </Button>
                        </View>
                    </ScrollView>
                )
                }
            </View>
            {/*Selected Modal Popup*/}
            <SelectedComponent
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                form={form}
                setForm={setForm}
                categories={categories}
            />
        </>
    )
}

const SelectedComponent = ({isVisible, setIsVisible, form, setForm, categories}) => {
    // Selecting the current category
    const selectCategoryHandler = (item) => {
        // console.log(item)
        setForm(form => ({
            ...form,
            category: item.category,
            categoryID: item._id
        }))
        setIsVisible(false);
    }
    return isVisible && (
        <View
            style={{elevation: 5}}
            className={"bg-color2 absolute p-8 rounded-xl w-[90%] h-[90%] self-center top-12"}>
            <Pressable
                onPress={() => {
                    setIsVisible(false);
                }}>
                <Avatar.Icon size={30} icon={"close"} className={"self-end bg-color1"}/>
            </Pressable>
            <Headline
                className={"text-2xl text-center font-bold bg-color3 text-color2 p-3 rounded-xl my-2"}
            >
                Select a Category
            </Headline>
            <ScrollView>
                {categories &&
                    categories.map((item, index) => (
                        <Text
                            key={item._id}
                            onPress={() => selectCategoryHandler(item)}
                            className={"text-large font-bold uppercase my-2.5"}
                        >{item.category}
                        </Text>
                    ))
                }
            </ScrollView>
        </View>
    )
}