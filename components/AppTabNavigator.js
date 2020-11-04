/** @format */

import React from 'react';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TradeScreen from '../screens/TradeScreen';
import TransactionScreen from '../screens/TransactionScreen';
import 'react-native-vector-icons';

export const AppTabNavigator = createBottomTabNavigator(
	{
		Home: {
			screen: HomeScreen,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<Icon name='home' type='entypo' color={tintColor} />
				),
			},
		},
		Trade: {
			screen: TradeScreen,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<Icon name='users' type='feather' color={tintColor} />
				),
			},
		},
		Transactions: {
			screen: TransactionScreen,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<Icon name='profile' type='antdesign' color={tintColor} />
				),
			},
		},
		Profile: {
			screen: ProfileScreen,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<Icon
						name='account-circle'
						type='materialcommunityicons'
						color={tintColor}
					/>
				),
			},
		},
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarOptions: {
				keyboardHidesTabBar: true,
				activeTintColor: '#f1f1f1',
				inactiveTintColor: '#676767',
				style: {
					borderWidth: 0,
					backgroundColor: '#428DFC',
					borderTopColor: '#3490dc',
				},
			},
		}),
	}
);
