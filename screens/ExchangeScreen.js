/** @format */

import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Modal,
	Alert,
	FlatList,
} from 'react-native';
import { Header, ListItem, Avatar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import db from '../config';
import firebase from 'firebase';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import { FloatingAction } from 'react-native-floating-action';
import { FAB } from 'react-native-paper';

export default class ExchangeScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			userName: firebase.auth().currentUser.email,
			itemName: '',
			description: '',
			isModalVisible: false,
			trades: [],
		};
		this.tradeRef = null;
	}
	addItem = (itemName, description) => {
		if (this.state.itemName === '' || this.state.description === '') {
			Alert.alert('Please enter the Item you want to Exchange');
		} else {
			var userName = this.state.userName;
			db.collection('trades').add({
				user_name: userName,
				item_name: itemName,
				description_d: description,
			});
			this.setState({ itemName: '', description: '' });
			return Alert.alert('Item Ready to Exchange');
		}
	};
	showModal = () => {
		return (
			<Modal
				animationType='slide'
				transparent={true}
				visible={this.state.isModalVisible}>
				<View style={styles.modal}>
					<Text style={styles.title}>Add Item</Text>
					<View
						style={{
							backgroundColor: '#428DFC',
							borderBottomStartRadius: 3,
							borderBottomEndRadius: 3,
						}}>
						<TextInput
							placeholder='Item Name'
							style={[styles.input, { marginTop: 50 }]}
							onChangeText={(text) => {
								this.setState({ itemName: text });
							}}
						/>
						<TextInput
							placeholder='Description'
							multiline={true}
							style={[
								styles.input,
								{ height: 140, marginTop: 30, marginBottom: 20 },
							]}
							onChangeText={(text) => {
								this.setState({ description: text });
							}}
						/>
						<TouchableOpacity
							style={styles.button}
							onPress={() => {
								this.addItem(this.state.itemName, this.state.description);
							}}>
							<Text style={styles.text}>Add Item</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{ marginBottom: 20 }}
							onPress={() => {
								this.setState({ isModalVisible: false });
							}}>
							<Text
								style={[
									styles.text,
									{ fontSize: 15, textDecorationLine: 'underline' },
								]}>
								Cancel
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		);
	};
	getTradeList = () => {
		this.tradeRef = db.collection('trades').onSnapshot((snapshot) => {
			var requestedTrades = snapshot.docs.map((document) => document.data());
			this.setState({ trades: requestedTrades });
		});
	};
	UNSAFE_componentWillMount() {
		this.getTradeList();
	}
	componentWillMount() {
		this.tradeRef;
	}
	keyExtractor = (item, index) => index.toString();
	renderItem = ({ item, i }) => {
		return (
			<ListItem
				containerStyle={{
					borderRadius: 5,
					margin: 10,
					shadowColor: '#000',
					shadowOffset: {
						width: 8,
						height: 8,
					},
					shadowOpacity: 0.3,
					shadowRadius: 10.32,
					elevation: 12,
				}}
				Component={TouchableScale}
				linearGradientProps={{
					colors: ['#70abff', '#428DFC'],
					start: { x: 1, y: 0 },
					end: { x: 0.2, y: 0 },
				}}>
				<ListItem.Content>
					<ListItem.Title style={{ color: '#f1f1f1', fontWeight: 'bold' }}>
						{item.item_name}
					</ListItem.Title>
					<ListItem.Subtitle>{item.user_name}</ListItem.Subtitle>
				</ListItem.Content>
				<ListItem.Chevron color='white' />
			</ListItem>
		);
	};
	render() {
		return (
			<View style={styles.container}>
				{this.showModal()}
				<Header
					backgroundColor='#428DFC'
					leftComponent={{ icon: 'menu', color: '#f1f1f1' }}
					centerComponent={{
						text: 'Exchange',
						style: { color: '#f1f1f1', fontSize: 20 },
					}}
					rightComponent={{ icon: 'settings', color: '#f1f1f1' }}
					containerStyle={{
						borderBottomColor: '#3490dc',
					}}
				/>
				<ScrollView>
					<FlatList
						keyExtractor={this.keyExtractor}
						data={this.state.trades}
						renderItem={this.renderItem}
					/>
				</ScrollView>
				{/* <TouchableOpacity
					style={styles.outbutton}
					onPress={() => {
						this.setState({ isModalVisible: true });
					}}>
					<Text style={styles.text}>Add Items</Text>
				</TouchableOpacity> */}
				<FAB
					style={styles.fab}
					label={'Add Items'}
					icon='plus'
					onPress={() => {
						this.setState({ isModalVisible: true });
					}}
				/>
				<StatusBar style={'light'} />
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
		backgroundColor: '#1972f7',
		width: '80%',
		justifyContent: 'center',
		alignContent: 'center',
		alignSelf: 'center',
		borderRadius: 5,
		marginVertical: 100,
		shadowColor: '#000',
		shadowOffset: {
			width: 8,
			height: 8,
		},
		shadowOpacity: 0.3,
		shadowRadius: 10.32,
		elevation: 16,
	},
	title: {
		fontSize: 25,
		padding: 20,
		color: '#202565',
		alignSelf: 'center',
	},
	button: {
		width: 280,
		height: 35,
		fontSize: 20,
		borderRadius: 5,
		margin: 10,
		marginVertical: 20,
		backgroundColor: '#1972f7',
		alignSelf: 'center',
		justifyContent: 'center',
	},
	input: {
		width: 280,
		height: 35,
		fontSize: 20,
		padding: 5,
		borderRadius: 5,
		paddingLeft: 10,
		margin: 10,
		backgroundColor: '#f1f1f1',
		color: '#999999',
		alignSelf: 'center',
	},
	text: {
		color: '#f1f1f1',
		fontSize: 20,
		padding: 5,
		alignSelf: 'center',
	},
	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
		backgroundColor: '#1972f7',
	},
});
