/** @format */

import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';

export default class HomeScreen extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Header
					backgroundColor='#428DFC'
					leftComponent={{ icon: 'menu', color: '#f1f1f1' }}
					centerComponent={{ text: 'Home', style: { color: '#f1f1f1' } }}
					rightComponent={{ icon: 'settings', color: '#f1f1f1' }}
				/>
				<StatusBar backgroundColor='#428DFC' style={'light'} />
				<View>
					<View
						style={{
							backgroundColor: '#428DFC',
							margin: 20,
							borderRadius: 3,
						}}>
						<Text style={styles.text}>Trades</Text>
					</View>
				</View>
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
	text: {
		color: '#f1f1f1',
		fontSize: 25,
		paddingLeft: 10,
		padding: 5,
	},
});
