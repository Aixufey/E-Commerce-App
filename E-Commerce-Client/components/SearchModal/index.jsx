import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { BackHandler, Image, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import { Headline, Searchbar } from "react-native-paper";
import { colors } from "../../styles";

export default function ({ query, setQuery, setIsSearch, products = [] }) {

    const nav = useNavigation();

    // This is to prevent "hardware back button" from closing the app when a search has been performed
    const backAction = () => {
        setQuery();
        setIsSearch(false);
        // Modal is a "overlay" on top of the View, we return the function value as true to "go back"
        return true;
    };


    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, [])

    return (
        // Android
        <View style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            zIndex: 100,
            backgroundColor: colors.white,
            padding: 35,
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
        }}>
            {/*iOS*/}
            <SafeAreaView>
                <Searchbar
                    placeholder={'Search...'}
                    onChangeText={(q) => setQuery(q)} value={query}
                    style={{
                        marginTop: 20
                    }}
                />

                <ScrollView>
                    <View style={{
                        paddingVertical: 40,
                        paddingHorizontal: 10
                    }}>
                        {products &&
                            products.map(item => (
                                <SearchItem
                                    key={item._id}
                                    imgSrc={item.images.at(0)?.url}
                                    name={item.name}
                                    price={item.price}
                                    handlePress={() => nav.navigate('productDetails', { id: item._id })}
                                />
                            ))
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>

    )
}

const SearchItem = ({ price, name, imgSrc, handlePress }) => (
    <Pressable onPress={handlePress}>
        <View style={{
            padding: 20,
            borderRadius: 10,
            backgroundColor: colors.red2,
            elevation: 5,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexDirection: 'row',
            marginVertical: 30
        }}>
            <Image
                source={{ uri: imgSrc }}
                style={{
                    width: 80,
                    height: 80,
                    position: 'absolute',
                    resizeMode: 'contain',
                    top: -15,
                    left: 10,
                    borderTopLeftRadius: 20,
                    borderBottomRightRadius: 20
                }}
            />
            <View style={{ width: '80%', paddingHorizontal: 30 }}>
                <Text numberOfLines={1}>{name}</Text>
                <Headline style={{
                    fontWeight: '900'
                }}>${price}</Headline>
            </View>
        </View>
    </Pressable>
)