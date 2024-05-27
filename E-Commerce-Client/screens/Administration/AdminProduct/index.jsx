import {Pressable, ScrollView, Text, View} from "react-native";
import {colors, defaultStyles, inputStyles} from "../../../styles";
import {Loading} from "../../../components";
import {Avatar, Button, Headline, TextInput} from "react-native-paper";
import {useEffect, useState} from "react";
import {useCategories} from "../../../hooks/categories/useCategories";
import {useIsFocused} from "@react-navigation/native";
import mime from "mime";
import Toast from "react-native-toast-message";
import {useDispatch} from "react-redux";
import {useAdminProducts} from "../../../hooks/admin/useAdminProducts";
import {addProduct} from "../../../redux/actions/productActions";

export default function ({navigation, route}) {

    const [categories, setCategories] = useState([]);
    const isFocused = useIsFocused();
    useCategories(setCategories, isFocused);

    const [isVisible, setIsVisible] = useState(false);
    const [form, setForm] = useState({
        image: "https://cdn-icons-png.flaticon.com/512/15374/15374850.png",
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "Select Category",
        categoryID: "",
        categories: []
    });

    const nav = navigation;
    const bgLoading = false;

    const isFormValid = form.name !== "" && form.description !== "" && form.price !== "" && form.stock !== "" && form.categoryID !== "";

    const dispatch = useDispatch();
    const {isLoading} = useAdminProducts(dispatch, isFocused);

    const submitHandler = () => {
        // console.info(form)
        if (!isFormValid) {
            return Toast.show({
                type: "error",
                text1: "All fields are required"
            })
        }

        dispatch({
            type: "clearError"
        })

        const formData = new FormData();
        for (let key in form) {
            if (key !== "image" && key !== "categories" && key !== "categoryID" && key !== "category") {
                formData.append(key, form[key])
            }
        }
        formData.append("category", form.categoryID)

        formData.append("file", {
            uri: form.image,
            type: mime.getType(form.image),
            name: form.image.split("/").pop()
        })
        // console.log(formData)
        dispatch(addProduct(formData))
        navigation.navigate("adminPanel")
    }

    useEffect(() => {
        if (route.params?.image) {
            setForm(form => ({
                ...form,
                image: route.params.image
            }))
        }
    }, [route.params]);

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
                        New Product
                    </Text>
                </View>
                {isLoading ? <Loading/> : (
                    <ScrollView style={{
                        padding: 20,
                        elevation: 10,
                        borderRadius: 10,
                        backgroundColor: colors.gray
                    }}>
                        <View className={"justify-center h-[650px]"}>
                            {/*New Avatar*/}
                            <View
                                className={"w-[80px] h-[80px] self-center mb-5"}
                            >
                                <Avatar.Image
                                    size={80}
                                    className={"bg-color1"}
                                    source={{
                                        uri: form ? form.image : 'https://cdn-icons-png.flaticon.com/512/15374/15374850.png'
                                    }}
                                />
                                <Pressable
                                    onPress={() => nav.navigate("camera", {newProduct: true})}
                                >
                                    <Avatar.Icon size={30} icon={"camera"} color={colors.gray}
                                                 className={"bg-color2 absolute bottom-0 right-0"}/>
                                </Pressable>
                            </View>

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
                                Create Product
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