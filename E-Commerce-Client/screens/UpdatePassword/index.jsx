import {Pressable, Text, View} from "react-native";
import {Avatar, Button, TextInput} from "react-native-paper";
import {colors, defaultStyles, inputStyles} from "../../styles";
import {useState} from "react";
import {useMessageAndErrorOther} from "../../hooks/other/useMessageAndErrorOther";
import {useDispatch} from "react-redux";
import {changePassword} from "../../redux/actions/passwordActions";

export default function ({navigation}) {
    const {navigate} = navigation;
    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false

    });
    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: ""
    });

    const dispatch = useDispatch();
    const {isLoading} = useMessageAndErrorOther(dispatch);

    const submitHandler = () => {
        console.info("Update other");
        // navigate("profile");

        dispatch(changePassword(
            form.oldPassword,
            form.newPassword
        ))

        // It is recommended to use the previous state rather than the current state
        // setForm(form => ({
        //     ...form,
        //     oldPassword: "",
        //     newPassword: ""
        // }))
        setForm(prev => ({
            ...prev,
            oldPassword: "",
            newPassword: ""
        }))

    }

    return (
        <View style={{
            ...defaultStyles,
            backgroundColor: colors.white
        }}>
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
                    Update Password
                </Text>
            </View>

            {/*Inputs*/}
            <View
                style={{
                    elevation: 10
                }}
                className={"flex-1 p-5 bg-color3 rounded-xl justify-center"}>
                <View className={"flex-row"}>
                    <TextInput
                        className={"flex-1"}
                        style={inputStyles}
                        mode={"outlined"}
                        activeOutlineColor={colors.red3}
                        placeholder={"Old Password"}
                        value={form.oldPassword}
                        secureTextEntry={!showPassword.oldPassword}
                        onChangeText={(val) => setForm(prev => ({
                            ...prev,
                            oldPassword: val
                        }))}
                    />
                    <View className={"absolute self-center right-6"}>
                        <Pressable onPress={() => setShowPassword(prev => {
                            return {
                                ...prev,
                                oldPassword: !prev.oldPassword
                            }
                        })}>
                            <Avatar.Icon
                                size={25}
                                className={"bg-gray-300"}
                                icon={!showPassword.oldPassword ? "eye" : "eye-off"}
                            />
                        </Pressable>
                    </View>
                </View>
                <View className={"flex-row"}>
                    <TextInput
                        className={"flex-1"}
                        style={inputStyles}
                        mode={"outlined"}
                        activeOutlineColor={colors.red3}
                        placeholder={"New Password"}
                        value={form.newPassword}
                        secureTextEntry={!showPassword.newPassword}
                        onChangeText={(val) => setForm(prev => ({
                            ...prev,
                            newPassword: val
                        }))}
                    />
                    <View className={"absolute self-center right-6"}>
                        <Pressable onPress={() => setShowPassword(prev => {
                            return {
                                ...prev,
                                newPassword: !prev.newPassword
                            }
                        })}>
                            <Avatar.Icon
                                size={25}
                                className={"bg-gray-300"}
                                icon={!showPassword.newPassword ? "eye" : "eye-off"}
                            />
                        </Pressable>
                    </View>
                </View>

                <Button
                    loading={isLoading}
                    className={"bg-color1 m-5"}
                    textColor={colors.white}
                    disabled={form.oldPassword === "" || form.newPassword === ""}
                    mode={"outlined"}
                    onPress={submitHandler}
                >
                    Update Password
                </Button>
            </View>

        </View>
    )
}