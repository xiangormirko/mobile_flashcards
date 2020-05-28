import React from 'react';
import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { Platform, StatusBar, View, StyleSheet, Text } from 'react-native';
import { createStore } from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import { setLocalNotification } from './utils/helpers';
import DecksView from './components/DecksView';
import CardsView from './components/CardsView';

// Config for StackNav
const StackNavigatorConfig = {
  headerMode: 'screen',
};
const StackConfig = {
  TabNav: {
    name: 'Home',
    component: DecksView,
    options: { headerShown: false },
  },
  EntryDetail: {
    name: 'Cards',
    component: CardsView,
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
    <Stack.Screen {...StackConfig['TabNav']} />
    <Stack.Screen {...StackConfig['EntryDetail']} />
  </Stack.Navigator>
);
