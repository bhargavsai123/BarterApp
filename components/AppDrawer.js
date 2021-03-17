/** @format */

import * as Reacrt from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import { AppTabNavigator } from "./AppTabNavigator";
import Login from "../screens/LoginScreen";
import SideBar from "./SideBar";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ExchangeScreen from "../screens/ExchangeScreen";

import Barters from "../screens/Barters";

export const AppDrawerNavigator = createDrawerNavigator(
  {
    Barter: { screen: AppTabNavigator },
    Home: { screen: HomeScreen },
    Exchange: { screen: ExchangeScreen },
    "Barter's List": { screen: Barters },
    Profile: { screen: ProfileScreen },
  },
  {
    contentComponent: SideBar,
  },
  {
    initialRouteName: "Home",
  }
);
