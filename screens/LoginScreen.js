/** @format */

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
	Alert,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	Modal,
	View,
	KeyboardAvoidingView,
	ScrollView,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import LottieView from 'lottie-react-native';

export default class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			contact: '',
			address: '',
			confirmPassword: '',
			isModalVisible: false,
		};
	}
	login = (email, password) => {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				return this.props.navigation.navigate('Home');
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				return Alert.alert(errorMessage);
			});
	};
	signup = (email, password, confirmPassword) => {
		if (password != confirmPassword) {
			Alert.alert('Password does not Match');
		} else {
			if (
				this.state.firstName === '' ||
				this.state.lastName === '' ||
				this.state.contact === '' ||
				this.state.address === ''
			) {
			} else {
				firebase
					.auth()
					.createUserWithEmailAndPassword(email, password)
					.then(() => {
						db.collection('users').add({
							email_id: this.state.email,
							first_name: this.state.firstName,
							last_name: this.state.lastName,
							contact_info: this.state.contact,
							address_a: this.state.address,
						});
						return Alert.alert('User Added Sucessfully', '', [
							{
								text: 'Ok',
								onPress: this.setState({ isModalVisible: false }),
							},
						]);
					})
					.catch((error) => {
						var errorCode = error.code;
						var errorMessage = error.message;
						return Alert.alert(errorMessage);
					});
			}
		}
	};
	showModal = () => {
		return (
			<Modal
				visible={this.state.isModalVisible}
				animationType={'slide'}
				transparent={true}>
				<ScrollView style={styles.modal}>
					<View style={{ justifyContent: 'center' }}>
						<Text
							style={[
								styles.subtitle,
								{ marginTop: '10%', marginBottom: '5%' },
							]}>
							Sign Up
						</Text>
						<TextInput
							placeholder={'First Name'}
							onChangeText={(text) => {
								this.setState({ firstName: text });
							}}
							style={styles.input}
						/>
						<TextInput
							placeholder={'Last Name'}
							onChangeText={(text) => {
								this.setState({ lastName: text });
							}}
							style={styles.input}
						/>
						<TextInput
							placeholder={'Contact'}
							onChangeText={(text) => {
								this.setState({ contact: text });
							}}
							keyboardType={'number-pad'}
							style={styles.input}
						/>
						<TextInput
							placeholder={'Address'}
							onChangeText={(text) => {
								this.setState({ address: text });
							}}
							style={[styles.input, { height: 60 }]}
							multiline={true}
						/>
						<TextInput
							placeholder={'Email ID'}
							onChangeText={(text) => {
								this.setState({ email: text });
							}}
							keyboardType='email-address'
							style={styles.input}
						/>
						<TextInput
							placeholder={'Password'}
							onChangeText={(text) => {
								this.setState({ password: text });
							}}
							secureTextEntry={true}
							style={styles.input}
						/>
						<TextInput
							placeholder={'Confirm Password'}
							onChangeText={(text) => {
								this.setState({ confirmPassword: text });
							}}
							secureTextEntry={true}
							style={styles.input}
						/>
						<TouchableOpacity
							style={[styles.button, { backgroundColor: '#23286B' }]}
							onPress={() =>
								this.signup(
									this.state.email,
									this.state.password,
									this.state.confirmPassword
								)
							}>
							<Text
								style={{
									color: '#ffffff',
									alignSelf: 'center',
									fontSize: 18,
								}}>
								Sign Up
							</Text>
						</TouchableOpacity>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center',
								marginTop: '5%',
							}}>
							<Text
								style={{
									color: '#ffffff',
									fontSize: 15,
								}}>
								Already have an account?{' '}
							</Text>
							<TouchableOpacity
								onPress={() => {
									this.setState({ isModalVisible: false });
								}}>
								<Text
									style={{
										textDecorationLine: 'underline',
										color: '#ffffff',
										fontSize: 15,
									}}>
									Click here to Login!
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</Modal>
		);
	};
	render() {
		return (
			<View style={styles.container}>
				{this.showModal()}

				{/* // Lottie Animation Not Working
				<LottieView
					source={require('../assets/31821-share-everythin-moneybooks.json')}
					style={{ width: '60%', height: 100 }}
					autoPlay
					loop
				/> */}
				<Text style={styles.title}>Barter</Text>
				<KeyboardAvoidingView>
					<View style={styles.login}>
						<Text style={styles.subtitle}>Login</Text>
						<TextInput
							style={styles.input}
							placeholder='Email ID'
							placeholderTextColor='#999999'
							keyboardType='email-address'
							onChangeText={(text) => {
								this.setState({ email: text });
							}}
						/>
						<TextInput
							style={styles.input}
							placeholder='Password'
							placeholderTextColor='#999999'
							secureTextEntry={true}
							onChangeText={(text) => {
								this.setState({ password: text });
							}}
						/>
						<TouchableOpacity
							onPress={() => {
								this.login(this.state.email, this.state.password);
							}}
							style={styles.button}>
							<Text
								style={{
									color: '#ffffff',
									alignSelf: 'center',
									fontSize: 18,
								}}>
								Sign In
							</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: 15,
					}}>
					<Text style={{ color: '#ffffff', fontSize: 15 }}>
						Don't have an account?{' '}
					</Text>
					<TouchableOpacity
						onPress={() => {
							this.setState({ isModalVisible: true });
						}}>
						<Text
							style={{
								textDecorationLine: 'underline',
								color: '#ffffff',
								fontSize: 15,
							}}>
							Sign Up here!
						</Text>
					</TouchableOpacity>
				</View>
				<StatusBar style='auto' backgroundColor='transparent' />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#3490dc',
		alignContent: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 45,
		padding: 20,
		color: '#202565',
		alignSelf: 'center',
	},
	subtitle: {
		fontSize: 32,
		color: '#f0f0f0',
		fontWeight: '800',
		textAlign: 'center',
		marginTop: '5%',
	},
	input: {
		width: 300,
		height: 40,
		fontSize: 20,
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
	button: {
		width: 300,
		height: 40,
		fontSize: 20,
		borderRadius: 5,
		margin: 10,
		backgroundColor: '#2779E1',
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
	modal: {
		width: 380,
		height: 380,
		fontSize: 20,
		borderRadius: 5,
		margin: 10,
		backgroundColor: '#2779E1',
		paddingLeft: 10,
		alignContent: 'center',
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
});
