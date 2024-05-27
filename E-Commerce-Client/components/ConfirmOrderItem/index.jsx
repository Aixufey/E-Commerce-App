import {Image, View, Text} from "react-native";

export default function ({image, name, price, quantity}) {
    return (
        <View
            className={"flex-row justify-between items-center my-5"}
        >
            <Image
                style={{
                    resizeMode: "contain",
                }}
                source={{uri: image}}
                className={"w-[50px] h-[50px] "}
            />
            <Text>{name}</Text>
            <View className={"flex-row"}>
                <Text>{quantity}</Text>
                <Text className={"mx-2"}>x</Text>
                <Text>${price}</Text>
            </View>
        </View>
    )
}