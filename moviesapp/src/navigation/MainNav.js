import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import DetailsScreen from "../screens/DetailsScreen";
import TabNav from "./TabNav";

const Tab = createMaterialTopTabNavigator();

const Stack = createStackNavigator();

/**
 * Functional component representing the main navigation structure of the application.
 * It includes a stack navigator with screens for "Movies" and "Details".
 * @returns JSX element representing the main navigation structure.
 */
const MainNav = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator>
        <Stack.Screen name="Movies" component={TabNav} />
        <Stack.Screen
          options={{ ...MainNavProps.BackOptions }}
          name="Details"
          component={DetailsScreen}
        />
      </Stack.Navigator>
    </View>
  );
};
export default MainNav;

const MainNavProps = {
  BackOptions: {
    headerBackTitle: "Home",
    headerStyle: {
      backgroundColor: "black",
    },
    headerTintColor: "#fff",
    headerBackTitleStyle: {
      backgroundColor: "black",
    },
  },
};
