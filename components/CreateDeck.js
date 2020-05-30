import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import Card from './Card';
import TextButton from './TextButton';
import { createDeck } from '../utils/api';
import { addDeck } from '../actions/index';
import { white, purple } from '../utils/colors';

class CreateDeck extends Component {
  state = {
    title: '',
  };

  updateTitle = (text) => {
    this.setState({
      title: text,
      cards: [],
      performance: [],
    });
  };

  create = () => {
    console.log('pressed create');
    const deck = this.state;
    console.log(deck);
    this.props.dispatch(
      addDeck({
        [deck.title]: deck,
      })
    );

    createDeck({ deck });
  };
  render() {
    const { title } = this.state;
    return (
      <View>
        <View style={style.card}>
          {/* <Text style={{ color: purple, fontSize: 25 }}>{title} "Ciao"</Text> */}
          <Text style={style.title}>Enter Deck Name</Text>
          <TextInput
            style={style.textInput}
            onChangeText={(text) => this.updateTitle(text)}
            value={title}
            placeholder={'Enter here...'}
          />
        </View>
        <TextButton onPress={this.create} style={{ margin: 10 }}>
          Create Card
        </TextButton>
      </View>
    );
  }
}

const style = StyleSheet.create({
  card: {
    padding: 20,
    margin: 10,
    backgroundColor: white,
    borderWidth: 2,
    borderColor: '#20232a',
    borderRadius: 6,
  },
  title: {
    fontSize: 25,
    marginBottom: 15,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default connect()(CreateDeck);
