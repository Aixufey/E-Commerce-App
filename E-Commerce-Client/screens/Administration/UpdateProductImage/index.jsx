import {Pressable, ScrollView, Text, View, Image} from "react-native";
import {colors} from "../../../styles";
import {defaultStyles} from "../../../styles";
import {Avatar, Button} from "react-native-paper";
import {useEffect, useState} from "react";
import {useAdminProducts} from "../../../hooks/admin/useAdminProducts";
import {useDispatch} from "react-redux";
import mime from "mime";
import {deleteProductImage, updateProductImage} from "../../../redux/actions/productActions";

export default function ({navigation, route}) {
    // Getting images from route params that are passed from UpdateProduct
    const [imageObject] = useState({
        productID: route.params && route.params.id,
        images: route.params && route.params.images
    })

    const [newImage, setNewImage] = useState({
        isChanged: false,
        image: ""
    })

    const imageURL = null;
    // const isLoading = false;

    const {isLoading} = useAdminProducts();
    const dispatch = useDispatch();

    const deleteHandler = (id) => {
        // console.log("Delete Image: ", id, imageObject.productID)
        dispatch(deleteProductImage(imageObject.productID, id))
        navigation.navigate("adminPanel")
    }
    const submitHandler = () => {
        const formData = new FormData();
        formData.append("file", {
            uri: newImage.image,
            type: mime.getType(newImage.image),
            name: newImage.image.split("/").pop()
        })

        dispatch(updateProductImage(imageObject.productID, formData))
        navigation.navigate("adminPanel")
    }

    useEffect(() => {
        if (route.params?.image) {
            setNewImage(newImage => ({
                isChanged: true,
                image: route.params.image
            }))
        }
    }, [route.params]);

    return (
        <View style={{...defaultStyles, backgroundColor: colors.light1}}>
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
                    Product Images
                </Text>
            </View>

            <ScrollView
                className={"mb-5"}
            >
                <View className={"bg-color2 p-10 min-h-[400px]"}>
                    {imageObject &&
                        imageObject.images.map(item => (
                            <ImageCard
                                key={item._id}
                                id={item._id}
                                src={item.url}
                                deleteHandler={deleteHandler}
                            />
                        ))
                    }
                </View>
            </ScrollView>

            {/*Selected Preview*/}
            <View
                className={"p-10 rounded-2xl bg-color3"}
            >
                <Image
                    style={{resizeMode: 'contain'}}
                    className={"bg-color2 w-[100px] h-[100px] self-center object-contain"}
                    source={{uri: !newImage.isChanged ? imageURL : newImage.image}}
                />
                <View
                    className={"flex-row justify-center"}
                >
                    <Pressable onPress={() => navigation.navigate("camera", {updateProduct: true})}>
                        <Avatar.Icon icon={"camera"} size={30} color={colors.gray} className={"bg-color2 m-2"}/>
                    </Pressable>
                </View>

                <Button
                    className={"bg-color1 p-1.5"}
                    textColor={colors.white}
                    loading={isLoading}
                    onPress={submitHandler}
                    disabled={!newImage.isChanged}
                >
                    Add
                </Button>
            </View>
        </View>
    )
}

const ImageCard = ({id, src, deleteHandler}) => {
    return (
        <View
            style={{elevation: 5}}
            className={"bg-color2 p-6 m-2.5 items-center rounded-xl h-[300px]"}
        >
            <Image
                source={{uri: src}}
                style={{
                    width: "100%",
                    height: "80%",
                    resizeMode: "contain",
                }}
            />
            <Pressable onPress={() => deleteHandler(id)}>
                <Avatar.Icon
                    size={30}
                    icon={"delete"}
                    className={"bg-color1"}
                />
            </Pressable>
        </View>
    )
}