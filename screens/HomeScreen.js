import React from 'react';
import {
    Image,
    Alert,
    ListView,
    StyleSheet,
    Text,
    Button,
    Dimensions,
    Platform,
    TouchableOpacity,
    TouchableNativeFeedback,
    AlertIOS,
    StatusBar,
    View,
    ToastAndroid,
    NativeModules, PixelRatio,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from 'Geolocation';
import emitter from "../navigation/ev";
import { isIphoneX } from 'react-native-iphone-x-helper';

export default class HomeScreen extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        header: null
    });

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            cityName: 'position',
            dataSource: ds,
            data: [
                {"title" : "goods1", "price" : "100", "address" : "address1"},
                {"title" : "goods2", "price" : "200", "address" : "address2"},
                {"title" : "goods3", "price" : "300", "address" : "address3"},
                {"title" : "goods4", "price" : "400", "address" : "address4"},
                {"title" : "goods5", "price" : "500", "address" : "address5"},
                {"title" : "goods6", "price" : "600", "address" : "address6"},
                {"title" : "goods7", "price" : "700", "address" : "address7"},
                {"title" : "goods8", "price" : "800", "address" : "address8"},
                {"title" : "goods9", "price" : "900", "address" : "address9"},
                {"title" : "goods10", "price" : "1000", "address" : "address10"},
                {"title" : "goods11", "price" : "1100", "address" : "address11"},
                {"title" : "goods12", "price" : "1200", "address" : "address12"},
                {"title" : "goods13", "price" : "1300", "address" : "address13"},
                {"title" : "goods14", "price" : "1400", "address" : "address14"}
            ]
        }
    }

    componentDidMount(){
        this.eventEmitter = emitter.addListener("callMe",(msg)=>{
            this.setState({
                cityName: msg
            })
        });
    }
    // 组件销毁前移除事件监听
    componentWillUnmount(){
        emitter.removeListener(this.eventEmitter);
    }

        render() {
            if(Platform.OS === "android") {
                return (
                    <View style={styles.container}>
                        <StatusBar style={styles.statusBarView} backgroundColor={"#4f8eff"}/>
                        <LinearGradient
                            colors={['#4f8eff', '#37bafe']}
                            style={styles.titleView}>
                            <Text style={styles.titleText}>Home</Text>
                            <TouchableNativeFeedback onPress={() => this.getPosition()}>
                                <Text style={styles.cityName}>{this.state.cityName}</Text>
                            </TouchableNativeFeedback>
                            <Image source={require("../assets/images/map.png")} style={styles.btnSelect}></Image>
                        </LinearGradient>
                        <ListView
                            dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
                            renderRow={this.renderRow}
                        />
                    </View>
                );
            }else if(Platform.OS === "ios"){
                return (
                    <View style={styles.container}>
                        <StatusBar style={styles.statusBarView} backgroundColor={"#4f8eff"}/>
                        <LinearGradient
                            colors={['#4f8eff', '#37bafe']}
                            style={isIphoneX() ? styles.titleViewIphoneX : styles.titleViewIOS}>
                            <Text style={styles.titleText}>MainPage</Text>
                            <View onPress={() => this.getPosition()}>
                                <TouchableOpacity onPress={() => this.getPosition()}>
                                    <Text style={styles.cityName}>{this.state.cityName}</Text>
                                </TouchableOpacity>
                            </View>
                            <Image source={require("../assets/images/map.png")} style={styles.btnSelect}></Image>
                        </LinearGradient>
                        <ListView
                            dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
                            renderRow={this.renderRow}
                        />
                    </View>
                )
            }

        }


    renderRow(rowData) {
        return (
            <View style={styles.commodityViewItem}>
                <View style={styles.commodityPicView}>
                    <Image source={require('../assets/images/commodity.png')}
                           resizeMode="contain"
                           fadeDuration={0}
                           style={styles.commodityPic}/>
                </View>
                <View style={styles.commodityInfoView}>
                    <Text style={styles.commodityTitle}>
                        {rowData.title}
                    </Text>
                    <View style={styles.buyView}>
                        <Text style={styles.commodityPrice}>
                            {"$" + rowData.price}
                        </Text>
                        <TouchableOpacity>
                            <View style={styles.btnBuy}>
                                <LinearGradient
                                    start={{x: 0.0, y: 0}} end={{x: 1, y: 1.0}}
                                    style={styles.btnBuyLinear}
                                    colors={['#f6af04', '#f68104']}>
                                    <Text style={styles.textBuy}>Buys</Text>
                                </LinearGradient>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.commodityAddress}>
                        {rowData.address}
                    </Text>
                </View>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0',
        flexDirection: 'column',
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
        flexDirection: 'row',
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
        width: 0.7 * Dimensions.get('window').width,
        color: '#fff',
        fontSize: 20,
        marginLeft: 15,
        marginTop: 2,
    },
    cityName:{
        width: 0.15 * Dimensions.get('window').width,
        color: '#fff',
        marginTop: 3 * PixelRatio.get(),
    },
    btnSelect:{
        marginBottom: -3,
        width: 25,
        height: 25,
    },
    contentContainer: {
        paddingTop: 30,
    },
    commodityView:{
        flex: 1,
        marginTop: 10,
        flexWrap: 'nowrap',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    commodityViewItem:{
        flex: 1,
        height: 0.32 * Dimensions.get('window').width,
        marginTop: 0.015 * Dimensions.get('window').width,
        marginLeft: 0.015 * Dimensions.get('window').width,
        marginRight: 0.015 * Dimensions.get('window').width,
        backgroundColor: '#ffffff',
        alignSelf: 'stretch',
        alignItems: 'flex-start',
        flexWrap: 'nowrap',
        flexDirection: 'row',
    },
    commodityPicView:{
        width: 0.3 * Dimensions.get('window').width,
        height: 0.3 * Dimensions.get('window').width,
        marginTop: 0.01 * Dimensions.get('window').width,
        marginLeft: 0.01* Dimensions.get('window').width,
        borderWidth: 1,
        borderColor: '#ededed',
    },
    commodityPic:{
        width: 0.28 * Dimensions.get('window').width,
        height: 0.29 * Dimensions.get('window').width,
        marginLeft: 0.005 * Dimensions.get('window').width,
    },
    commodityInfoView:{
        flexDirection: 'column'
    },
    commodityTitle:{
        width: 0.64 * Dimensions.get('window').width,
        height: 0.06 * Dimensions.get('window').width,
        marginTop: 0.01 * Dimensions.get('window').width,
        marginLeft: 0.05 * Dimensions.get('window').width,
        fontSize: 20
    },
    commodityPrice:{
        width: 0.3 * Dimensions.get('window').width,
        height: 0.08 * Dimensions.get('window').width,
        color: '#ff9000',
        marginTop: 0.1 * Dimensions.get('window').width,
        marginLeft: 0.05 * Dimensions.get('window').width,
        fontSize: 18
    },
    commodityAddress:{
        width: 0.64 * Dimensions.get('window').width,
        height: 30,
        fontSize: 15,
        marginLeft: 10,
        color: '#b8b8b8'
    },
    btnBuy:{
        width: 0.26 * Dimensions.get('window').width,
        height: 0.08 * Dimensions.get('window').width,
        marginTop: 0.09 * Dimensions.get('window').width,
        marginLeft: 0.01 * Dimensions.get('window').width,
    },
    btnBuyLinear:{
        height: 0.08 * Dimensions.get('window').width,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
    },
    textBuy:{
        marginTop: 0.02 * Dimensions.get('window').width,
        color: '#fff',
        textAlign: 'center'
    },
    buyView:{
        flexDirection: 'row'
    }
});
