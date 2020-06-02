import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import { updateDeck } from '../utils/api';
import { addCard } from '../actions/index';
import { white, purple } from '../utils/colors';
import { CommonActions } from '@react-navigation/native';

class AddCard extends Component {
  state = {
    title: '',
    description: '',
    performance: [],
    skip: false,
  };

  updateTitle = (text) => {
    this.setState({
      title: text,
    });
  };

  updateDescription = (text) => {
    this.setState({
      description: text,
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
    const card = this.state;
    const cardId = card.title;
    const { deckId } = this.props.route.params;
    console.log('component');
    console.log(deckId, cardId, card);
    this.props.dispatch(addCard(deckId, cardId, card));
    // updateDeck({ deckId, cardId, card });
    // this.toHome();
  };
  render() {
    const { title, description } = this.state;
    return (
      <View style={style.container}>
        <View style={style.card}>
          {/* <Text style={{ color: purple, fontSize: 25 }}>{title} "Ciao"</Text> */}
          <Text style={style.title}>Create Card</Text>
          <TextInput
            style={style.textInput}
            onChangeText={(text) => this.updateTitle(text)}
            value={title}
            placeholder={'Enter concept to study...'}
          />
          <TextInput
            style={style.descriptionInput}
            multiline
            numberOfLines={4}
            onChangeText={(text) => this.updateDescription(text)}
            value={description}
            placeholder={'Enter description...'}
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

  descriptionInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 5,
    marginTop: 15,
  },
});

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(AddCard);
