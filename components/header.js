/** @format */

import * as React from 'react';
import { View, Text } from 'react-native';
import { Header, Icon, Badge } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

const MyHeader = (props) => {
	return (
		<View>
			<Header
				leftComponent={
					<Icon
						name='three-bars'
						type='octicon'
						color='#f1f1f1'
						onPress={() => props.navigation.toggleDrawer()}
					/>
				}
				centerComponent={{
					text: props.title,
					style: {
						color: '#f1f1f1',
						fontSize: 20,
						fontWeight: 'bold',
					},
				}}
				containerStyle={{
					borderBottomColor: '#3490dc',
					backgroundColor: '#428DFC',
				}}
			/>
			<StatusBar style={'dark'} />
		</View>
	);
};

export default MyHeader;
