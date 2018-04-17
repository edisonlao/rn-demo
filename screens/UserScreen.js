import React from 'react';
import {View, Text, StyleSheet, StatusBar, Platform, Switch, PixelRatio, Dimensions} from 'react-native';
import ReactFCM from '../src/module/ReactFCM';
import LinearGradient from 'react-native-linear-gradient';
import {isIphoneX} from "react-native-iphone-x-helper";

export default class UserScreen extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        header: null
    });

    state = {
        switchValue: false
    };

    toggleSwitch = (value) => {
        this.setState({ switchValue: value })
        if(Platform.OS === 'android') {
            ReactFCM.toggleNotification(value)
        }
    };

    componentDidMount = () => {
        if(Platform.OS === 'android')
        {
            ReactFCM.isNotificationEnabled((shouldShowNotification) => {
                this.setState({ switchValue : shouldShowNotification })
            })
        }
    };

    render() {
        if(Platform.OS === 'android') {
            return (<View>
                <StatusBar style={styles.statusBarView} backgroundColor={"#4f8eff"}/>
                <LinearGradient
                    colors={['#4f8eff', '#37bafe']}
                    style={styles.titleView}>
                    <Text style={styles.titleText}>User</Text>
                </LinearGradient>
                <View style={styles.container}>
                    <Text style={styles.welcome}>
                        React Native Firebase Push Notification
                    </Text>

                    <View >

                        {(Platform.OS === 'android') && <Text>
                            Toggle Push Notification!
                        </Text>
                        }

                        {(Platform.OS === 'android') && <Switch onValueChange = {this.toggleSwitch}
                                                                value = {this.state.switchValue}
                        />
                        }
                        {(Platform.OS === 'android') && <Text>{this.state.switchValue ? 'Enabled' : 'Disabled'}
                        </Text>
                        }

                    </View>

                </View>
            </View>);
        }else {
            return (<View>
                <StatusBar style={styles.statusBarView} backgroundColor={"#4f8eff"}/>
                <LinearGradient
                    colors={['#4f8eff', '#37bafe']}
                    style={isIphoneX() ? styles.titleViewIphoneX : styles.titleViewIOS}>
                    <Text style={styles.titleText}>User</Text>
                </LinearGradient>
                <View style={styles.container}>
                    <Text style={styles.welcome}>
                        React Native Firebase Push Notification
                    </Text>

                    <View >
                        <Text>
                            Toggle Push Notification!
                        </Text>
                        <Switch onValueChange = {this.toggleSwitch}
                                value = {this.state.switchValue}/>

                        <Text>
                            {this.state.switchValue ? 'Enabled' : 'Disabled'}
                        </Text>

                    </View>

                </View>
            </View>)
        }
    }
}

const styles = StyleSheet.create({
    titleView:{
        width: 1 * Dimensions.get('window').width,
        height: 40,
        padding: 5,
        margin: 0,
        color: '#ffffff',
        backgroundColor: '#29c7ef',
    },
    titleViewIOS:{
        width: 1 * Dimensions.get('window').width,
        height: 55,
        padding: 5,
        paddingTop: 20,
        margin: 0,
        color: '#ffffff',
        flexDirection: 'row',
    },
    titleViewIphoneX: {
        width: 1 * Dimensions.get('window').width,
        height: 65,
        padding: 5,
        paddingTop: 30,
        margin: 0,
        color: '#ffffff',
        flexDirection: 'row',
    },
    titleText:{
        color: '#fff',
        fontSize: 20,
        marginLeft: 15
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        width: 1 * Dimensions.get('window').width,
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});