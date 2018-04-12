import React from 'react';
import {
    Image,
    Platform,
    Alert,
    ListView,
    StyleSheet,
    Text,
    Button,
    TouchableNativeFeedback,
    StatusBar,
    View,
    ToastAndroid,
    NativeModules
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from 'Geolocation';
import {MonoText} from '../components/StyledText';

export default class HomeScreen extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        header: null
    });

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
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

    /** 获取地理位置（经纬度） */
    getPosition = (): string => {
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
                Alert.alert(location.coords.longitude + "/" + location.coords.latitude);
            },
            error => {
                Alert.alert("定位失败", "请打开GPS", [
                    {text:'打开GPS',onPress:()=> NativeModules.NewGPSModule.startActivityFromJS("com.myproject.modules.OpenGPSModule", "打开GPS")},
                    {text:'取消',onPress:()=>ToastAndroid.show('已取消',ToastAndroid.SHORT)}
                ])
            }
        );
    };

        render() {
        return (
            <View style={styles.container}>
                <StatusBar style={styles.statusBarView} backgroundColor={"#4f8eff"}/>
                <LinearGradient
                    colors={['#4f8eff', '#37bafe']}
                    style={styles.titleView}>
                    <Text style={styles.titleText}>Home</Text>
                    <TouchableNativeFeedback onPress={() => this.getPosition()}>
                        <Text style={styles.cityName}>番禺</Text>
                    </TouchableNativeFeedback>
                    <Image source={require("../assets/images/map.png")} style={styles.btnSelect}></Image>
                </LinearGradient>
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }

    renderRow(rowData){
        return(
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
                    <Text style={styles.commodityPrice}>
                        { "$" + rowData.price}
                    </Text>
                    <Button style={styles.btnBuy} title="Buy"></Button>
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
        width: 360,
        height: 40,
        padding: 5,
        margin: 0,
        color: '#ffffff',
        flexDirection: 'row'
    },
    cityName:{
        width: 30,
        color: '#fff',
        marginTop: 3,
    },
    titleText:{
        width: 270,
        color: '#fff',
        fontSize: 20,
        marginLeft: 15
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
        width: 350,
        marginTop: 10,
        flexWrap: 'nowrap',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    commodityViewItem:{
        width: 340,
        height: 150,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: '#ffffff',
        alignSelf: 'stretch',
        alignItems: 'flex-start',
        flexWrap: 'nowrap',
        flexDirection: 'row'
    },
    commodityPicView:{
        width:140,
        height: 140,
        marginTop: 5,
        marginLeft: 5,
        borderWidth: 1,
        borderColor: '#ededed',
    },
    commodityPic:{
       width: 130,
        height: 140,
        marginLeft: 5,
    },
    commodityInfoView:{
        flexDirection: 'column'
    },
    commodityTitle:{
        width: 180,
        height: 40,
        marginTop: 5,
        marginLeft: 10,
        fontSize: 20
    },
    commodityPrice:{
        width: 100,
        height: 30,
        color: '#ff9000',
        marginTop: 35,
        marginLeft: 10,
        fontSize: 18
    },
    commodityAddress:{
        width: 180,
        height: 30,
        fontSize: 15,
        marginLeft: 10,
        color: '#b8b8b8'
    },
    btnBuy:{
        width: 30,
        marginLeft: 30,
        backgroundColor: '#f68104'
    }
});
