import React from 'react';
import {
    StyleSheet,
    Button,
    Text,
    View,
    StatusBar,
    Dimensions,
    ListView,
    TouchableOpacity,
} from 'react-native';

export default class SellScreen extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        header: null
    });

    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds,

        }
    }

    render(){
        return  (
            <View>

            </View>
        )
    }


}