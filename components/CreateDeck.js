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
import { CommonActions } from '@react-navigation/native';

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

  toHome = () => {
    this.props.navigation.dispatch(
      CommonActions.goBack({
        key: 'CreateDeck',
      })
    );
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
    this.toHome();
  };
  render() {
    const { title } = this.state;
    return (
      <View style={style.container}>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
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
    paddingLeft: 5,
  },
});

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(CreateDeck);
