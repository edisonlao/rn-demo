import React from 'react';
import {
    StyleSheet,
    Button,
    Text,
    View,
    StatusBar,
    Dimensions,
    ListView,
    Image,
    TouchableOpacity,
    ScrollView,
    ImageBackground
} from 'react-native';
import {
    Actions
} from 'react-native-router-flux';

export default class HotScreen extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        header: null
    });

    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds,
            commoditys:[
                {"id": 1, "name" : "IphoneX", "price" : "$100", "img": require("../imgs/hot/hot1.png")},
                {"id": 2, "name" : "Smartisan R1", "price" : "$200", "img": require("../imgs/hot/hot2.png")},
                {"id": 3, "name" : "XiaoMi Mix2S", "price" : "$300", "img": require("../imgs/hot/hot3.png")},
                {"id": 4, "name" : "Samsung S10", "price" : "$400", "img": require("../imgs/hot/hot4.png")},
                {"id": 5, "name" : "IphoneX", "price" : "$500", "img": require("../imgs/hot/hot1.png")},
                {"id": 6, "name" : "Smartisan R1", "price" : "$600", "img": require("../imgs/hot/hot2.png")},
                {"id": 7, "name" : "XiaoMi Mix2S", "price" : "$700", "img": require("../imgs/hot/hot3.png")},
                {"id": 8, "name" : "Samsung S10", "price" : "$800", "img": require("../imgs/hot/hot4.png")},
                {"id": 9, "name" : "IphoneX", "price" : "$900", "img": require("../imgs/hot/hot1.png")},
                {"id": 10, "name" : "Smartisan R1", "price" : "$1000", "img": require("../imgs/hot/hot2.png")},
                {"id": 11, "name" : "XiaoMi Mix2S", "price" : "$1100", "img": require("../imgs/hot/hot3.png")},
                {"id": 12, "name" : "Samsung S10", "price" : "$1200", "img": require("../imgs/hot/hot4.png")},
                {"id": 13, "name" : "IphoneX", "price" : "$1300", "img": require("../imgs/hot/hot1.png")},
                {"id": 14, "name" : "Smartisan R1", "price" : "$1400", "img": require("../imgs/hot/hot2.png")},
                {"id": 15, "name" : "XiaoMi Mix2S", "price" : "$1500", "img": require("../imgs/hot/hot3.png")},
                {"id": 16, "name" : "Samsung S10", "price" : "$1600", "img": require("../imgs/hot/hot4.png")},
                {"id": 17, "name" : "IphoneX", "price" : "$1700", "img": require("../imgs/hot/hot1.png")},
                {"id": 18, "name" : "Smartisan R1", "price" : "$1800", "img": require("../imgs/hot/hot2.png")},
                {"id": 19, "name" : "XiaoMi Mix2S", "price" : "$1900", "img": require("../imgs/hot/hot3.png")},
                {"id": 20, "name" : "Samsung S10", "price" : "$2000", "img": require("../imgs/hot/hot4.png")},
            ]
        }
    }

    showCommodity(commodity) {
        //传一个commodity对象过去
        Actions.commodity({'commodity': commodity});
    }

    render(){
        return  (
            <ScrollView>
                <View style={styles.hot_title_view}>
                    <View style={styles.hot_title}>
                        <Text style={styles.title_bold}>
                            Sendroid
                        </Text>
                        <Text style={styles.title_lighter}>
                            STORE
                        </Text>
                    </View>
                </View>
                <ImageBackground
                    source={require('../imgs/hot/hot0.png')}
                    style={styles.poster}>
                    <View style={styles.poster_info}>
                        <Text style={styles.poster_info_text}>Ten years of grinding a sword</Text>
                    </View>
                </ImageBackground>
                <ListView
                    automaticallyAdjustContentInsets={false}
                    contentContainerStyle={styles.grid}
                    dataSource={this.state.dataSource.cloneWithRows(this.state.commoditys)}
                    renderRow={this.renderCommoditys.bind(this)}
                    pageSize={2}
                />
            </ScrollView>
        )
    }

    renderCommoditys(rowData){
        return (
            <TouchableOpacity
                onPress={() => this.showCommodity(rowData)}
                activeOpacity={0.5}>
                <View style={styles.commodityItem}>
                    <View style={styles.commodity_img}>
                        <Image
                            style={styles.commodity_background}
                            source={rowData.img}/>
                    </View>
                    <View style={styles.commodity_price_view}>
                        <Text style={styles.commodity_title}>
                            {rowData.name}
                        </Text>
                        <Text style={styles.commodity_price}>
                            {rowData.price}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    hot_title_view:{
        height: 0.1 * Dimensions.get('window').height,
        backgroundColor: '#ee5a5a',
    },
    poster:{
        height: 0.3 * Dimensions.get('window').height,
        backgroundColor: '#ffffff',
    },
    poster_info:{
        width: 1 * Dimensions.get('window').width,
        height: 0.07 * Dimensions.get('window').height,
        marginTop: 0.23 * Dimensions.get('window').height,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    poster_info_text:{
        fontSize: 0.03 * Dimensions.get('window').height,
        marginTop: 0.01 * Dimensions.get('window').height,
        marginLeft: 0.05 * Dimensions.get('window').width,
        color: '#ffffff',
        textShadowOffset:{width:1,height:1},
        textShadowRadius:5,
        textShadowColor:'rgba(0,0,0,0.5)'
    },
    hot_title:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 0.03 * Dimensions.get("window").height
    },
    title_bold:{
        fontWeight: 'bold',
        fontSize: 0.03 * Dimensions.get('window').height,
        color:'#ffffff',
    },
    title_lighter:{
        fontWeight: '100',
        fontSize: 0.03 * Dimensions.get('window').height,
        marginLeft: 5,
        color:'#ffffff',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    commodityItem:{
        width: 0.48 * Dimensions.get("window").width,
        height: 0.4 * Dimensions.get("window").height,
        backgroundColor: '#ffffff',
        marginLeft: 0.013 * Dimensions.get("window").width,
        marginTop: 0.013 * Dimensions.get("window").width,
    },
    commodity_img:{
        height: 0.3 * Dimensions.get("window").height,
    },
    commodity_background:{
        width: 0.48 * Dimensions.get("window").width,
        height: 0.3 * Dimensions.get("window").height,
        resizeMode: 'contain',
        padding: 0,
        backgroundColor:'rgba(0,0,0,0)',
    },
    commodity_price_view:{
        width: 0.48 * Dimensions.get("window").width,
        height: 0.1 * Dimensions.get("window").height,
    },
    commodity_title:{
        width: 0.48 * Dimensions.get("window").width,
        height: 0.05 * Dimensions.get("window").height,
        marginLeft: 10,
    },
    commodity_price:{
        width: 0.48 * Dimensions.get("window").width,
        height: 0.04 * Dimensions.get("window").height,
        marginLeft: 10,
        fontSize: 0.03 * Dimensions.get("window").height,
        color: '#000000'
    }
});