/** @format */

import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MyHeader from '../components/header';
import { StatusBar } from 'expo-status-bar';

export default class ProfileScreen extends React.Component {
	render() {
		return (
			<View>
				<MyHeader title='Profile' navigation={this.props.navigation} />
				<Text>Profile</Text>
				<StatusBar style='light' backgroundColor='transparent' />
			</View>
		);
	}
}
