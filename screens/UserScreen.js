import React from 'react';
import {View, Text, StyleSheet, StatusBar, Platform, Switch, PixelRatio} from 'react-native';
import ReactFCM from '../src/module/ReactFCM';
import LinearGradient from 'react-native-linear-gradient';

export default class UserScreen extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        header: null
    });

    state = {
        switchValue: false
    }

    toggleSwitch = (value) => {
        this.setState({ switchValue: value })
        ReactFCM.toggleNotification(value)
    }

    componentDidMount = () => {
        if(Platform.OS === 'android')
        {
            ReactFCM.isNotificationEnabled((shouldShowNotification) => {
                this.setState({ switchValue : shouldShowNotification })
            })
        }
    }

    render() {
        return(
        <View>
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
        </View>
        );
    }
}

const styles = StyleSheet.create({
    titleView:{
        width: 360 * PixelRatio.get(),
        height: 40,
        padding: 5,
        margin: 0,
        color: '#ffffff',
        backgroundColor: '#F5FCFF',
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