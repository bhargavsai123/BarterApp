/** @format */

import { createStackNavigator } from "react-navigation-stack";

import ExchangeScreen from "../screens/ExchangeScreen";
import UserDetails from "../screens/UserDetails";

export const AppStackNavigator = createStackNavigator(
  {
    ExchangeScreen: {
      screen: ExchangeScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    UserDetails: {
      screen: UserDetails,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: "ExchangeScreen",
  }
);
