import React from 'react';
import {StyleSheet, Button, Text, View, Alert, StatusBar} from 'react-native';

export default class UserScreen extends React.Component {
    static navigationOptions = ({ navigation, screenProps}) =>({
        headerTitle: 'Trolley',
        headerTitleStyle: {
            color: '#ffffff',
        },
        headerStyle: {
            height: 40,
            padding: 10,
            backgroundColor: '#29c7ef' // 设置导航栏的背景颜色,headerTintColor设置无效
        },
        titleStyle: {
            color: 'green'
        }
    });

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={'#29c7ef'} />
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Button title="打开摄像头"  onPress={() => this.openCamera()}></Button>
                </View>
            </View>
        )
    }

    openCamera() {
        Alert.alert('内容', '暂不支持');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bottomTab: {
        color: '#29c7ef',
    },
    textStyle: {
        height: 100,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    tabText: {
        color: '#000000',
        fontSize: 10
    },
    selectedTabText: {
        color: '#D81E06'
    },
    icon: {
        width: 20,
        height: 20
    }
});