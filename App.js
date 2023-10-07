import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import "react-native-url-polyfill/auto";
import RestaurantScreen from "./screens/RestaurantScreen";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import cartScreen from "./screens/cartScreen";
import PlaceOrderScreen from "./screens/placeOrderScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={"Home"} component={HomeScreen} />
          <Stack.Screen name={"Restaurant"} component={RestaurantScreen} />
          <Stack.Screen
            name={"Cart"}
            component={cartScreen}
            options={{
              presentation: "modal",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={"Order"}
            options={{
              presentation: 'fullScreenModal',
              headerShown: false
            }}
            component={PlaceOrderScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
