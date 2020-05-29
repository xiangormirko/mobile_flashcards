import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

class DeckDetails extends Component {
  state = {
    test: 'Ciao coccodrillo',
  };

  render() {
    return <Text>{this.state.test}</Text>;
  }
}

export default connect()(DeckDetails);
