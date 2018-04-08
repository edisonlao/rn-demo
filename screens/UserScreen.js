import React from 'react';
import {View, Text, StatusBar } from 'react-native';

export default class UserScreen extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: 'User',
        headerTitleStyle: {
            color: '#fff'
        },
        headerStyle: {
            height: 40,
            padding: 10,
            backgroundColor: '#29c7ef' // 设置导航栏的背景颜色,headerTintColor设置无效
        },
    });

    render() {
        return(
        <View>
            <StatusBar backgroundColor={'#29c7ef'} />
            <Text>User</Text>
        </View>
        );
    }
}
