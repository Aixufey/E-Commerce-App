import {Pressable, Text, View} from "react-native";
import {colors, defaultStyles} from "../../styles";
import {Avatar, Button} from "react-native-paper";
import {useEffect, useState} from "react";
import {Footer, Loading} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {getUser, logout} from "../../redux/actions/userActions";
import {useMessageAndErrorUser} from "../../hooks/user/useMessageAndErrorUser";
import {updatePicture} from "../../redux/actions/profileActions";
import mime from "mime";
import {useMessageAndErrorOther} from "../../hooks/other/useMessageAndErrorOther";

export default function ({navigation, route}) {
    const {user} = useSelector(state => state.user);
    const [avatar, setAvatar] = useState(user?.avatar ? user.avatar.url : "https://cdn-icons-png.flaticon.com/128/2102/2102633.png")

    const dispatch = useDispatch();
    const isLoading = useMessageAndErrorUser(navigation, "login", dispatch);
    const {isLoadingProfile} = useMessageAndErrorOther(dispatch, null, null, getUser);
    const isFocused = navigation.isFocused();
    const logoutHandler = () => {
        console.info("Sign out");
        dispatch(logout())
    }

    const navHandler = (key) => {
        switch (key) {
            case "Admin":
                navigation.navigate('adminPanel');
                break;
            case "Orders":
                navigation.navigate('orders');
                break;
            case "Profile":
                navigation.navigate('updateProfile');
                break;
            case "Password":
                navigation.navigate('updatePassword');
                break;
            case "Sign Out":
                logoutHandler();
                break;
        }
    }

    // Side effect to set the avatar on user change
    useEffect(() => {
        if (user?.avatar) {
            // On login, set the avatar if it exists
            setAvatar(user.avatar.url)
        }

    }, [user])

    // Side effect to trigger when the route params change from the camera screen and when the screen is focused
    useEffect(() => {
        if (route.params?.image) {

            // When a selected image is passed from the camera screen, set the avatar
            setAvatar(route.params.image);

            // Form data to send the image to the server, "file" is the key
            const formData = new FormData();
            formData.append("file", {
                uri: route.params.image,
                type: mime.getType(route.params.image),
                name: route.params.image.split("/").pop()
            })

            // Update the picture on the server
            dispatch(updatePicture(formData))
        }

        // Get the user from the server
        dispatch(getUser())
    }, [route.params, dispatch, isFocused]);

    return (
        <>
            <View style={defaultStyles}>
                {/*Heading*/}
                <View className={"mb-5"}>
                    <Text className={"text-2xl text-center font-bold bg-color3 text-color2 p-2 rounded-xl"}>
                        Profile
                    </Text>
                </View>

                {/*Loading*/}
                {isLoading &&
                isLoading ? <Loading/> :
                    <>
                        <View
                            style={{
                                elevation: 10
                            }}
                            className={"bg-color3 rounded-2xl items-center p-7"}>
                            <Avatar.Image
                                size={100}
                                className={"bg-color1"}
                                source={{uri: avatar}}
                            />

                            <Pressable
                                disabled={isLoadingProfile}
                                onPress={() => navigation.navigate('camera', {updateProfile: true})}
                            >
                                <Button
                                    disabled={isLoadingProfile}
                                    textColor={colors.white}
                                >
                                    Change Image
                                </Button>
                            </Pressable>

                            <Text
                                className={"text-lg font-bold text-color2 mt-5"}
                            >
                                {user?.name}
                            </Text>
                            <Text
                                className={"text-base font-light text-color2"}
                            >
                                {user?.email}
                            </Text>
                        </View>

                        {/*Buttons*/}
                        <View
                            className={"justify-between flex-row m-2"}>
                            <ButtonBox text={"Orders"} icon={"format-list-bulleted-square"} handler={navHandler}/>
                            {
                                user?.role === "admin" &&
                                <ButtonBox text={"Admin"} icon={"view-dashboard"} isReverse={true}
                                           handler={navHandler}/>
                            }
                            <ButtonBox text={"Profile"} icon={"pencil"} handler={navHandler}/>
                        </View>
                        <View
                            className={"justify-evenly flex-row m-2"}>
                            <ButtonBox text={"Password"} icon={"pencil"} handler={navHandler}/>
                            <ButtonBox text={"Sign Out"} icon={"exit-to-app"} handler={navHandler}/>
                        </View>
                    </>

                }
            </View>

            {/*Footer*/}
            <Footer/>
        </>
    )
}

export const ButtonBox = ({icon, text, handler, isReverse = false, isLoading = false}) => (
    <Pressable
        style={({pressed}) => ({opacity: pressed ? 0.7 : 1})}
        className={`${isReverse ? 'bg-color1' : 'bg-color3'} h-[80px] w-[80px] rounded-2xl items-center`}
        onPress={() => handler(text)}
        disabled={isLoading}
    >
        <Avatar.Icon
            size={50}
            icon={icon}
            className={'bg-color4'}
        />
        <Text className={"text-color2 text-center font-bold tracking-widest"}>{text}</Text>
    </Pressable>
)