/** @format */

import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MyHeader from '../components/header';
import { StatusBar } from 'expo-status-bar';

export default class TransactionScreen extends React.Component {
	render() {
		return (
			<View>
				<MyHeader title='Transactions' navigation={this.props.navigation} />
				<Text>Transaction</Text>
				<StatusBar style='light' backgroundColor='transparent' />
			</View>
		);
	}
}
