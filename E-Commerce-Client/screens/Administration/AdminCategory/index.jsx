import {Pressable, ScrollView, Text, View} from "react-native";
import {colors, defaultStyles, inputStyles} from "../../../styles";
import {Avatar, Button, TextInput} from "react-native-paper";
import {useEffect, useState} from "react";
import {useCategories} from "../../../hooks/categories/useCategories";
import {useIsFocused} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {createCategory, deleteCategory} from "../../../redux/actions/categoryActions";
import {useMessageAndErrorOther} from "../../../hooks/other/useMessageAndErrorOther";
import Toast from "react-native-toast-message";

export default function ({navigation}) {
    const [query, setQuery] = useState("");
    const [categories, setCategories] = useState([]);

    // Retrieve Categories
    const isFocused = useIsFocused();
    useCategories(setCategories, isFocused);

    const dispatch = useDispatch();
    // For some reason, the hook's state is stuck at profile Screen.
    // Temporarily manual navigate after dispatching the action
    const {isLoadingCategory} = useMessageAndErrorOther(dispatch, navigation, "adminPanel");
    const addCategoryHandler = () => {
        if (query.trim() === "") {
            Toast.show({
                type: "error",
                text1: "Category name cannot be empty"
            })
            return dispatch({
                type: "clearError"
            })
        }
        dispatch(createCategory(query.trim()))
        navigation.navigate("adminPanel")
    }

    const deleteCategoryHandler = (id) => {
        //console.info("Delete Category: ", id)
        dispatch(deleteCategory(id))
        navigation.navigate("adminPanel")
    }

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
                    Categories
                </Text>
            </View>
            <ScrollView className={"mb-5"}>
                <View className={"bg-color2 p-5 min-h-[400px]"}>
                    {categories &&
                        categories.map((item, index) => (
                            <CategoryCard
                                key={item._id}
                                id={item._id}
                                index={index}
                                category={item.category}
                                deleteHandler={deleteCategoryHandler}
                            />
                        ))

                    }
                </View>
            </ScrollView>

            <View className={"p-5 bg-color3 rounded-xl"} style={{elevation: 10}}>
                <TextInput
                    style={inputStyles}
                    placeholder={"Category"}
                    value={query}
                    mode={"outlined"}
                    onChangeText={(text) => setQuery(text)}
                />

                <Pressable
                    style={({pressed}) => ({opacity: pressed ? 0.9 : 1})}
                    onPress={addCategoryHandler}
                >
                    <Button
                        textColor={colors.white}
                        rippleColor={colors.transparent}
                        className={"bg-color1 m-3 w-[150px] self-center"}
                        disabled={!query}
                        loading={isLoadingCategory}
                    >
                        Add
                    </Button>
                </Pressable>
            </View>
        </View>
    )
}

const CategoryCard = ({id, index, category, deleteHandler}) => (
    <View
        style={{
            elevation: 5
        }}
        className={"flex-row justify-between items-center rounded-xl bg-color2 m-3 p-3 "}
    >
        <Text>{category}</Text>
        <Pressable onPress={() => deleteHandler(id)}>
            <Avatar.Icon
                size={30}
                className={"bg-color6"}
                icon={"delete"}
            />
        </Pressable>
    </View>
)