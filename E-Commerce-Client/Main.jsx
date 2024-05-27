import React, {useEffect} from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
    Camera,
    Cart,
    ConfirmOrder,
    Home,
    Login,
    Orders,
    Payment,
    ProductDetail,
    Profile,
    ResetPassword,
    Signup,
    UpdatePassword,
    UpdateProfile,
    Verification
} from "./screens";
import Toast from 'react-native-toast-message';
import {
    AdminCategory,
    AdminOrder,
    AdminPanel,
    AdminProduct,
    UpdateProduct,
    UpdateProductImage
} from "./screens/Administration";
import {useDispatch} from "react-redux";
import {getUser} from "./redux/actions/userActions";


const Stack = createNativeStackNavigator();
export default function Main() {

    // Get the user from the server
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser())
    }, [dispatch]);

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={'home'}
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Group>
                    <Stack.Screen name={'home'} component={Home}/>
                    <Stack.Screen name={'cart'} component={Cart}/>
                    <Stack.Screen name={'productDetails'} component={ProductDetail}/>
                    <Stack.Screen name={'confirmOrder'} component={ConfirmOrder}/>
                    <Stack.Screen name={'payment'} component={Payment}/>
                    <Stack.Screen name={'login'} component={Login}/>
                    <Stack.Screen name={'signup'} component={Signup}/>
                    <Stack.Screen name={'profile'} component={Profile}/>
                    <Stack.Screen name={'orders'} component={Orders}/>
                    <Stack.Screen name={'camera'} component={Camera}/>

                    {/*Reset Password*/}
                    <Stack.Screen name={'resetPassword'} component={ResetPassword}/>
                    <Stack.Screen name={'verification'} component={Verification}/>

                    {/*Profile*/}
                    <Stack.Screen name={'updateProfile'} component={UpdateProfile}/>
                    <Stack.Screen name={'updatePassword'} component={UpdatePassword}/>

                    {/*Administration Panel*/}
                    <Stack.Screen name={'adminPanel'} component={AdminPanel}/>
                    <Stack.Screen name={'adminCategory'} component={AdminCategory}/>
                    <Stack.Screen name={'adminOrder'} component={AdminOrder}/>
                    <Stack.Screen name={'adminProduct'} component={AdminProduct}/>
                    <Stack.Screen name={'updateProduct'} component={UpdateProduct}/>
                    <Stack.Screen name={'updateProductImage'} component={UpdateProductImage}/>
                </Stack.Group>
            </Stack.Navigator>

            {/*Toast*/}
            <Toast position={"top"} bottomOffset={40}/>
        </NavigationContainer>
    )
}