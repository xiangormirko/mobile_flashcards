import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import Card from './Card';

class DecksView extends Component {
  render() {
    return (
      <View>
        <Card title={'Titolo'} text={'Lorem Ipsum'} />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Deck Details')}
        >
          <Text> Go to Details</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect()(DecksView);
