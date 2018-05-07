import React, {Component} from 'react';
import {
    StyleSheet,
    Button,
    Text,
    View,
    Image,
    StatusBar,
    Dimensions,
    ListView,
    TouchableOpacity,
    Modal,
    ScrollView
} from 'react-native';
import {
    Actions
} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Commodity extends Component {

    state = {
        commodityId: 0,
    };

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let ds_information = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds,
            dataSourceInfomation: ds_information,
            commodity: {
                id: null,
                name: null,
                price: null,
                img: null,
            },
            list2:[
                {"title" : "Type", "body" : "T-shirt"},
                {"title" : "Size", "body" : "XL"},
                {"title" : "Brand", "body" : "NIKE"},
                {"title" : "Status", "body" : "unused"},
                {"title" : "Freight", "body" : "Free shipping"},
                {"title" : "Express", "body" : "DHL"},
                {"title" : "Address", "body" : "Nagoya"},
                {"title" : "Times", "body" : "2-3 Days"},
            ],
            animationType: 'none',  //none slide fade
            modalVisible: true,  //模态场景是否可见
            transparent: true, //是否透明显示
        };
    }

    componentDidMount() {
        //这里获取从CommodityList传递过来的对象: commodity
        this.setState({
            commodity: this.props.commodity,
        });
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => {
                        Actions.pop()
                    }}>
                        <View style={styles.tab_return_view}>
                            <Image
                                style={styles.tab_return_icon}
                                source={require('../imgs/icon_back.png')}/>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.tab_title_view}>
                        <Text style={styles.tab_title}>
                            Commodity
                        </Text>
                    </View>
                    <TouchableOpacity>
                        <View style={styles.tab_ship_view}>
                            <Image
                                style={styles.tab_skip_icon}
                                source={require('../imgs/icon_skip.png')}/>
                        </View>
                    </TouchableOpacity>
                </View>
                {/********************************分割线**********************************/}
                <ScrollView
                    ref="scrollView"
                    style={styles.commodity_info_view}>
                    <Image
                        style={styles.commodity_img}
                        source={this.state.commodity.img}/>
                    <View style={styles.commodity_name_view}>
                        <Text style={styles.commodity_name}>
                            {this.state.commodity.name}
                            2018 Just Watch Me Size:XS\S\M\L\XL\XXL For Sale
                        </Text>
                    </View>
                    <View style={styles.commodity_contract}>
                        <View style={styles.commodity_like}>
                            <Icon name="md-heart-outline" style={styles.commodity_icon}/>
                            <Text style={styles.commodity_icon_text}>
                                Like
                            </Text>
                        </View>
                        <View style={styles.commodity_comment}>
                            <Icon name="md-chatboxes" style={styles.commodity_icon}/>
                            <Text style={styles.commodity_icon_text}>
                                Comment
                            </Text>
                        </View>
                        <View style={styles.commodity_flag_view}>
                            <Icon name="md-flag" style={styles.commodity_flag}/>
                        </View>
                    </View>
                    <View style={{marginTop: 10,padding: 10}}>
                        <Text>
                            Commodity Description
                        </Text>
                    </View>
                    <View style={styles.commodity_description}>
                        <Text>
                            You can add all eligible promotional items and gifts to your shopping cart in two ways:
                        </Text>
                        <Text>
                            A. click the purchase button on each product page
                        </Text>
                        <Text>
                            B. click on the promotion page while adding shopping cart (if applicable).
                        </Text>
                        <Text>
                            Promotion benefits and concessions will not be displayed on the final order confirmation page.
                        </Text>
                        <Text>
                            After your order is processed, the seller who provides the promotion will send you a cash coupon by mail.
                        </Text>
                        <Text>
                            You will not be able to enjoy the promotion if you do not buy the goods in your shopping cart or cancel some of the goods during the sales period.
                        </Text>
                        <Text>
                            If you return any merchandise in the sales promotion, the seller has the right to cancel the offer.
                        </Text>
                    </View>
                    <View style={{marginTop: 10,padding: 10}}>
                        <Text>
                            Commodity information
                        </Text>
                    </View>
                    {
                        this.renderList(this.state.list2)
                    }
                    <View style={{marginTop: 10,padding: 10}}>
                        <Text>
                            Seller
                        </Text>
                    </View>
                    <View style={styles.commodity_seller}>
                        <View>
                            <Image
                                style={styles.commodity_seller_icon}
                                source={require('../imgs/user_profile.png')}/>
                        </View>
                    </View>
                    <View style={{height: 0.12 * Dimensions.get('window').height}}>

                    </View>
                </ScrollView>
                {/********************************分割线**********************************/}
                <View style={styles.buyView}>
                    <Text style={styles.price}>
                        {this.state.commodity.price}
                        </Text>
                    <Text style={styles.delivery}>
                        Delivery to
                    </Text>
                    <TouchableOpacity>
                        <View style={styles.buyBtn}>
                            <Text style={styles.buyBtnText}>
                                Buy
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

    renderList(list){
        return list.map( item => this.renderInformation(item) );
    }

    renderInformation(rowData){
        return (
            <View style={styles.commodity_information}>
                <View style={styles.commodity_information_title}>
                    <Text>
                        {rowData.title}
                    </Text>
                </View>
                <View style={styles.commodity_information_body}>
                    <Text>
                        {rowData.body}
                    </Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: 1 * Dimensions.get('window').width,
        height: 0.12 * Dimensions.get('window').width,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
    },
    tab_return_view: {
        width: 0.12 * Dimensions.get('window').width,
        height: 0.12 * Dimensions.get('window').width,
    },
    tab_return_icon: {
        width: 0.06 * Dimensions.get('window').width,
        height: 0.06 * Dimensions.get('window').width,
        marginLeft: 0.06 * Dimensions.get('window').width,
        marginTop: 0.03 * Dimensions.get('window').width,
    },
    tab_title_view: {
        width: 0.74 * Dimensions.get('window').width,
        height: 0.12 * Dimensions.get('window').width,
        marginTop: 0.03 * Dimensions.get('window').width,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    tab_title: {
        color: '#000000',
        fontSize: 0.05 * Dimensions.get('window').width,
    },
    tab_ship_view: {
        width: 0.12 * Dimensions.get('window').width,
        height: 0.12 * Dimensions.get('window').width,
    },
    tab_skip_icon: {
        width: 0.06 * Dimensions.get('window').width,
        height: 0.06 * Dimensions.get('window').width,
        marginLeft: 0.02 * Dimensions.get('window').width,
        marginTop: 0.03 * Dimensions.get('window').width,
    },
    commodity_info_view: {
        margin: 0,
        padding: 0,
        width: 1 * Dimensions.get('window').width,
        height: 0.9 * Dimensions.get('window').height,
    },
    commodity_img:{
        width: 1 * Dimensions.get('window').width,
        height: 0.6 * Dimensions.get('window').height,
        resizeMode: 'contain',
        padding: 0,
        margin: 0,
        backgroundColor:'#ffffff',

    },
    commodity_name_view:{
        width: 1 * Dimensions.get('window').width,
        height: 0.12 * Dimensions.get('window').height,
        backgroundColor: '#ffffff',
        padding: 20,
        paddingTop: 10
    },
    commodity_name:{
        fontSize: 0.03 * Dimensions.get('window').height,
        color: '#000000',
    },
    buyView: {
        width: 1 * Dimensions.get('window').width,
        height: 0.15 * Dimensions.get('window').height,
        backgroundColor: 'rgba(0,0,0,0.7)',
        position: 'absolute',
        marginTop: 0.85 * Dimensions.get('window').height,
        flexDirection: 'row',
    },
    price: {
        width: 0.36 * Dimensions.get('window').width,
        color: '#ffffff',
        fontSize: 0.05 * Dimensions.get('window').height,
        marginTop: 0.02 * Dimensions.get('window').height,
        marginLeft: 0.02 * Dimensions.get('window').width,
    },
    delivery: {
        width: 0.3 * Dimensions.get('window').width,
        fontSize: 0.02 * Dimensions.get('window').height,
        marginTop: 0.05 * Dimensions.get('window').height,
        marginLeft: 0.005 * Dimensions.get('window').width,
        color: '#ffffff'
    },
    buyBtn:{
        width: 0.3 * Dimensions.get('window').width,
        height: 0.095 * Dimensions.get('window').height,
        marginTop: 0.01 * Dimensions.get('window').height,
        marginRight: 0.005 * Dimensions.get('window').height,
        textAlign: 'right',
        backgroundColor: '#ee5a5a',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 5,
    },
    buyBtnText:{
        fontSize: 0.05 * Dimensions.get('window').height,
        marginTop: 0.01 * Dimensions.get('window').height,
        color:'#ffffff'
    },
    commodity_contract:{
        width: 1 * Dimensions.get('window').width,
        height: 0.12 * Dimensions.get('window').height,
        padding: 20,
        paddingTop: 0,
        paddingBottom: 10,
        flexDirection: 'row',
        backgroundColor: '#ffffff'
    },
    commodity_like:{
        width: 0.3 * Dimensions.get('window').width,
        height: 0.06 * Dimensions.get('window').height,
        padding: 5,
        borderRadius: 100,
        flexDirection: 'row',
        backgroundColor: '#dcdcdc'
    },
    commodity_icon:{
        width: 0.035 * Dimensions.get('window').height,
        height: 0.035 * Dimensions.get('window').height,
        fontSize: 0.035 * Dimensions.get('window').height,
        marginTop: 0.0045 * Dimensions.get('window').height,
        marginLeft: 0.02 * Dimensions.get('window').width
    },
    commodity_icon_text:{
        color: '#808080',
        marginTop: 0.008 * Dimensions.get('window').height,
        fontSize: 0.02 * Dimensions.get('window').height,
        marginLeft: 5,
    },
    commodity_comment:{
        width: 0.3 * Dimensions.get('window').width,
        height: 0.06 * Dimensions.get('window').height,
        marginLeft: 0.02 * Dimensions.get('window').width,
        padding: 5,
        borderRadius: 100,
        flexDirection: 'row',
        backgroundColor: '#dcdcdc'
    },
    commodity_flag_view:{
        width: 0.06 * Dimensions.get('window').height,
        height: 0.06 * Dimensions.get('window').height,
        borderRadius: 0.03 * Dimensions.get('window').height,
        marginLeft: 0.1 * Dimensions.get('window').width,
        backgroundColor: '#dcdcdc',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    commodity_flag:{
        fontSize: 0.04 * Dimensions.get('window').height,
        marginTop: 0.008 * Dimensions.get('window').height,
        color: '#808080'
    },
    commodity_description:{
        width: 1 * Dimensions.get('window').width,
        backgroundColor: '#ffffff',
        padding: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    commodity_information:{
        width: 1 * Dimensions.get('window').width,
        backgroundColor: '#ffffff',
        padding: 0,
        flexDirection: 'row',
    },
    commodity_information_title:{
        width: 0.35 * Dimensions.get('window').width,
        padding: 30,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: "#ebebeb",
        fontSize: 20,
        color: '#808080'
    },
    commodity_information_body:{
        width: 0.65 * Dimensions.get('window').width,
        padding: 30,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: "#ebebeb",
        fontSize: 20,
        color: '#808080'
    },
    commodity_seller:{
        width: 1 * Dimensions.get('window').width,
        backgroundColor: '#ffffff',
        padding: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    commodity_seller_icon:{
        width: 0.1 * Dimensions.get('window').height,
        height: 0.1 * Dimensions.get('window').height,
    }
});
