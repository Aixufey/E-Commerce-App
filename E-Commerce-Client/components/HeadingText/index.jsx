import {Text, View} from "react-native";

export default function ({title, subTitle, styles}) {
    return (
        <View className={styles}>
            <Text style={{fontSize: 25}}>{title}</Text>
            <Text style={{fontSize: 25, fontWeight: '900'}}>{subTitle}</Text>
        </View>
    )
}