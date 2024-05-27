import {Pressable, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {colors} from "../../styles";
import {Avatar} from "react-native-paper";
import {useSelector} from "react-redux";

export default function ({activeRoute = 'home'}) {

    const nav = useNavigation();

    // const isLoading = false;
    // const isAuthenticated = false;
    const {isLoading, isAuthenticated} = useSelector(state => state.user);

    const navHandler = (key) => {
        switch (key) {
            case 0:
                nav.navigate('home');
                break;
            case 1:
                nav.navigate('cart');
                break;
            case 2:
                if (isAuthenticated) {
                    nav.navigate('profile');
                } else {
                    nav.navigate('login');
                }
                break;
            default:
                nav.navigate('home');
                break;
        }
    }

    return (!isLoading && (
            <View style={{
                backgroundColor: colors.red1,
                borderTopRightRadius: 120,
                borderTopLeftRadius: 120,
                position: 'absolute',
                width: '100%',
                bottom: 0,
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                }}>
                    {/*Shopping Tab*/}
                    <Pressable onPress={() => navHandler(1)}>
                        <Avatar.Icon
                            color={colors.white}
                            size={50}
                            style={{backgroundColor: colors.red1}}
                            icon={activeRoute === 'cart' ? 'shopping' : 'shopping-outline'}/>
                    </Pressable>
                    {/*Profile Tab*/}
                    <Pressable onPress={() => navHandler(2)}>
                        <Avatar.Icon
                            color={colors.white}
                            size={50}
                            style={{backgroundColor: colors.red1}}
                            icon={!isAuthenticated ? 'login' : (activeRoute === 'profile' ? 'account' : 'account-outline')}/>
                    </Pressable>
                </View>
                {/*Home Tab*/}
                <View style={{
                    position: 'absolute',
                    width: 80,
                    height: 80,
                    backgroundColor: colors.white,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: -50,
                    alignSelf: 'center'
                }}>
                    <Pressable onPress={() => navHandler(0)}>
                        <Avatar.Icon
                            color={colors.white}
                            size={50}
                            style={{backgroundColor: colors.red1}}
                            icon={activeRoute === 'home' ? 'home' : 'home-outline'}/>
                    </Pressable>
                </View>
            </View>
        )
    )
}