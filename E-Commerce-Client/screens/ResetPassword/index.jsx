import {Pressable, Text, View} from "react-native";
import {colors, defaultStyles, inputStyles} from "../../styles";
import {Avatar, Button, TextInput} from "react-native-paper";
import {Footer} from "../../components";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {forgotPassword} from "../../redux/actions/passwordActions";
import {useMessageAndErrorUser} from "../../hooks/user/useMessageAndErrorUser";

export default function ({navigation}) {
    const {navigate} = navigation;
    // const isLoading = false;

    const [email, setEmail] = useState("");

    const dispatch = useDispatch();

    const isLoading = useMessageAndErrorUser(navigation, "verification", dispatch);

    const submitHandler = () => {
        // console.info("Send OTP");
        dispatch(forgotPassword(email))
        navigate("verification");
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
                        Reset Password
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
                        value={email}
                        onChangeText={(val) => setEmail(val)}
                    />

                    <Button
                        loading={isLoading}
                        className={"bg-color1 m-5"}
                        textColor={colors.white}
                        disabled={email === ""}
                        mode={"outlined"}
                        onPress={submitHandler}
                    >
                        Reset Password
                    </Button>
                    <Text className={"self-center text-l text-color2 font-light"}>OR</Text>
                    <Pressable
                        style={({pressed}) => ({opacity: pressed ? 0.7 : 1})}
                        onPress={() => navigate("login")}
                    >
                        <Text className={"self-center text-xl uppercase text-color2 font-bold mt-2"}>
                            Log in
                        </Text>
                    </Pressable>
                </View>
            </View>

            {/*Tab*/}
            <Footer activeRoute={"profile"}/>
        </>
    )
}