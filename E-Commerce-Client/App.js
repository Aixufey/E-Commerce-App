import Main from "./Main";
import {Provider} from "react-redux"
import {store} from "./redux/store";
import {StripeProvider} from "@stripe/stripe-react-native"

export default function App() {
    return (
        //react-native-dotenv module import is breaking with > 3.4.9
        <StripeProvider
            threeDSecureParams={{
                backgroundColor: "#fff",
                timeout: 5
            }}
            merchantIdentifier={"aixufey.e-commerce.com"}
            publishableKey={process.env.STRIPE_API_KEY}>
            <Provider store={store}>
                <Main/>
            </Provider>
        </StripeProvider>
    );
}
