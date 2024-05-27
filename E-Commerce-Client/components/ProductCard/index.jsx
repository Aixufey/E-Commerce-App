import {Image, Pressable, View, Text} from "react-native"
import {colors} from "../../styles"
import {Button} from "react-native-paper";

// Every Product Card we loop through has these properties and when we click on the card, we navigate to the product details page with the id of the product and stock.
export default function ({ index, id, stock, name, price, image, addToCardHandler, navigate }) {
  return (
    <Pressable
      onPress={() => navigate.navigate('productDetails', { id })}
    >
      <View style={{
        elevation: 5,
        width: 220,
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 20,
        borderRadius: 20,
        height: 400,
        backgroundColor: index % 2 === 0 ? colors.red2 : colors.white
      }}>
        <Image source={{
          uri: image
        }}
          style={{
            width: '100%',
            height: 200,
            resizeMode: 'contain',
            position: 'absolute',
            top: 105,
            left: 35
          }}
        />
        <View style={{
          flexDirection: 'row',
          padding: 20,
            justifyContent: 'space-between',
          width: '100%'
        }}>
            <Text numberOfLines={2} style={{
                color: index % 2 === 0 ? colors.white : colors.gray,
                fontSize: 25,
                fontWeight: 300,
                width: '60%'
            }}>{name}</Text>
            <Text numberOfLines={2} style={{
                color: index % 2 === 0 ? colors.white : colors.gray,
                fontSize: 20,
                fontWeight: 700
            }}>${price}</Text>
        </View>

          <Pressable
            style={{
                backgroundColor: index % 2 === 0 ? colors.white : colors.red2,
                borderRadius: 0,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
                width: '100%',
            }}
          >
              <Button
                  onPress={() => addToCardHandler(id, name, price, image, stock)}
                textColor={index % 2 === 0 ? colors.red1 : colors.white}
              >Add To Cart</Button>
          </Pressable>
      </View>

    </Pressable>
  )
}