/** @format */

import * as Reacrt from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator';
import SideBar from './SideBar';

export const AppDrawerNavigator = createDrawerNavigator(
	{
		Barter: { screen: AppTabNavigator },
	},
	{
		contentComponent: SideBar,
	},
	{
		initialRouteName: 'Barter',
	}
);
