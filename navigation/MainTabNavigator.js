import React from 'react';
import {Platform} from 'react-native';
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
                    case 'Home':
                        iconName =
                            Platform.OS === 'ios'
                                ? `ios-home${focused ? '' : '-outline'}`
                                : 'md-home';
                        break;
                    case 'search':
                        iconName = Platform.OS === 'ios' ? `ios-search${focused ? '' : '-outline'}` : 'md-search';
                        break;
                    case 'Trolley':
                        iconName = Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link';
                        break;
                    case 'User':
                        iconName =
                            Platform.OS === 'ios' ? `ios-person${focused ? '' : '-outline'}` : 'md-person';
                }
                // return (
                //     <Ionicons
                //         name={iconName}
                //         size={28}
                //         style={{marginBottom: -3, width: 25}}
                //         color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
                //     />
                // );
            },
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
    }
);
