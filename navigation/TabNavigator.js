import React from 'react';
import {
    Platform,
    Image,
    Dimensions} from 'react-native';
import {TabNavigator, TabBarBottom, TabBarTop} from 'react-navigation';

import Colors from '../constants/Colors';

import NowScreen from '../screens/NowScreen';
import HotScreen from '../screens/HotScreen';
import NowApp from '../router_flux/NowApp';

export default TabNavigator(
    {
        NOW: {
            screen: NowApp,
        },
        Hot: {
            screen: HotScreen,
        },
        Clothes: {
            screen: NowApp,
        },
        Trousers: {
            screen: HotScreen,
        },
        Shoes: {
            screen: NowApp,
        },
        Computer: {
            screen: HotScreen,
        },
        Cellphone: {
            screen: NowApp,
        },
    },
    {
        navigationOptions: ({navigation}) => ({

        }),
        tabBarComponent: TabBarTop,
        showLabel: false,
        SwitchView: true,
        animationEnabled: true,
        swipeEnabled: true,
        tabBarOptions:{
            scrollEnabled: true,
            style:{
                height: 0.06 * Dimensions.get("window").height,
                backgroundColor: '#ffffff',
                padding: 0,
            },
            tabStyle:{
                padding: 0,
                width: 0.25 * Dimensions.get("window").width,
            },
            activeTintColor: '#ee5a5a', //选中字体颜色
            inactiveTintColor: '#808080',   //未选中字体颜色
            indicatorStyle:{    //指向器颜色
                backgroundColor: '#ee5a5a',
            },
            pressColor: '#ee5a5a'
        }
    }
);
