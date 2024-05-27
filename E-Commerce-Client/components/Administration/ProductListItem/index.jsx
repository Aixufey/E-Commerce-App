import {Pressable, View, Text, Image} from "react-native";
import {useState} from "react";
import OrdersModal from "../OrdersModal";


export default function (
    {
        id,
        index,
        price,
        name,
        stock,
        category,
        image,
        navigate,
        deleteHandler
    }) {

    const [isDeleting, setIsDeleting] = useState(false);
    return (
        <>
            <Pressable
                style={({pressed}) => ({opacity: pressed ? 0.9 : 1})}
                onPress={() => navigate("productDetails", {id: id})}
                onLongPress={() => setIsDeleting(prev => !prev)}
            >

                <View
                    className={`flex-row justify-between items-center h-[70px] rounded-xl my-4 p-2 ${index % 2 === 0 ? 'bg-color1' : 'bg-color3'}`}
                >
                    <Image
                        source={{uri: image}}
                        className={"w-[45px] h-[45px] rounded-xl"}
                    />

                    <Text
                        numberOfLines={1}
                        className={"text-color2 font-bold w-[60px] p-2"}>${price}
                    </Text>
                    <Text
                        numberOfLines={1}
                        className={"text-color2 w-[60px] max-w-[100px] p-2"}>{name}
                    </Text>
                    <Text
                        numberOfLines={1}
                        className={"text-color2 w-[60px] max-w-[100px] p-2"}>{category}
                    </Text>
                    <Text
                        numberOfLines={1}
                        className={"text-color2 w-[60px] max-w-[100px] p-2"}>{stock}
                    </Text>
                </View>
            </Pressable>

            {/*Orders Modal*/}
            {isDeleting && (
                <OrdersModal
                    id={id}
                    deleteHandler={deleteHandler}
                    navigate={navigate}
                    setIsDeleting={setIsDeleting}
                />
            )

            }


        </>
    )
}