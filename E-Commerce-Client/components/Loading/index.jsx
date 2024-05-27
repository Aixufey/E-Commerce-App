import {ActivityIndicator} from "react-native-paper";
import {colors} from "../../styles";

const Loading = () => {
    return <ActivityIndicator
        size={200}
        className={"top-[50%] absolute self-center"}
        color={colors.gray}
    />
}
export default Loading;

