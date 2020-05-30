import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import Card from './Card';
import CreateDeck from './CreateDeck';

class DecksView extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Create Deck')}
        >
          <Text> Create a deck </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect()(DecksView);
