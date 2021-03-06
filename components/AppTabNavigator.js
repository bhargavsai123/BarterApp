/** @format */

import React from "react";
import { Icon } from "react-native-elements";
import { createBottomTabNavigator } from "react-navigation-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ExchangeScreen from "../screens/ExchangeScreen";

import { AppStackNavigator } from "./stack";
import Barters from "../screens/Barters";

import "react-native-vector-icons";

export const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name='home' type='entypo' color={tintColor} />
        ),
      },
    },
    Exchange: {
      screen: AppStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name='users' type='feather' color={tintColor} />
        ),
      },
    },
    "Barter's List": {
      screen: Barters,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name='list' type='entypo' color={tintColor} />
        ),
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name='account-circle'
            type='materialcommunityicons'
            color={tintColor}
          />
        ),
      },
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarOptions: {
        keyboardHidesTabBar: true,
        activeTintColor: "#f1f1f1",
        inactiveTintColor: "#676767",
        style: {
          borderWidth: 0,
          backgroundColor: "#428DFC",
          borderTopColor: "#3490dc",
        },
      },
    }),
  }
);
