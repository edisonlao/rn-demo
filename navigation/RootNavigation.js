import React from 'react';
import { StackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import StoreNavigator from './StoreNavigator';
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
import configureStore from '../router_flux/store/index'

import Commodity from '../router_flux/Commodity';
import CommodityList from '../router_flux/CommodityList';
import Login from '../router_flux/Login';
import SellScreen from '../screens/SellScreen';

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

const RootStackNavigator = StackNavigator(
  {
    Main: {
      // screen: MainTabNavigator,
        screen: StoreNavigator,
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);
const getSceneStyle = () => ({
    backgroundColor: '#efeff4',
    shadowOpacity: 1,
    shadowRadius: 3,
});

export default class RootNavigator extends React.Component {

  render() {
    return (
        <Provider store={store}>
            <Router getSceneStyle={getSceneStyle}>
                <Modal>
                    <Scene key="root" hideNavBar>
                        <Lightbox>
                            <Scene key="login" hideNavBar={false} component={Login}/>
                            <Scene key="storenavigator" type='replace' component={StoreNavigator}
                                   style={styles.tabBarContainer} initial
                                   tabBarPosition='bottom' tabs/>
                        </Lightbox>
                        <Scene
                            key="commodity"
                            title="commodity"
                            hideNavBar={true}
                            backButtonTintColor={"#808080"}
                            component={Commodity}/>
                        <Scene
                            key="sellscreen"
                            title="sellscreen"
                            hideNavBar={true}
                            backButtonTintColor={"#808080"}
                            component={SellScreen}/>
                    </Scene>
                </Modal>
            </Router>
        </Provider>
    )
  }

}
