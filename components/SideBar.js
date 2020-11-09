/** @format */

import * as React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase';
import db from '../config';

export default class SideBar extends React.Component {
	render() {
		return (
			<View>
				<View
					style={{
						backgroundColor: '#428DFC',
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}>
					<Text style={{ margin: 20, fontSize: 20, color: '#f1f1f1' }}>
						<Image
							style={{ width: 50, height: 50 }}
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
				<View>
					<DrawerItems {...this.props} />
				</View>
				<View onPress={{ opacity: 1 }}>
					<TouchableOpacity
						style={{ paddingLeft: 15, marginTop: '100%' }}
						onPress={() => {
							this.props.navigation.navigate('Login');
							firebase.auth().signOut();
						}}>
						<Text style={{ fontWeight: 'bold' }}>Sign Out</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
