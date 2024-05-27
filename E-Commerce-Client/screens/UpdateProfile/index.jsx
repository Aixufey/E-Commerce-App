import {Pressable, ScrollView, Text, View} from "react-native";
import {useState} from "react";
import {colors, defaultStyles, inputStyles} from "../../styles";
import {Avatar, Button, TextInput} from "react-native-paper";
import {useDispatch} from "react-redux";
import {updateProfile} from "../../redux/actions/profileActions";
import {useMessageAndErrorOther} from "../../hooks/other/useMessageAndErrorOther";

export default function ({navigation}) {
    const {navigate} = navigation;
    const [form, setForm] = useState({
        name: {
            firstName: "",
            lastName: "",
        },
        address: "",
        city: "",
        country: "",
        postCode: "",
        email: "",
    });

    const dispatch = useDispatch();
    const {isLoadingProfile: isLoading} = useMessageAndErrorOther(dispatch, navigation, "profile");

    const submitHandler = () => {
        const {firstName, lastName} = form.name;
        const fullName = `${firstName} ${lastName}`;
        const formData = {
            ...form,
            name: fullName
        }

        dispatch(updateProfile(formData))
        // dispatch(updateProfileClassic(form));
    }

    const isDisabled = !form.email || !form.name.firstName || !form.name.lastName || !form.address || !form.city || !form.country || !form.postCode;

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
                    Update Profile
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
                    placeholder={"Postal Code"}
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
                    Update
                </Button>
            </ScrollView>
        </View>

    )
}