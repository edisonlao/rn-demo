import React from 'react';
import {StyleSheet, Button, Text, View, Alert, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class UserScreen extends React.Component {
    static navigationOptions = ({ navigation, screenProps}) =>({
        header: null
    });

    render() {
        return (
            <View style={styles.container}>
                <StatusBar style={styles.statusBarView} backgroundColor={"#4f8eff"}/>
                <LinearGradient
                    colors={['#4f8eff', '#37bafe']}
                    style={styles.titleView}>
                    <Text style={styles.titleText}>Trolley</Text>
                </LinearGradient>
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
    titleView:{
        width: 360,
        height: 40,
        padding: 5,
        margin: 0,
        color: '#ffffff',
        backgroundColor: '#29c7ef',
    },
    titleText:{
        color: '#fff',
        fontSize: 20,
        marginLeft: 15
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