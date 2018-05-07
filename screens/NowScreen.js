import React from 'react';
import {
    Actions,
    Router,
    Scene,
    Modal,
    Lightbox
} from 'react-native-router-flux';
import {
    Provider
} from 'react-redux';
import configureStore from '../router_flux/store/index'
import CommodityList from "../router_flux/CommodityList";
let store = configureStore();

export default class NowScreen extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        header: null
    });

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Scene key="modal" component={Modal} hideNavBar>
                        <Scene key="root">
                            <Scene key="commodityList" title="replace" initial={true} component={CommodityList}/>
                        </Scene>
                    </Scene>
                </Router>
            </Provider>
        )
    }
}

