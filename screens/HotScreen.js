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
} from 'react-native';

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
                {"title" : "IphoneX", "price" : "$100", "img": require("../imgs/hot/hot1.png")},
                {"title" : "Smartisan R1", "price" : "$200", "img": require("../imgs/hot/hot2.png")},
                {"title" : "XiaoMi Mix2S", "price" : "$300", "img": require("../imgs/hot/hot3.png")},
                {"title" : "Samsung S10", "price" : "$400", "img": require("../imgs/hot/hot4.png")},
                {"title" : "IphoneX", "price" : "$500", "img": require("../imgs/hot/hot1.png")},
                {"title" : "Smartisan R1", "price" : "$600", "img": require("../imgs/hot/hot2.png")},
                {"title" : "XiaoMi Mix2S", "price" : "$700", "img": require("../imgs/hot/hot3.png")},
                {"title" : "Samsung S10", "price" : "$800", "img": require("../imgs/hot/hot4.png")},
                {"title" : "IphoneX", "price" : "$900", "img": require("../imgs/hot/hot1.png")},
                {"title" : "Smartisan R1", "price" : "$1000", "img": require("../imgs/hot/hot2.png")},
                {"title" : "XiaoMi Mix2S", "price" : "$1100", "img": require("../imgs/hot/hot3.png")},
                {"title" : "Samsung S10", "price" : "$1200", "img": require("../imgs/hot/hot4.png")},
                {"title" : "IphoneX", "price" : "$1300", "img": require("../imgs/hot/hot1.png")},
                {"title" : "Smartisan R1", "price" : "$1400", "img": require("../imgs/hot/hot2.png")},
                {"title" : "XiaoMi Mix2S", "price" : "$1500", "img": require("../imgs/hot/hot3.png")},
                {"title" : "Samsung S10", "price" : "$1600", "img": require("../imgs/hot/hot4.png")},
                {"title" : "IphoneX", "price" : "$1700", "img": require("../imgs/hot/hot1.png")},
                {"title" : "Smartisan R1", "price" : "$1800", "img": require("../imgs/hot/hot2.png")},
                {"title" : "XiaoMi Mix2S", "price" : "$1900", "img": require("../imgs/hot/hot3.png")},
                {"title" : "Samsung S10", "price" : "$2000", "img": require("../imgs/hot/hot4.png")},
            ]
        }
    }

    render(){
        return  (
            <View>
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
                <ListView
                    automaticallyAdjustContentInsets={false}
                    contentContainerStyle={styles.grid}
                    dataSource={this.state.dataSource.cloneWithRows(this.state.commoditys)}
                    renderRow={this.renderCommoditys}
                    pageSize={2}
                />
            </View>
        )
    }

    renderCommoditys(rowData){
        return (
            <TouchableOpacity activeOpacity={0.5}>
                <View style={styles.commodityItem}>
                    <View style={styles.commodity_img}>
                        <Image
                            style={styles.commodity_background}
                            source={rowData.img}/>
                    </View>
                    <View style={styles.commodity_price_view}>
                        <Text style={styles.commodity_title}>
                            {rowData.title}
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