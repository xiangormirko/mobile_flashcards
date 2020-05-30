import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { Platform, StatusBar, View, StyleSheet, Text } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import middleware from './middleware';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import { setLocalNotification } from './utils/helpers';
import DecksView from './components/DecksView';
import DeckDetails from './components/DeckDetails';
import CreateDeck from './components/CreateDeck';
import { white, purple } from './utils/colors';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from './middleware/logger';

function AppStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

// Config for StackNav
const StackNavigatorConfig = {
  headerMode: 'screen',
};
const StackConfig = {
  DecksView: {
    name: 'Home',
    component: DecksView,
    options: { headerShown: false },
  },
  CreateDeck: {
    name: 'Create Deck',
    component: CreateDeck,
    options: { headerShown: false },
  },
  DeckDetails: {
    name: 'Deck Details',
    component: DeckDetails,
    options: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    },
  },
};

const Stack = createStackNavigator();
const MainNav = () => (
  <Stack.Navigator {...StackNavigatorConfig}>
    <Stack.Screen {...StackConfig['DecksView']} />
    <Stack.Screen {...StackConfig['DeckDetails']} />
    <Stack.Screen {...StackConfig['CreateDeck']} />
  </Stack.Navigator>
);

// App
export default class App extends React.Component {
  // componentDidMount() {
  //   setLocalNotification();
  // }
  render() {
    const store = createStore(
      reducer,
      compose(
        applyMiddleware(thunk, logger),
        window.devToolsExtension ? window.devToolsExtension() : (f) => f
      )
    );
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <AppStatusBar backgroundColor={purple} barStyle="light-content" />
          <NavigationContainer>
            <MainNav />
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}
