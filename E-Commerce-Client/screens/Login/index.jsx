import {Pressable, Text, View} from "react-native";
import {useState} from "react";
import {colors, defaultStyles, inputStyles} from "../../styles";
import {Avatar, Button, TextInput} from "react-native-paper";
import {Footer} from "../../components";
import {useDispatch} from "react-redux"
import {login} from "../../redux/actions/userActions";
import {useMessageAndErrorUser} from "../../hooks/user/useMessageAndErrorUser";

export default function ({navigation}) {
    const {navigate} = navigation;
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    // Redux to dispatch user login
    const dispatch = useDispatch();
    // Custom hook to display error and message from the user reducer.
    // Returns isLoading state and navigates to profile after successful login.
    // Dispatches clearError and clearMessage actions to clear the error and message state.
    const isLoading = useMessageAndErrorUser(navigation, "profile", dispatch);

    const submitHandler = () => {
        // 1. Dispatch a login action with email and other
        // 2. userReducer will handle the state change
        // 3. Access the state using useSelector
        dispatch(login(form.email, form.password))
    }

    return (
        <>
            <View style={{
                ...defaultStyles,
                backgroundColor: colors.white
            }}>

                {/*Heading*/}
                <View className={"mb-5"}>
                    <Text className={"text-2xl text-center font-bold bg-color3 text-color2 p-2 rounded-xl"}>
                        Login
                    </Text>
                </View>

                {/*Inputs*/}
                <View
                    style={{
                        elevation: 10
                    }}
                    className={"flex-1 p-5 bg-color3 rounded-xl justify-center"}>
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

                    {/*Reset other*/}
                    <Pressable
                        style={({pressed}) => ({opacity: pressed ? 0.7 : 1})}
                        onPress={() => navigate("resetPassword")}>
                        <Text className={" self-end text-color2 my-2.5 mx-5 font-bold"}>Forgot Password?</Text>
                    </Pressable>

                    <Button
                        loading={isLoading}
                        className={"bg-color1 m-5"}
                        textColor={colors.white}
                        disabled={form.email === "" || form.password === ""}
                        mode={"outlined"}
                        onPress={submitHandler}
                    >
                        Log in
                    </Button>
                    <Text className={"self-center text-l text-color2 font-light"}>OR</Text>
                    <Pressable
                        style={({pressed}) => ({opacity: pressed ? 0.7 : 1})}
                        onPress={() => navigate("signup")}
                    >
                        <Text className={"self-center text-xl uppercase text-color2 font-bold mt-2"}>
                            Sign Up
                        </Text>
                    </Pressable>
                </View>
            </View>

            {/*Tab*/}
            <Footer activeRoute={"profile"}/>
        </>
    )
}

