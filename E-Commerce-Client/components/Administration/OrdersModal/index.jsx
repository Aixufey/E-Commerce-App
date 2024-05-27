import {View, Text, Pressable} from "react-native";
import {Avatar, Button, Divider} from "react-native-paper";
import {colors} from "../../../styles";

export default function ({id, deleteHandler, navigate, setIsDeleting}) {
    return (
        <View
            style={{
                elevation: 10
            }}
            className={"bg-color5 flex-1 justify-center self-center w-[250px] h-[100px] mb-5 rounded-2xl z-100"}
        >
            <Pressable
                style={({pressed}) => ({opacity: pressed ? 0.9 : 1})}
                className={"absolute top-[10px] right-[10px]"}
                onPress={() => setIsDeleting(false)}
            >
                <Avatar.Icon
                    icon={"close"}
                    size={25}
                    className={"bg-color1"}
                />
            </Pressable>
            <Button
                icon={"playlist-edit"}
                textColor={colors.gray}
                className={"w-[150px] h-[50px] self-center p-2"}
                onPress={() => navigate('updateProduct', {id: id})}
            >
                Edit
            </Button>
            <Divider bold={true}/>
            <Button
                icon={"delete"}
                textColor={colors.red1}
                className={"w-[150px] h-[50px] self-center p-2"}
                onPress={() => deleteHandler(id)}
            >Delete
            </Button>
        </View>
    )
}