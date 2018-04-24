import React, { PropTypes } from 'react';
import ExampleScreen from '../components/draw/ExampleScreen';
import ShowBoard from '../components/draw/ShowBoard';
import {
    StyleSheet,
    Button,
    Text,
    View,
    StatusBar,
    Dimensions
} from 'react-native';
import LinearGradient from "react-native-linear-gradient";

export default class DrawScreen extends React.Component{
    static navigationOptions = ({navigation, screenProps}) => ({
        header: null
    });
    constructor(props){
        super(props);
        this.state = {
            player : 0
        }
        if (!window.location) {
            // App is running in simulator
            window.navigator.userAgent = 'ReactNative';
        }

// This must be below your `window.navigator` hack above

    }

    render(){
        const io = require('socket.io-client');
        let renderNode;
        switch (this.state.player) {
            case 1:
                renderNode =(
                    <View style={{backgroundColor:"#fff"}}>
                        <ExampleScreen/>
                    </View>
                )
                break;
            case 2:
                renderNode = <ShowBoard ready={()=>io()} />
                break;
            default:
                renderNode = (
                    <View>
                        <StatusBar style={styles.statusBarView} backgroundColor={"#4f8eff"}/>
                        <LinearGradient
                            colors={['#4f8eff', '#37bafe']}
                            style={styles.titleView}>
                            <Text style={styles.titleText}>Draw</Text>
                        </LinearGradient>
                        <View>
                            <View style={styles.btnDraw}>
                                <Button  onPress={()=>this.setState({player:1})} title="我来画"></Button>
                            </View>
                            <View style={styles.btnGuess}>
                                <Button  onPress={()=>this.setState({player:2})} title="我来猜"></Button>
                            </View>
                        </View>
                    </View>)
        }

        return (
            <View>{renderNode}</View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    titleView: {
        width: 1 * Dimensions.get('window').width,
        height: 40,
        padding: 5,
        margin: 0,
        color: '#ffffff',
        backgroundColor: '#29c7ef',
    },
    titleViewIOS: {
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
    titleText: {
        color: '#fff',
        fontSize: 20,
        marginLeft: 15
    },
    btnDraw:{
        width: 0.5 * Dimensions.get("window").width,
        marginTop: 0.35 * Dimensions.get("window").height,
        marginLeft: 0.25 * Dimensions.get("window").width,
    },
    btnGuess:{
        width: 0.5 * Dimensions.get("window").width,
        marginTop:10,
        marginLeft: 0.25 * Dimensions.get("window").width,
    }
});