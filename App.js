/** @format */

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './screens/LoginScreen';
import { AppTabNavigator } from './components/AppTabNavigator';

export default class App extends React.Component {
	render() {
		return <AppContainer />;
	}
}

const switchNavigator = createSwitchNavigator({
	Login: { screen: Login },
	TabNavigator: { screen: AppTabNavigator },
});

const AppContainer = createAppContainer(switchNavigator);
