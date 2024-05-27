import {View, Text} from "react-native";

export default function () {
    return (
        <View className={"bg-color3 flex-row justify-between h-[40px] items-center rounded-xl p-2"}>
            <Text className={styles.text}>Images</Text>
            <Text className={styles.text}>Price</Text>
            <Text className={`${styles.text} max-w-[120px]`}>Name</Text>
            <Text className={`${styles.text} w-[60px]`}>Category</Text>
            <Text className={styles.text}>Stock</Text>
        </View>
    )
}

const styles = {
    text: 'text-color2 font-bold'
}