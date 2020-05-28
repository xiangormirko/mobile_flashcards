import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';

class DecksView extends Component {
  render() {
    return (
      <View>
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
