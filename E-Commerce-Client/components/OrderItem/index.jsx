import {Pressable, Text, View} from "react-native";
import {Button} from "react-native-paper";
import {colors} from "../../styles"

export default function (
    {
        index = 0,
        id,
        price,
        address,
        createdAt,
        orderStatus,
        paymentMethod,
        updateHandler,
        isLoading,
        isAdmin = false
    }) {

    return (
        <View
            style={{elevation: 5}}
            className={`p-5 m-2 rounded-xl ${index % 2 === 0 ? 'bg-color2' : 'bg-color3'}`}>
            <Text className={`${index % 2 === 0 ? 'bg-color3' : 'bg-color1'} ${styles.text}`}>ID - #{id}</Text>
            <TextBox
                index={index}
                title={"Address"}
                value={address}
            />
            <TextBox
                index={index}
                title={"Ordered On"}
                value={createdAt}
            />
            <TextBox
                index={index}
                title={"Address"}
                value={address}
            />
            <TextBox
                index={index}
                title={"Status"}
                value={orderStatus}
            />
            <TextBox
                index={index}
                title={"Price"}
                value={price}
            />
            <TextBox
                index={index}
                title={"Payment Method"}
                value={paymentMethod}
            />
            {isAdmin &&
                <Pressable style={
                    ({pressed}) => ({opacity: pressed ? 0.8 : 1})
                }>
                    {/*Label Style is loading color*/}
                    <Button
                        icon={"update"}
                        mode={"contained"}
                        labelStyle={{color: index % 2 === 0 ? colors.white : colors.gray}}
                        textColor={index % 2 === 0 ? colors.white : colors.gray}
                        className={`${index % 2 === 0 ? 'bg-color3' : 'bg-color2'} w-[120px] self-center mt-5 `}
                        loading={isLoading}
                        disabled={isLoading}
                        onPress={() => updateHandler(id)}
                    >Update
                    </Button>
                </Pressable>
            }

        </View>
    )
}

const TextBox = ({index, title, value}) => (
    <Text
        className={`${index % 2 === 0 ? 'text-color3' : 'text-color2'} my-2`}
    >
        <Text
            className={"font-bold"}
        >
            {title} -{title === 'Price' ? ' $' : " "}
        </Text>
        {value}
    </Text>
)

const styles = {
    text: `text-color2 text-xl font-bold mx-[-20px] mt-[-20px] mb-5 rounded-tr-xl rounded-tl-xl p-2`
}