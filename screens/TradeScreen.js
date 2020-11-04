/** @format */

import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Header } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

export default class TradeScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			isModalVisible: false,
		};
	}
	showModal = () => {
		<Modal
			animationType='slide'
			transparent={true}
			visible={this.state.isModalVisible}>
			<Text>ffffwwwwwwregegeww</Text>
		</Modal>;
	};
	render() {
		return (
			<View style={styles.container}>
				<Header
					backgroundColor='#428DFC'
					leftComponent={{ icon: 'menu', color: '#f1f1f1' }}
					centerComponent={{ text: 'Trade', style: { color: '#f1f1f1' } }}
					rightComponent={{ icon: 'settings', color: '#f1f1f1' }}
				/>
				<ScrollView>
					<Text>fff</Text>
				</ScrollView>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						this.setState({ isModalVisible: true });
					}}>
					<Text style={styles.text}>Add Item</Text>
				</TouchableOpacity>
				<StatusBar backgroundColor='#428DFC' style={'light'} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignContent: 'center',
		backgroundColor: '#A1C3FC',
	},
	modal: {
		backgroundColor: '#428DFC',
	},
	text: {
		color: '#f1f1f1',
		fontSize: 20,
		padding: 5,
		alignSelf: 'center',
	},
	button: {
		width: 300,
		height: 40,
		fontSize: 20,
		borderRadius: 5,
		margin: 10,
		backgroundColor: '#428DFC',
		alignSelf: 'center',
		justifyContent: 'center',
	},
});
