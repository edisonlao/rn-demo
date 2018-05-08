import React from 'react';
import Drawer from 'react-native-drawer'
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    TouchableHighlight,
    ListView,
    ImageBackground,
    Alert,
    Platform,
    AlertIOS,
    ToastAndroid,
    NativeModules,

} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import emitter from "../navigation/ev";
import Geolocation from 'Geolocation';
import SellScreen from '../screens/SellScreen';
import TabNavigator from '../navigation/TabNavigator';
import {
    Actions
} from 'react-native-router-flux';

export default class StoreNavigator extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        header: null
    });

    state = {
        activeTab: 'NOW',
    };

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds,
            tabScreenIndex: 1,
            mainScreenIndex: 1,
            position: null,
            userFunction: [
                {"icon": require('../imgs/user_home.png'), "function": "home"},
                {"icon": require('../imgs/user_contract.png'), "function": "contract"},
                {"icon": require('../imgs/user_favorites.png'), "function": "favorites"},
                {"icon": require('../imgs/user_commodity.png'), "function": "commodity"},
                {"icon": require('../imgs/user_package.png'), "function": "package"},
                {"icon": require('../imgs/user_setting.png'), "function": "setting"},
                {"icon": require('../imgs/user_help.png'), "function": "help"},
                {"icon": require('../imgs/user_email.png'), "function": "email"},
                {"icon": require('../imgs/user_position.png'), "function": "position"},
            ],
        }
    }

    closeControlPanel = () => {
        this._drawer.close()
    };
    openControlPanel = () => {
        this._drawer.open()
    };

    showSellScreen() {
        //传一个commodity对象过去
        Actions.sellscreen();
    }

    render() {
        let renderTabScreen = <TabNavigator/>;
        let renderMainScreen = (
                <Drawer
                    side="left" //抽屉方向 top／left／right／bottom
                    dragging
                    open={false}//默认是否打开抽屉
                    tapToClose={true}//点击内容处 会关闭抽屉
                    type='displace' //抽屉出现的方式：overlay：抽屉覆盖内容 static:抽屉一只在内容后面 打开的时内容会滑动，displace：不会覆盖的 进出
                    openDrawerOffset={0.3} // 抽屉占整个屏幕的百分比（1-0.6=0.4）
                    closedDrawerOffset={0}//关闭抽屉后 抽屉在屏幕中的显示比例
                    styles={drawerStyles}//抽屉样式，背景色 透明度，阴影啥的
                    ref={(ref) => this._drawer = ref}
                    content={
                        <View style={{flex: 1, backgroundColor: '#a2a2a2'}}>
                            <StatusBar backgroundColor={"#ffffff"}/>

                            <ImageBackground
                                style={styles.user_list_background}
                                source={require('../imgs/user_background.jpg')}>
                                <View style={styles.user}>
                                    <Image source={require('../imgs/user_profile.png')}
                                           size={28}
                                           style={styles.userProfile}
                                           onPress={() => {
                                               this.openControlPanel()
                                           }}>

                                    </Image>
                                    <TouchableOpacity>
                                        <Text style={styles.btnLogin}>User Login</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.user_listView}>
                                    <ListView
                                        dataSource={this.state.dataSource.cloneWithRows(this.state.userFunction)}
                                        renderRow={this.renderUser.bind(this)}
                                    />
                                </View>
                            </ImageBackground>
                        </View>
                    }
                >
                    <View style={Platform.OS === 'android' ? styles.mainHeader : styles.mainHeader_ios}>
                        <TouchableOpacity onPress={() => {
                            this.openControlPanel()
                        }}>
                            <Image source={require('../imgs/user_list.png')}
                                   style={styles.show_side_menu}
                                   onPress={() => {
                                       this.openControlPanel()
                                   }}>
                            </Image>
                        </TouchableOpacity>
                        <Text style={styles.logo}>Sendroid</Text>
                        <TouchableOpacity>
                            <Image source={require('../imgs/icon_search.png')} style={styles.icon_search}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('../imgs/icon_ring.png')} style={styles.icon_ring}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('../imgs/icon_true.png')} style={styles.icon_true}/>
                        </TouchableOpacity>
                    </View>

                    {
                        renderTabScreen
                    }

                    <ActionButton
                        buttonColor="rgba(231,76,60,1)"
                        size={0.23 * Dimensions.get('window').width}
                        position={"right"}
                        offsetX={-0.03 * Dimensions.get('window').width}
                        offsetY={-0.001 * Dimensions.get('window').height}
                        onPress={() => this.showSellScreen()}
                        renderIcon={() => (
                            <View style={styles.actionButtonView}>
                                <Text style={styles.actionButtonText}>Sell</Text>
                                <Icon name="md-camera" style={styles.actionButtonIcon}/>
                            </View>
                        )}
                    />
                </Drawer>
        );

        return (
            renderMainScreen
        );
    }

    renderUser(rowData) {
        let userView;
        if(rowData.function === 'position'){
            userView = (
                <TouchableOpacity
                    onPress = {() => this.getPosition()}
                    activeOpacity={0.5}>
                    <View style={styles.user_list_item}>
                        <Image
                            source={rowData.icon}
                            style={styles.user_list_item_icon}>
                        </Image>
                        <Text style={styles.user_list_item_text}>
                            {rowData.function} {this.state.position}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        }else {
            userView = (
                <TouchableOpacity
                    activeOpacity={0.5}>
                    <View style={styles.user_list_item}>
                        <Image
                            source={rowData.icon}
                            style={styles.user_list_item_icon}>
                        </Image>
                        <Text style={styles.user_list_item_text}>
                            {rowData.function}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return (userView);
    }

    /** 获取地理位置（经纬度） */
    getPosition = (): string => {
        this.setState({cityName: '定位中..'});
        /** 获取地理位置 */
        Geolocation.getCurrentPosition(
            location => {
                //可以获取到的数据
                var result = "速度：" + location.coords.speed +
                    "\n经度：" + location.coords.longitude +
                    "\n纬度：" + location.coords.latitude +
                    "\n准确度：" + location.coords.accuracy +
                    "\n行进方向：" + location.coords.heading +
                    "\n海拔：" + location.coords.altitude +
                    "\n海拔准确度：" + location.coords.altitudeAccuracy +
                    "\n时间戳：" + location.timestamp;
                let locationUrl = 'http://restapi.amap.com/v3/geocode/regeo?';
                locationUrl += "location="
                locationUrl += location.coords.longitude;
                locationUrl += ",";
                locationUrl += location.coords.latitude;
                if(Platform.OS === "ios"){
                    locationUrl += "&key=2493ecdfa26c984c44b34943b4845b18";
                }else if(Platform.OS === "android") {
                    locationUrl += "&key=2493ecdfa26c984c44b34943b4845b18";
                }
                const init = {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },

                };
                fetch(locationUrl, init)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        if(responseJson.regeocode.addressComponent.city.toString() === ""){
                            this.setState({
                                cityName: '番禺'
                            })
                        }else {
                            this.setState({
                                cityName: responseJson.regeocode.addressComponent.city,
                                position: responseJson.regeocode.addressComponent.city,
                            });
                        }
                        emitter.emit("cityName", this.state.cityName);
                        emitter.emit("cityIndex", 0);
                        if(Platform.OS === "android") {
                            NativeModules
                                .NewGPSModule
                                .startActivityFromJS("com.myproject.modules.OpenGPSModule", "manual", this.state.cityName);
                        }
                    })
                    .catch(e => {Alert.alert('error',`${e}`)});

            },
            error => {
                if(Platform.OS === "android") {
                    Alert.alert("定位失败", "请打开GPS", [
                        {
                            text: '打开GPS',
                            onPress: () => NativeModules.NewGPSModule.startActivityFromJS("com.myproject.modules.OpenGPSModule", "setting", "打开GPS")
                        },
                        {text: '取消', onPress: () => ToastAndroid.show('已取消', ToastAndroid.SHORT)}
                    ])
                }else if(Platform.OS === "ios"){
                    AlertIOS.alert("定位失败", "请打开GPS", [
                        {
                            text: '打开GPS',
                            onPress: () => AlertIOS.alert("TODO", "IOS连接")
                        },
                        {text: '取消', onPress: () => ToastAndroid.show('已取消', ToastAndroid.SHORT)}
                    ])
                }
            }
        );
    };
}

const drawerStyles = {
    drawer: {flex: 1, backgroundColor: '#fff', shadowColor: '#fff', opacity: 1, shadowRadius: 3},
};

const styles = StyleSheet.create({
    mainHeader: {
        width: 1 * Dimensions.get('window').width,
        height: 0.06 * Dimensions.get('window').height,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
    },
    mainHeader_ios: {
        width: 1 * Dimensions.get('window').width,
        height: 0.09 * Dimensions.get('window').height,
        paddingTop: 0.03 * Dimensions.get('window').height,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
    },
    show_side_menu: {
        width: 0.03 * Dimensions.get('window').height,
        height: 0.03 * Dimensions.get('window').height,
        marginLeft: 0.06 * Dimensions.get('window').width,
        marginTop: 0.015 * Dimensions.get('window').height,
    },
    logo: {
        width: 0.3 * Dimensions.get('window').width,
        height: 0.04 * Dimensions.get('window').height,
        marginTop: 0.01 * Dimensions.get('window').height,
        fontSize: 0.03 * Dimensions.get('window').height,
        marginLeft: 0.06 * Dimensions.get('window').width,
        color: '#ee5a5a',
    },
    icon_search: {
        width: 0.03 * Dimensions.get('window').height,
        height: 0.03 * Dimensions.get('window').height,
        marginLeft: 0.23 * Dimensions.get('window').width,
        marginTop: 0.015 * Dimensions.get('window').height,
    },
    icon_ring: {
        width: 0.03 * Dimensions.get('window').height,
        height: 0.03 * Dimensions.get('window').height,
        marginLeft: 0.05 * Dimensions.get('window').width,
        marginTop: 0.015 * Dimensions.get('window').height,
    },
    icon_true: {
        width: 0.03 * Dimensions.get('window').height,
        height: 0.03 * Dimensions.get('window').height,
        marginLeft: 0.05 * Dimensions.get('window').width,
        marginTop: 0.015 * Dimensions.get('window').height,
    },
    user: {
        width: 1 * Dimensions.get('window').width,
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.3)',
        height: 90,
    },
    user_listView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    user_list_item: {
        flex: 1,
        height: 0.08 * Dimensions.get('window').height,
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.2)'
    },
    user_list_item_icon: {
        width: 0.04 * Dimensions.get('window').height,
        height: 0.04 * Dimensions.get('window').height,
        marginTop: 0.02 * Dimensions.get('window').height,
        marginLeft: 0.06 * Dimensions.get('window').width,
    },
    user_list_item_text: {
        width: 0.2 * Dimensions.get('window').width,
        marginTop: 0.023 * Dimensions.get('window').height,
        marginLeft: 0.06 * Dimensions.get('window').width,
        fontSize: 15,
        color: '#ffffff',
    },
    user_list_background: {
        flex: 1,
        padding: 0,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    userProfile: {
        width: 50,
        marginTop: 40,
        height: 50,
        marginLeft: 20
    },
    btnLogin: {
        width: 400,
        marginTop: 50,
        height: 50,
        marginLeft: 10,
        fontSize: 20,
        color: '#ffffff'
    },
    tabList: {
        height: 0.05 * Dimensions.get('window').height,
        backgroundColor: '#ffffff',
    },
    tabItem: {
        width: 0.2 * Dimensions.get('window').width,
        height: 0.04 * Dimensions.get('window').height,
        marginTop: 0.005 * Dimensions.get('window').height,
        marginLeft: 0.01 * Dimensions.get('window').width,
        textAlign: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#ffffff',
    },
    tabItemActive: {
        width: 0.2 * Dimensions.get('window').width,
        height: 0.04 * Dimensions.get('window').height,
        marginTop: 0.005 * Dimensions.get('window').height,
        marginLeft: 0.01 * Dimensions.get('window').width,
        textAlign: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#ee5a5a'
    },
    tabItemText: {
        textAlign: 'center',
        color: '#808080',
    },
    tabItemTextActive: {
        textAlign: 'center',
        color: '#ee5a5a',
    },
    actionButtonView: {
        width: null,
        height: null
    },
    actionButtonText: {
        color: '#ffffff',
        textAlign: 'center',
    },
    actionButtonIcon: {
        fontSize: 0.13 * Dimensions.get('window').width,
        color: '#ffffff',
        textAlign: 'center',
    }
});
