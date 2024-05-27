import {useEffect, useState} from "react";
import {Pressable, ScrollView, Text, View} from "react-native";
import {Avatar, Button} from "react-native-paper";
import {Footer, Header, HeadingText, ProductCard, SearchModal} from '../../components';
import {colors, defaultStyles} from "../../styles";
import {useIsFocused, useNavigation} from "@react-navigation/native";
// import {categories} from "../../utils/categories";
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts} from "../../redux/actions/productActions";
import {useCategories} from "../../hooks/categories/useCategories";
import Toast from "react-native-toast-message";


export default function () {
    const [category, setCategory] = useState();
    const [categories, setCategories] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [query, setQuery] = useState("");
    const nav = useNavigation();

    const dispatch = useDispatch();
    const {products} = useSelector(state => state.product);
    const isFocused = useIsFocused();

    const categoryButtonHandler = (id) => {
        // console.info("Category: ", id)
        setCategory(id);
    };

    // The payload is the product object that conforms to the cartItem schema in Order model
    // Quantity will always be 1 from Home screen
    const addToCardHandler = (id, name, price, image, stock) => {
        //console.info('Add to Cart', id, name, price, image, stock);
        if (stock === 0) return Toast.show({
            type: "error",
            text1: "Out Of Stock"
        })

        dispatch({
            type: "addToCart",
            payload: {
                productId: id,
                name,
                price,
                image,
                stock,
                quantity: 1
            }
        })

        Toast.show({
            type: "success",
            text1: "Added to Cart"
        })
    };

    // Get categories when the component is focused
    useCategories(setCategories, isFocused);

    useEffect(() => {
        // Consider lodash for debounce
        const timeOutId = setTimeout(() => {
            dispatch(getAllProducts(query, category))

        }, 500);

        return () => {
            clearTimeout(timeOutId);
        }
    }, [dispatch, query, category])

    return (
        <>
            {/*Search Modal*/}
            {isSearch &&
                <SearchModal
                    query={query}
                    setQuery={setQuery}
                    setIsSearch={setIsSearch}
                    products={products}
                />
            }

            <View style={defaultStyles}>
                <Header/>

                <View style={{
                    paddingTop: 70,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    {/*Heading*/}
                    <HeadingText title={"Our"} subTitle={"Products"}/>


                    {/*Search*/}
                    <View>
                        <Pressable onPress={() => setIsSearch(prev => !prev)}>
                            <Avatar.Icon icon={'magnify'} size={50} color={'gray'}
                                         style={{backgroundColor: colors.white, elevation: 12}}/>
                        </Pressable>
                    </View>
                </View>


                {/*Categories*/}
                <View style={{
                    flexDirection: 'row',
                    height: 80
                }}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            alignItems: "center"
                        }}
                    >
                        {categories.length > 0 &&
                            <Button
                                style={{
                                    backgroundColor: category === "" ? colors.red3 : colors.light2,
                                }}
                                onPress={() => categoryButtonHandler("")}
                            >
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: category === "" ? colors.white : colors.gray
                                    }}
                                >
                                    All
                                </Text>
                            </Button>
                        }
                        {categories &&
                            categories.map((item, i) => (
                                <Button
                                    key={item._id}
                                    style={{
                                        backgroundColor: category === item._id ? colors.red3 : colors.light2,
                                        borderRadius: 100,
                                        margin: 5
                                    }}
                                    onPress={() => categoryButtonHandler(item._id)}
                                >
                                    <Text style={{
                                        fontSize: 12,
                                        color: category === item._id ? colors.white : colors.gray
                                    }}>
                                        {item.category}
                                    </Text>
                                </Button>
                            ))
                        }
                    </ScrollView>
                </View>

                {/* Products */}
                <View style={{flex: 1}}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={products && products.length > 1}
                    >
                        {products &&
                            products.map((item, i) => (
                                <ProductCard
                                    index={i}
                                    key={item._id}
                                    id={item._id}
                                    image={item.images.at(0)?.url}
                                    name={item.name}
                                    price={item.price}
                                    addToCardHandler={addToCardHandler}
                                    stock={item.stock}
                                    navigate={nav}
                                />
                            ))
                        }
                    </ScrollView>
                </View>
            </View>

            {/*Footer*/}
            <Footer activeRoute={'home'}/>
        </>
    )
}
