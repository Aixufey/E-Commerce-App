import {View, Text, Image, Pressable, StyleSheet} from "react-native";
import {Avatar} from "react-native-paper";
import {colors} from "../../styles";

export default function ({id, index, name, stock, price, imageSrc, quantity, incrementHandler, decrementHandler, navigate}) {


    return (
        <View className={"flex-row h-[100px] my-3"}>
            <View
                className={`w-[40%] ${index % 2 === 0 ? 'bg-color1' : 'bg-color3'} rounded-tr-[100px] rounded-br-[100px]`}>
                <Image
                    style={{
                        resizeMode: 'contain'
                    }}
                    className={"w-[90px] h-[100%] top-[-15%] left-[50%]"}
                    source={{uri: imageSrc}}/>
            </View>
            <View className={"w-[40%] px-[25px]"}>
                <Pressable
                    onPress={() => navigate('productDetails', {id: id})}
                >
                    <Text numberOfLines={1} className={"text-[17px]"}>{name}</Text>
                    <Text numberOfLines={1} className={"text-[17px] font-black"}>${price}</Text>
                </Pressable>
            </View>

            <View className={"justify-between items-center self-center w-[20%] h-[80px]"}>
                <Pressable onPress={() => decrementHandler(id, name, price, imageSrc, stock, quantity)}>
                    <Avatar.Icon
                        size={20}
                        icon={"minus"}
                        style={styles.icon}/>
                </Pressable>
                <Text style={styles.quantityText}>{quantity}</Text>
                <Pressable onPress={() => incrementHandler(id, name, price, imageSrc, stock, quantity)}>
                    <Avatar.Icon
                        size={20}
                        icon={"plus"}
                        style={styles.icon}/>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        borderRadius: 5,
        backgroundColor: colors.light1,
        width: 25,
        height: 25
    },
    quantityText: {
        backgroundColor: colors.white,
        height: 25,
        width: 25,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: colors.light1,
        borderRadius: 5
    }
})