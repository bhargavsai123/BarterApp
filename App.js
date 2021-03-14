/** @format */

import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Login from "./screens/LoginScreen";
import { AppTabNavigator } from "./components/AppTabNavigator";
import { AppDrawerNavigator } from "./components/AppDrawer";
import ProfileScreen from "./screens/ProfileScreen";

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const switchNavigator = createSwitchNavigator({
  Login: { screen: Login },
  Drawer: { screen: AppDrawerNavigator },
});

const AppContainer = createAppContainer(switchNavigator);
