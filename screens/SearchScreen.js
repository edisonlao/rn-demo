import React from 'react';
import {
    View,
    ListView,
    StyleSheet,
    Button,
    Text,
    Image,
    Alert,
    StatusBar,
    Platform,
    TouchableOpacity,
    TouchableNativeFeedback,
    NativeModules, PixelRatio, Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import emitter from "../navigation/ev"
import {isIphoneX} from "react-native-iphone-x-helper";

export default class SearchScreen extends React.Component {

    static navigationOptions = ({navigation, screenProps}) => ({
        header: null
    });

    state = {
        defaultDisplay: 'block',
        activeDisplay: 'none',
        activeRadioNum: 2,
        activeRadioName: '',
        cityName: ''
    };

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds,
            data: [
                {"city":"番禺", "index":1}, {"city":"上海", "index":2}, {"city":"北京", "index":3},
                {"city":"东京", "index":4}, {"city":"纽约", "index":5}, {"city":"巴黎", "index":6},
                {"city":"马德里", "index":7}, {"city":"慕尼黑", "index":8}, {"city":"洛杉矶", "index":9},
                {"city":"都灵", "index":10}, {"city":"广州市", "index":11}, {"city":"深圳", "index":12},
                {"city":"悉尼", "index":13}, {"city":"香港", "index":14}, {"city":"澳门", "index":15},
                {"city":"台湾", "index":16}, {"city":"曼谷", "index":17}, {"city":"普吉岛", "index":18},
            ]
        }
    }

    componentDidMount(){
        this.eventEmitter = emitter.addListener("cityName",(msg)=>{
            this.setState({
                activeRadioName: msg
            })
        });
        this.eventEmitter = emitter.addListener("cityIndex",(msg)=>{
            this.setState({
                activeRadioNum: msg
            })
        });
    }
    // 组件销毁前移除事件监听
    componentWillUnmount(){
        emitter.removeListener(this.eventEmitter);
    }

    radioActive = (index, cityName) =>{
        this.setState({
            activeRadioNum:parseInt(index),
            activeRadioName:cityName
        });
        if(Platform.OS === 'android') {
            NativeModules.NewGPSModule.startActivityFromJS("com.myproject.modules.OpenGPSModule", "manual", cityName)
        }
        emitter.emit("callMe", cityName);
    };

    render() {
        if(Platform.OS === 'android') {
            return (
                <View style={styles.container}>
                    <StatusBar style={styles.statusBarView} backgroundColor={"#4f8eff"}/>
                    <LinearGradient
                        colors={['#4f8eff', '#37bafe']}
                        style={styles.titleView}>
                        <Text style={styles.titleText}>Search</Text>
                    </LinearGradient>
                    <View>
                        <Text>当前城市: {this.state.activeRadioName}</Text>
                    </View>
                    <ListView dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
                              renderRow={this.renderRow.bind(this)}>
                    </ListView>
                </View>
            );
        }else {
            return (
                <View style={styles.container}>
                    <LinearGradient
                        colors={['#4f8eff', '#37bafe']}
                        style={isIphoneX() ? styles.titleViewIphoneX : styles.titleViewIOS}>
                        <Text style={styles.titleText}>Search</Text>
                    </LinearGradient>
                    <View>
                        <Text>当前城市: {this.state.activeRadioName}</Text>
                    </View>
                    <ListView dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
                              renderRow={this.renderRow.bind(this)}>

                    </ListView>

                </View>
            );
        }
    }

    renderRow(rowData){
        let iconDefault, iconActive;
        iconDefault = require("../assets/images/radioDefault.png");
        iconActive = require("../assets/images/radioActive.png");
        if(Platform.OS === 'android') {
            return (
                <TouchableNativeFeedback
                    activeOpacity={0.6}
                    onPress={() => this.radioActive(rowData.index, rowData.city)}>
                    <View style={styles.cityViewItem}>
                        <Image style={styles.btnMap} source={require("../assets/images/mapDefault.png")}/>
                        <Text style={styles.cityText}>{rowData.city}</Text>
                        <TouchableOpacity onPress={() => this.radioActive(rowData.index, rowData.city)}>
                            <Image style={styles.btnRadio} source={
                                this.state.activeRadioNum === rowData.index ||
                                this.state.activeRadioName === rowData.city ? iconActive : iconDefault}/>
                        </TouchableOpacity>
                    </View>
                </TouchableNativeFeedback>
            );
        }else {
            return (
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => this.radioActive(rowData.index, rowData.city)}>
                    <View style={styles.cityViewItem}>
                        <Image style={styles.btnMap} source={require("../assets/images/mapDefault.png")}/>
                        <Text style={styles.cityText}>{rowData.city}</Text>
                        <TouchableOpacity onPress={() => this.radioActive(rowData.index, rowData.city)}>
                            <Image style={styles.btnRadio} source={
                                this.state.activeRadioNum === rowData.index ||
                                this.state.activeRadioName === rowData.city ? iconActive : iconDefault}/>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            );
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    statusBarView:{
        backgroundColor: '#4f8eff'
    },
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
    cityViewItem:{
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        marginTop: 0.015 * Dimensions.get('window').width,
        marginLeft: 0.015 * Dimensions.get('window').width,
        marginRight: 0.015 * Dimensions.get('window').width,
        padding: 0,
        textAlign: 'center',
        flexDirection: 'row',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
    },
    cityText:{
        width: 0.75 * Dimensions.get('window').width,
        marginTop: 18,
        marginLeft: 0.02 * Dimensions.get('window').width,
        color: '#bebfc0'
    },
    btnMap:{
        marginTop: 15,
        marginLeft: 0.03 * Dimensions.get('window').width,
        width: 0.05 * Dimensions.get('window').width,
        height: 20,
    },
    btnRadio:{
        marginTop: 15,
        marginLeft: 10,
        width: 20,
        height: 20,
    }
});
