/** @format */

import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import TradeScreen from '../screens/TradeScreen';
import TransactionScreen from '../screens/TransactionScreen';

export const AppTabNavigator = createBottomTabNavigator({
	Home: { screen: HomeScreen },
	Trade: { screen: TradeScreen },
	Search: { screen: SearchScreen },
	Transactions: { screen: TransactionScreen },
	Profile: { screen: ProfileScreen },
});
