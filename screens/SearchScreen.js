import React from 'react';
import {ScrollView, StyleSheet, Text, StatusBar} from 'react-native';

export default class SearchScreen extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: 'Search',
        headerTitleStyle: {
            color: '#fff'
        },
        headerStyle: {
            height: 40,
            padding: 10,
            color: '#ffffff',
            backgroundColor: '#29c7ef' // 设置导航栏的背景颜色,headerTintColor设置无效
        },
    });

    render() {
        return (
            <ScrollView style={styles.container}>
                <StatusBar backgroundColor={'#29c7ef'} />
                <Text>Search</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#ffffff',
    },
});
