/** @format */

import React from 'react';
import { Icon } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import TradeScreen from '../screens/TradeScreen';
import TransactionScreen from '../screens/TransactionScreen';
import 'react-native-vector-icons';

export const AppTabNavigator = createBottomTabNavigator(
	{
		Home: { screen: HomeScreen },
		Trade: { screen: TradeScreen },
		Search: { screen: SearchScreen },
		Transactions: { screen: TransactionScreen },
		Profile: { screen: ProfileScreen },
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarOptions: {
				keyboardHidesTabBar: true,
				activeTintColor: '#f1f1f1',
				inactiveTintColor: '#676767',
				style: {
					borderWidth: 0,
					backgroundColor: '#3490dc',
					borderTopColor: '#2779E1',
				},
			},
		}),
	}
);
