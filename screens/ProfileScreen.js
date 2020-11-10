/** @format */

import * as React from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	KeyboardAvoidingViewComponent,
	Alert,
} from 'react-native';
import MyHeader from '../components/header';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';
import db from '../config';

export default class ProfileScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			emailId: '',
			firstName: '',
			lastName: '',
			contact: '',
			address: '',
			docId: '',
		};
	}
	getDetails() {
		var user = firebase.auth().currentUser;
		var email = user.email;

		db.collection('users')
			.where('email_id', '==', email)
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					var data = doc.data();
					this.setState({
						emailId: data.email_id,
						firstName: data.first_name,
						lastName: data.last_name,
						address: data.address_a,
						contact: data.contact_info,
						docId: doc.id,
					});
				});
			});
		console.log(this.state.docId);
	}
	updateDetails = () => {
		db.collection('users').doc(this.state.docId).update({
			first_name: this.state.firstName,
			last_name: this.state.lastName,
			address_a: this.state.address,
			contact_info: this.state.contact,
		});
		Alert.alert('User Details Upadeted Successfully');
	};
	componentDidMount() {
		this.getDetails();
	}
	render() {
		return (
			<View style={styles.container}>
				<MyHeader title='Profile' navigation={this.props.navigation} />
				<View
					style={{
						// backgroundColor: '#428DFC',
						backgroundColor: 'rgba(66, 141, 252, 0.7)',
						flexDirection: 'row',
						justifyContent: 'space-between',
						padding: 20,
						paddingTop: -10,
					}}>
					<Text style={{ fontSize: 20, color: '#f1f1f1' }}>
						<Image
							style={{ width: 70, height: 70 }}
							source={{
								uri:
									'https://pitcoder.github.io/img/portfolio/thumbnails/avatar.png',
							}}
						/>
						{'  '}
						{firebase.auth().currentUser.email}
						{'\n'}
					</Text>
				</View>
				<KeyboardAvoidingView style={styles.container}>
					<ScrollView contentContainerStyle={{ padding: 20 }}>
						<View>
							<Text style={styles.subtitle}>User Details</Text>
							<TextInput
								placeholder='First Name'
								style={[styles.input, { marginTop: 20 }]}
								onChangeText={(text) => this.setState({ firstName: text })}
								value={this.state.firstName}
							/>
							<TextInput
								placeholder='Last Name'
								style={styles.input}
								onChangeText={(text) => this.setState({ lastName: text })}
								value={this.state.lastName}
							/>
							<TextInput
								placeholder='Contact'
								style={styles.input}
								keyboardType='number-pad'
								onChangeText={(text) => this.setState({ contact: text })}
								value={this.state.contact}
							/>
							<TextInput
								placeholder='Address'
								style={[styles.input, { height: 70 }]}
								multiline={true}
								onChangeText={(text) => this.setState({ address: text })}
								value={this.state.address}
							/>
						</View>
						<TouchableOpacity style={styles.button}>
							<Text
								style={{
									color: '#ffffff',
									alignSelf: 'center',
									fontSize: 18,
								}}
								onPress={() => {
									this.updateDetails();
								}}>
								Save Changes
							</Text>
						</TouchableOpacity>
					</ScrollView>
				</KeyboardAvoidingView>
				<StatusBar style='light' backgroundColor='transparent' />
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
		shadowColor: '#000',
		shadowOffset: {
			width: 8,
			height: 8,
		},
		shadowOpacity: 0.3,
		shadowRadius: 10.32,
		elevation: 16,
	},
	subtitle: {
		fontSize: 32,
		color: '#f0f0f0',
		fontWeight: '800',
		textAlign: 'center',
		marginTop: '5%',
	},
	button: {
		width: 280,
		height: 40,
		fontSize: 20,
		borderRadius: 5,
		margin: 10,
		backgroundColor: '#1972f7',
		alignSelf: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 8,
			height: 8,
		},
		shadowOpacity: 0.3,
		shadowRadius: 10.32,
		elevation: 16,
	},
});
