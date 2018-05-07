import React, {
    Component
} from 'react'
import {
    StyleSheet,
    View,
    Image,
    Platform
} from 'react-native'
import {
    Router,
    Scene,
    Modal,
    Lightbox
} from 'react-native-router-flux'
import {
    Provider
} from 'react-redux'
import configureStore from './store/index'

import Commodity from './Commodity';
import CommodityList from './CommodityList';
import Login from './Login'

let store = configureStore();
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
    },
    navigationBar: {
        backgroundColor: '#333333'
    },
    tabBarContainer: {}
});
const getSceneStyle = () => ({
    backgroundColor: '#efeff4',
    shadowOpacity: 1,
    shadowRadius: 3,
});
export default class NowApp extends Component {
    render() {
        return (
            <CommodityList/>
        );
    }
}