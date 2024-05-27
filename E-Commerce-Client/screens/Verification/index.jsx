import {Pressable, Text, View} from "react-native";
import {colors, defaultStyles, inputStyles} from "../../styles";
import {useState} from "react";
import {Avatar, Button, TextInput} from "react-native-paper";
import {Footer} from "../../components";
import {useDispatch} from "react-redux";
import {resetPassword} from "../../redux/actions/passwordActions";

export default function ({navigation}) {
    const {navigate} = navigation;
    const isLoading = false;
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        otp: "",
        password: ""
    });

    const dispatch = useDispatch();

    const submitHandler = () => {
        // console.info("Login");
        // navigate("verification");
        dispatch(resetPassword(form.otp, form.password));
        navigation.navigate("login")
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
                        Verification
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
                        placeholder={"OTP"}
                        keyboardType={"number-pad"}
                        value={form.otp}
                        onChangeText={(val) => setForm(prev => ({
                            ...prev,
                            otp: val
                        }))}
                    />
                    <View className={"flex-row"}>
                        <TextInput
                            className={"flex-1"}
                            style={inputStyles}
                            mode={"outlined"}
                            activeOutlineColor={colors.red3}
                            placeholder={"New Password"}
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


                    <Button
                        loading={isLoading}
                        className={"bg-color1 m-5"}
                        textColor={colors.white}
                        disabled={form.otp === "" || form.password === ""}
                        mode={"outlined"}
                        onPress={submitHandler}
                    >
                        Reset
                    </Button>
                    <Text className={"self-center text-md text-color2 font-light"}>
                        Didn't receive the code?
                    </Text>
                    <Pressable
                        style={({pressed}) => ({opacity: pressed ? 0.7 : 1})}
                        onPress={() => navigate("resetPassword")}
                    >
                        <Text className={"self-center text-xl uppercase text-color2 font-bold mt-2"}>
                            Resend Code
                        </Text>
                    </Pressable>
                </View>
            </View>

            {/*Tab*/}
            <Footer activeRoute={"profile"}/>
        </>
    )
}