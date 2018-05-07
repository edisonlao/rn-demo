import React,{Component} from 'react';
import {
    StyleSheet,
    Button,
    Text,
    View,
    StatusBar,
    Dimensions,
    ListView,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import {
    Actions
} from 'react-native-router-flux';
import Commodity from "./Commodity";

export default class CommodityList extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        header: null
    });

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            commodityId: 0,
            dataSource: ds,
            commoditys: [
                {"id": 1, "name": "Now1", "price": "$100", "img": require("../imgs/now/now1.jpg")},
                {"id": 2, "name": "Now2", "price": "$200", "img": require("../imgs/now/now2.jpg")},
                {"id": 3, "name": "Now3", "price": "$300", "img": require("../imgs/now/now3.jpg")},
                {"id": 4, "name": "Now4", "price": "$400", "img": require("../imgs/now/now4.jpg")},
                {"id": 5, "name": "Now5", "price": "$500", "img": require("../imgs/now/now1.jpg")},
                {"id": 6, "name": "Now6", "price": "$600", "img": require("../imgs/now/now2.jpg")},
                {"id": 7, "name": "Now7", "price": "$700", "img": require("../imgs/now/now3.jpg")},
                {"id": 8, "name": "Now8", "price": "$800", "img": require("../imgs/now/now4.jpg")},
                {"id": 9, "name": "Now9", "price": "$900", "img": require("../imgs/now/now1.jpg")},
                {"id": 10, "name": "Now10", "price": "$1000", "img": require("../imgs/now/now2.jpg")},
                {"id": 11, "name": "Now11", "price": "$1100", "img": require("../imgs/now/now3.jpg")},
                {"id": 12, "name": "Now12", "price": "$1200", "img": require("../imgs/now/now4.jpg")},
                {"id": 13, "name": "Now13", "price": "$1300", "img": require("../imgs/now/now1.jpg")},
                {"id": 14, "name": "Now14", "price": "$1400", "img": require("../imgs/now/now2.jpg")},
                {"id": 15, "name": "Now15", "price": "$1500", "img": require("../imgs/now/now3.jpg")},
                {"id": 16, "name": "Now16", "price": "$1600", "img": require("../imgs/now/now4.jpg")},
                {"id": 17, "name": "Now17", "price": "$1700", "img": require("../imgs/now/now1.jpg")},
                {"id": 18, "name": "Now18", "price": "$1800", "img": require("../imgs/now/now2.jpg")},
                {"id": 19, "name": "Now19", "price": "$1900", "img": require("../imgs/now/now3.jpg")},
                {"id": 20, "name": "Now20", "price": "$2000", "img": require("../imgs/now/now4.jpg")},
                {"id": 21, "name": "Now21", "price": "$2100", "img": require("../imgs/now/now1.jpg")},
                {"id": 22, "name": "Now22", "price": "$2200", "img": require("../imgs/now/now2.jpg")},
                {"id": 23, "name": "Now23", "price": "$2300", "img": require("../imgs/now/now3.jpg")},
                {"id": 24, "name": "Now24", "price": "$2400", "img": require("../imgs/now/now4.jpg")},
            ]
        }
    }

    showCommodity(commodity) {
        //传一个commodity对象过去
        Actions.commodity({'commodity': commodity});
    }

    render() {
        return (
            <View>
                <ListView
                    automaticallyAdjustContentInsets={false}
                    contentContainerStyle={styles.grid}
                    dataSource={this.state.dataSource.cloneWithRows(this.state.commoditys)}
                    renderRow={this.renderCommoditys.bind(this)}
                    pageSize={3}
                />
            </View>

        )
    }

    renderCommoditys(rowData) {
        return (
            <TouchableOpacity
                onPress={() => this.showCommodity(rowData)}
                activeOpacity={0.5}>
                <View style={styles.commodityItem}>
                    <ImageBackground
                        style={styles.commodity_background}
                        source={rowData.img}>
                        <View style={styles.commodity_price_view}>
                            <Text style={styles.commodity_price}>
                                {rowData.price}
                            </Text>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>

        )
    }
}
const styles = StyleSheet.create({
    commodityItem: {
        flex: 1,
        width: 0.32 * Dimensions.get('window').width,
        height: 0.317 * Dimensions.get('window').width,
        backgroundColor: '#ffffff',
        marginTop: 0.01 * Dimensions.get('window').width,
        marginLeft: 0.01 * Dimensions.get('window').width,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    commodity_background: {
        flex: 1,
        padding: 0,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    commodity_price_view: {
        width: 0.2 * Dimensions.get('window').width,
        height: 0.06 * Dimensions.get('window').width,
        marginTop: 0.2 * Dimensions.get('window').width,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderBottomEndRadius: 100,
        borderTopEndRadius: 100,
    },
    commodity_price: {
        color: '#ffffff',
        marginLeft: 5
    }
});