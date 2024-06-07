import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MovieScreen from "../screens/MovieScreen";
import TVScreen from "../screens/TVScreen";
import SearchScreen from "../screens/SearchScreen";
import { View } from "react-native-web";

const Tab = createMaterialTopTabNavigator();

const TabNav = () => {
  /**
   * Returns a View component containing a Tab Navigator with three screens: Movies, Search Results, and TV Shows.
   * Each screen is associated with a specific component: MovieScreen, SearchScreen, and TVScreen respectively.
   * @returns {JSX.Element} A View component with a Tab Navigator and its associated screens.
   */
  return (
    <View>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: { backgroundColor: "white" },
        }}
        initialRouteName="Movies"
      >
        <Tab.Screen name="Movies" component={MovieScreen} />
        <Tab.Screen name="Search Results" component={SearchScreen} />
        <Tab.Screen name="TV Shows" component={TVScreen} />
      </Tab.Navigator>
    </View>
  );
};
export default TabNav;
