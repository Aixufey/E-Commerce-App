import {colors, defaultStyles, inputStyles} from "../../styles";
import {Dimensions, Pressable, ScrollView, Text, View} from "react-native";
import {Avatar, Button, TextInput} from "react-native-paper";
import {useEffect, useState} from "react";
import {Footer} from "../../components";
import mime from "mime";
import {useDispatch} from "react-redux";
import {signup} from "../../redux/actions/userActions";
import {useMessageAndErrorUser} from "../../hooks/user/useMessageAndErrorUser";

export default function ({navigation, route}) {
    const {navigate} = navigation;
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        avatar: "",
        name: {
            firstName: "",
            lastName: ""
        },
        address: "",
        city: "",
        country: "",
        postCode: "",
        email: "",
        password: ""
    });

    const dispatch = useDispatch();

    const submitHandler = () => {
        console.info("Login");
        const formData = new FormData();

        // If the user has selected an image
        if (form.avatar !== "") {
            const newFile = {
                //  "file:///data/user/0/host.exp.exponent/cache..."
                uri: form.avatar,
                type: mime.getType(form.avatar),
                // Split the file path and get the name of the file
                // "name": "4567b73b-0534-4392-bf00-a788de66b88c.jpeg",
                name: form.avatar.split("/").pop()
            }
            // The image must be appended as a file
            formData.append("file", newFile)
        }
        // Combine the first and last name
        const fullName = `${form.name.firstName} ${form.name.lastName}`;
        formData.append("name", fullName);

        // Add the rest of the form data
        for (let key in form) {
            if (key !== "avatar" && key !== "name") {
                formData.append(key, form[key]);
            }
        }

        dispatch(signup(formData))
    }

    const isLoading = useMessageAndErrorUser(navigation, "profile", dispatch);

    const isDisabled = !form.email || !form.password || !form.name.firstName || !form.name.lastName || !form.address || !form.city || !form.country || !form.postCode;

    useEffect(() => {
        if (route.params?.image) {
            setForm(form => ({
                ...form,
                avatar: route.params.image
            }))
        }
    }, [route.params]);

    return (
        <>
            <View style={{
                ...defaultStyles,
                backgroundColor: colors.white
            }}>

                {/*Heading*/}
                <View className={"mb-5"}>
                    <Text className={"text-2xl text-center font-bold bg-color3 text-color2 p-2 rounded-xl"}>
                        Sign Up
                    </Text>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    className={"p-4 rounded-xl bg-color3"}
                    style={{
                        elevation: 10,
                    }}
                >
                    {/*Inputs*/}
                    <View
                        style={{
                            minHeight: Dimensions.get('window').height + 100
                        }}
                    >
                        {/*Image*/}
                        <Avatar.Image
                            className={"self-center bg-color2"}
                            size={80}
                            source={{
                                uri: form.avatar ? form.avatar : 'https://cdn-icons-png.flaticon.com/128/848/848043.png'
                            }}
                        />
                        <Pressable onPress={() => navigate("camera", {signup: true})}>
                            <Button textColor={colors.white}>Change Image</Button>
                        </Pressable>

                        {/*FName*/}
                        <TextInput
                            style={inputStyles}
                            mode={"outlined"}
                            activeOutlineColor={colors.red3}
                            placeholder={"First Name"}
                            value={form.name.firstName}
                            onChangeText={(val) => setForm(prev => ({
                                ...prev,
                                name: {
                                    ...prev.name,
                                    firstName: val
                                }
                            }))}
                        />
                        {/*LName*/}
                        <TextInput
                            style={inputStyles}
                            mode={"outlined"}
                            activeOutlineColor={colors.red3}
                            placeholder={"Last Name"}
                            value={form.name.lastName}
                            onChangeText={(val) => setForm(prev => ({
                                ...prev,
                                name: {
                                    ...prev.name,
                                    lastName: val
                                }
                            }))}
                        />
                        {/*Email*/}
                        <TextInput
                            style={inputStyles}
                            mode={"outlined"}
                            activeOutlineColor={colors.red3}
                            placeholder={"Email"}
                            keyboardType={"email-address"}
                            value={form.email}
                            onChangeText={(val) => setForm(prev => ({
                                ...prev,
                                email: val
                            }))}
                        />
                        {/*Password*/}
                        <View className={"flex-row"}>
                            <TextInput
                                className={"flex-1"}
                                style={inputStyles}
                                mode={"outlined"}
                                activeOutlineColor={colors.red3}
                                placeholder={"Password"}
                                value={form.password}
                                secureTextEntry={!showPassword}
                                onChangeText={(val) => setForm(prev => ({
                                    ...prev,
                                    password: val
                                }))}
                            />
                            <View className={"absolute self-center right-6"}>
                                <Pressable onPress={() => setShowPassword(prev => !prev)}>
                                    <Avatar.Icon
                                        size={25}
                                        className={"bg-gray-300"}
                                        icon={!showPassword ? "eye" : "eye-off"}
                                    />
                                </Pressable>
                            </View>
                        </View>
                        {/*Address*/}
                        <TextInput
                            style={inputStyles}
                            mode={"outlined"}
                            activeOutlineColor={colors.red3}
                            placeholder={"Address"}
                            value={form.address}
                            onChangeText={(val) => setForm(prev => ({
                                ...prev,
                                address: val
                            }))}
                        />
                        {/*Country*/}
                        <TextInput
                            style={inputStyles}
                            mode={"outlined"}
                            activeOutlineColor={colors.red3}
                            placeholder={"Country"}
                            value={form.country}
                            onChangeText={(val) => setForm(prev => ({
                                ...prev,
                                country: val
                            }))}
                        />
                        {/*City*/}
                        <TextInput
                            style={inputStyles}
                            mode={"outlined"}
                            activeOutlineColor={colors.red3}
                            placeholder={"City"}
                            value={form.city}
                            onChangeText={(val) => setForm(prev => ({
                                ...prev,
                                city: val
                            }))}
                        />
                        {/*Postal Code*/}
                        <TextInput
                            style={inputStyles}
                            mode={"outlined"}
                            activeOutlineColor={colors.red3}
                            placeholder={"Post Code"}
                            value={form.postCode}
                            onChangeText={(val) => setForm(prev => ({
                                ...prev,
                                postCode: val
                            }))}
                        />

                        <Button
                            loading={isLoading}
                            className={"bg-color1 m-5"}
                            textColor={colors.white}
                            disabled={isDisabled}
                            mode={"outlined"}
                            onPress={submitHandler}
                        >
                            Sign Up
                        </Button>
                        <Text className={"self-center text-l text-color2 font-light"}>OR</Text>
                        <Pressable
                            style={({pressed}) => ({opacity: pressed ? 0.7 : 1})}
                            onPress={() => navigate("login")}
                        >
                            <Text className={"self-center text-xl uppercase text-color2 font-bold mt-2"}>
                                Log In
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>

            {/*Tab*/}
            <Footer activeRoute={"profile"}/>
        </>
    )
}