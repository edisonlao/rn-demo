import React from 'react';
import {Platform, Image} from 'react-native';
import {TabNavigator, TabBarBottom} from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import TrolleyScreen from '../screens/TrolleyScreen';
import UserScreen from '../screens/UserScreen';

export default TabNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        search: {
            screen: SearchScreen,
        },
        Trolley: {
            screen: TrolleyScreen,
        },
        User: {
            screen: UserScreen,
        },
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused}) => {
                const {routeName} = navigation.state;
                let iconName;
                switch (routeName) {
                    case 'Home': iconName = require('../assets/images/home.png');break;
                    case 'search':iconName = require('../assets/images/search.png');break;
                    case 'Trolley':iconName = require('../assets/images/trolley.png');break;
                    case 'User':iconName = require('../assets/images/user.png');break;
                }
                return (
                    <Image
                        source={iconName}
                        size={28}
                        style={{marginBottom: -3, width: 25, height: 25}}
                        color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
                    />
                );
            },
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
    }
);
