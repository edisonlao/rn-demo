import React from 'react';
import { StackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import StoreNavigator from './StoreNavigator';

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

export default class RootNavigator extends React.Component {

  render() {
    return <RootStackNavigator />;
  }

}
