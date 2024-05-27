import {Dimensions, View} from "react-native";
import {PieChart} from "react-native-chart-kit";
import {colors} from "../../../styles";



const SCREEN_WIDTH = Dimensions.get("screen").width - 100;
export default function ({inStock = 0, outOfStock = 0}) {
    const data = [
        {
            name: "Out of Stock",
            population: outOfStock,
            color: colors.light1,
            legendFontColor: colors.white
        },
        {
            name: "In Stock",
            population: inStock,
            color: colors.red1,
            legendFontColor: colors.white
        }
    ]
    const chartConfig = {
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    }
    return (
        <View>
            <PieChart
                chartConfig={chartConfig}
                data={data}
                width={SCREEN_WIDTH}
                height={150}
                accessor={"population"}
                backgroundColor={colors.gray}
                paddingLeft={"15"}
                absolute
            />
        </View>
    )
}