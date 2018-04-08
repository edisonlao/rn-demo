import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    ListView,
    StyleSheet,
    Text,
    Button,
    TouchableOpacity,
    StatusBar,
    View,
} from 'react-native';

import {MonoText} from '../components/StyledText';

export default class HomeScreen extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: 'Home',
        headerTitleStyle: {
            color: '#ffffff'
        },
        headerStyle: {
            height: 40,
            padding: 10,
            margin: 0,
            color: '#fff',
            backgroundColor: '#29c7ef' // 设置导航栏的背景颜色,headerTintColor设置无效
        },
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

        render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={'#29c7ef'} />
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
                <Image source={require('../assets/images/user.png')}
                       resizeMode="contain"
                       fadeDuration={0}
                       style={styles.commodityPic}/>
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
        flexDirection: 'row',
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
    commodityPic:{
        width:140,
        height: 140,
        marginTop: 5,
        marginLeft: 5,
        borderWidth: 1,
        borderColor: '#ededed'
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
