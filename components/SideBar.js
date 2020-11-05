/** @format */

import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase';

export default class SideBar extends React.Component {
	render() {
		return (
			<View>
				<View>
					<DrawerItems {...this.props} />
				</View>
				<View>
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.navigate('Home');
							firebase.auth().signOut();
						}}>
						<Text>Sign Out</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
