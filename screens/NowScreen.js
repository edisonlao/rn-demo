import React from 'react';
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

export default class DrawScreen extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        header: null
    });

    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds,
            commoditys:[
                {"price" : "$100", "img": require("../imgs/now/now1.jpg")},
                {"price" : "$200", "img": require("../imgs/now/now2.jpg")},
                {"price" : "$300", "img": require("../imgs/now/now3.jpg")},
                {"price" : "$400", "img": require("../imgs/now/now4.jpg")},
                {"price" : "$500", "img": require("../imgs/now/now1.jpg")},
                {"price" : "$600", "img": require("../imgs/now/now2.jpg")},
                {"price" : "$700", "img": require("../imgs/now/now3.jpg")},
                {"price" : "$800", "img": require("../imgs/now/now4.jpg")},
                {"price" : "$900", "img": require("../imgs/now/now1.jpg")},
                {"price" : "$1000", "img": require("../imgs/now/now2.jpg")},
                {"price" : "$1100", "img": require("../imgs/now/now3.jpg")},
                {"price" : "$1200", "img": require("../imgs/now/now4.jpg")},
                {"price" : "$1300", "img": require("../imgs/now/now1.jpg")},
                {"price" : "$1400", "img": require("../imgs/now/now2.jpg")},
                {"price" : "$1500", "img": require("../imgs/now/now3.jpg")},
                {"price" : "$1600", "img": require("../imgs/now/now4.jpg")},
                {"price" : "$1700", "img": require("../imgs/now/now1.jpg")},
                {"price" : "$1800", "img": require("../imgs/now/now2.jpg")},
                {"price" : "$1900", "img": require("../imgs/now/now3.jpg")},
                {"price" : "$2000", "img": require("../imgs/now/now4.jpg")},
                {"price" : "$2100", "img": require("../imgs/now/now1.jpg")},
                {"price" : "$2200", "img": require("../imgs/now/now2.jpg")},
                {"price" : "$2300", "img": require("../imgs/now/now3.jpg")},
                {"price" : "$2400", "img": require("../imgs/now/now4.jpg")},
            ]
        }
    }

    render(){
        return  (
            <View>
                <ListView
                    automaticallyAdjustContentInsets={false}
                    contentContainerStyle={styles.grid}
                    dataSource={this.state.dataSource.cloneWithRows(this.state.commoditys)}
                    renderRow={this.renderCommoditys}
                    pageSize={3}
                />
            </View>
        )
    }

    renderCommoditys(rowData){
        return (
            <TouchableOpacity activeOpacity={0.5}>
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
    commodityItem:{
        flex:1,
        width: 0.32 * Dimensions.get('window').width,
        height: 0.317 * Dimensions.get('window').width,
        backgroundColor: '#ffffff',
        marginTop:  0.01 * Dimensions.get('window').width,
        marginLeft: 0.01 * Dimensions.get('window').width,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    commodity_background:{
        flex:1,
        padding: 0,
        backgroundColor:'rgba(0,0,0,0)',
    },
    commodity_price_view:{
        width: 0.2 * Dimensions.get('window').width,
        height: 0.06 * Dimensions.get('window').width,
        marginTop:  0.2 * Dimensions.get('window').width,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderBottomEndRadius: 100,
        borderTopEndRadius: 100,
    },
    commodity_price:{
        color: '#ffffff',
        marginLeft: 5
    }
});