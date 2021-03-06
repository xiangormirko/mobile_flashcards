import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { Platform, StatusBar, View, StyleSheet, Text } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import middleware from './middleware';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import {
  setLocalNotification,
  alertIfRemoteNotificationsDisabledAsync,
} from './utils/helpers';
import DecksView from './components/DecksView';
import DeckDetails from './components/DeckDetails';
import CreateDeck from './components/CreateDeck';
import AddCard from './components/AddCard';
import QuizView from './components/QuizView';
import { white, purple } from './utils/colors';
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
    options: { headerShown: true },
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
  AddCard: {
    name: 'Add Card',
    component: AddCard,
    options: { headerShown: true },
  },
  QuizView: {
    name: 'Quiz',
    component: QuizView,
    options: { headerShown: true },
  },
};

const Stack = createStackNavigator();
const MainNav = () => (
  <Stack.Navigator {...StackNavigatorConfig}>
    <Stack.Screen {...StackConfig['DecksView']} />
    <Stack.Screen {...StackConfig['DeckDetails']} />
    <Stack.Screen {...StackConfig['CreateDeck']} />
    <Stack.Screen {...StackConfig['AddCard']} />
    <Stack.Screen {...StackConfig['QuizView']} />
  </Stack.Navigator>
);

// App
export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
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
