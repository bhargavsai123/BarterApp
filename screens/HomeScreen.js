/** @format */

import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import MyHeader from "../components/header";
import { StatusBar } from "expo-status-bar";

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View>
        <MyHeader title='Home' navigation={this.props.navigation} />
        <StatusBar style='light' backgroundColor='transparent' />
      </View>
    );
  }
}
