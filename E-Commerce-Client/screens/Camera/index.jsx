import {Pressable, View, Text} from "react-native";
import {Camera, CameraView, useCameraPermissions} from "expo-camera";
import React, {useEffect, useState} from "react";
import {Avatar, Button} from "react-native-paper";
import {colors, defaultStyles} from "../../styles/index";
import * as ImagePicker from 'expo-image-picker';

export default function ({navigation, route}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState('back');
    const [camera, setCamera] = useState(null);
    const [permission, requestPermission] = useCameraPermissions();

    useEffect(() => {
        // (async () => {
        //         const {status} = await Camera.requestCameraPermissionsAsync();
        //         setHasPermission(status === 'granted');
        //     }
        // )();

        // SDK 51 way of requesting camera permissions
        (async () => {
            const {status} = await requestPermission();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const openImagePickerHandler = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permission.granted === false) {
            return alert("Permission to access camera roll is required!");
        }

        const data = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        })

        // Other screens is utilizing this camera screen, and we pass the image data back to the respective screen.
        routeParamHandler(route.params, data);
    }

    /**
     * A handler function that will navigate to the respective screen based on the route param and type of source.
     * If data is canceled, it will return to the previous screen.
     * Data is either from the library or taken from the camera.
     * @param routeParam Accepting the route params from the navigation.
     * @param data The data from the camera or image picker.
     * @param source The source of the data, either from the camera or image picker.
     * @returns {*} Navigates to the respective screen based on the route params.
     */
    const routeParamHandler = (routeParam, data, source = "media") => {
        if (routeParam) {
            const [key] = Object.keys(routeParam);

            if (data.canceled) { return navigation.goBack() }

            let uri;
            if (source === "media" && data !== "canceled") {
                uri = data?.assets.at(0).uri;
            } else {
                uri = data?.uri;
            }
            switch (key) {
                case "newProduct":
                    return navigation.navigate("adminProduct", {
                        image: uri
                    });
                case "updateProduct":
                    return navigation.navigate("updateProductImage", {
                        image: uri
                    });
                case "updateProfile": {
                    return navigation.navigate("profile", {
                        image: uri
                    });
                }
                case "signup": {
                    return navigation.navigate("signup", {
                        image: data && data?.assets.at(0).uri
                    });
                }
            }
        }
    }
    const clickPictureHandler = async () => {
        const data = await camera.takePictureAsync({
            isImageMirror: type === 'front'
        });
        // console.log(data)
        routeParamHandler(route.params, data, "camera");
    }
    const cameraTypeHandler = () => {
        setType(
            type === 'back'
                ? 'front'
                : 'back'
        );
        // console.log(type)
    }

    // If no permission or denied return useful content.
    // if (hasPermission === null) return <View/>
    //
    // if (hasPermission === false) return (
    //     <View style={defaultStyles}>
    //         <Text>No access to camera</Text>
    //     </View>
    // )
    if (!permission) return <View />

    if (!permission.granted) {
        return (
            <View>
                <Text style={{textAlign: 'center'}}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission"/>
            </View>
        )
    }

    return (
        <View className={"flex-1 justify-center items-center"}>
            <CameraView
                ratio={"1:1"}
                facing={type}
                className={"flex-1 aspect-square"}
                style={{flex: 1}}
                ref={(e) => setCamera(e)}
            />
            {/*<Camera*/}
            {/*    type={type}*/}
            {/*    className={"flex-1 aspect-square"}*/}
            {/*    ratio={'1:1'}*/}
            {/*    ref={(e) => setCamera(e)}*/}
            {/*/>*/}
            <View className={"flex-row justify-evenly bottom-2.5 w-full absolute"}
            >
                <CameraIcon icon={"image"} onPress={openImagePickerHandler}/>
                <CameraIcon icon={"camera"} onPress={clickPictureHandler}/>
                <CameraIcon icon={"camera-flip"} onPress={cameraTypeHandler}/>
            </View>
        </View>
    )
}

const CameraIcon = ({icon, onPress}) => {
    return (
        <Pressable onPress={onPress}>
            <Avatar.Icon
                icon={icon}
                size={40}
                color={colors.white}
                className={"bg-color1"}
            />
        </Pressable>
    )
}