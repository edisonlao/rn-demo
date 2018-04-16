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
                let iconDefault, iconActive;
                switch (routeName) {
                    case 'Home':
                            iconDefault = require('../assets/images/home.png');
                            iconActive = require('../assets/images/home-active.png');

                        break;
                    case 'search':
                        iconDefault = require('../assets/images/search.png');
                        iconActive = require('../assets/images/search-active.png');
                        break;
                    case 'Trolley':
                        iconDefault = require('../assets/images/trolley.png');
                        iconActive = require('../assets/images/trolley-active.png');
                        break;
                    case 'User':
                        iconDefault = require('../assets/images/user.png');
                        iconActive = require('../assets/images/user-active.png');
                        break;
                }
                return (
                    <Image
                        source={focused ? iconActive : iconDefault}
                        size={28}
                        style={{marginBottom: -3, width: 25, height: 25}}
                        color={focused ? '#1296db' : '#cdcdcd'}
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
