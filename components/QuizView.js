import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import { createDeck } from '../utils/api';
import { addDeck } from '../actions/index';
import { gray, yellow, white, blue } from '../utils/colors';
import { CommonActions } from '@react-navigation/native';

function shuffle(array) {
  let i = array.length;
  while (i--) {
    const ri = Math.floor(Math.random() * (i + 1));
    [array[i], array[ri]] = [array[ri], array[i]];
  }
  return array;
}

class QuizView extends Component {
  // toHome = () => {
  //   this.props.navigation.dispatch(
  //     CommonActions.goBack({
  //       key: 'QuizView',
  //     })
  //   );
  // };

  state = {
    quizIndex: 0,
    quizDeck: [],
    remainingCards: 0,
    correctCards: 0,
    testedCards: 0,
    currentCard: { title: 'loading', description: 'loading' },
    solutionView: false,
  };

  getAnswer = () => {
    this.setState({
      solutionView: true,
    });
  };

  componentDidMount() {
    const deck = this.props.decks[this.props.route.params.deckId];
    console.log(deck);
    const cards = shuffle(Object.values(deck.cards));
    console.log('shuffled...');
    console.log(cards);
    this.setState(() => ({
      quizDeck: cards,
      remainingCards: cards.length,
      currentCard: cards[0],
    }));
  }

  create = () => {
    console.log('pressed create');
    // const deck = this.state;
    // console.log(deck);
    // this.props.dispatch(
    //   addDeck({
    //     [deck.title]: deck,
    //   })
    // );
    // createDeck({ deck });
    // this.toHome();
  };
  render() {
    const {
      currentCard,
      remainingCards,
      testedCards,
      correctCards,
    } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.splitBox}>
          <View style={styles.box}>
            <Text>Remaining Cards: {remainingCards}</Text>
          </View>
          <View style={styles.box}>
            <Text>
              Score: {correctCards} / {testedCards}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.card}>
            {/* <Text style={{ color: purple, fontSize: 25 }}>{title} "Ciao"</Text> */}
            <Text style={styles.title}>{currentCard.title}</Text>
          </View>
          {this.state.solutionView === true ? (
            <View>
              <View style={styles.card}>
                <Text style={styles.title}>{currentCard.description}</Text>
              </View>
              <TextButton onPress={this.create} style={{ margin: 10 }}>
                Did you get it?
              </TextButton>
            </View>
          ) : (
            <TextButton onPress={this.getAnswer} style={{ margin: 10 }}>
              Get Solution
            </TextButton>
          )}
        </View>
        <TextButton onPress={this.create} style={{ margin: 10 }}>
          Finish
        </TextButton>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 5,
  },
  pageTitle: {
    marginTop: 10,
  },
  splitBox: {
    flexDirection: 'row',
    height: 60,
  },
  box: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderColor: gray,
    borderRadius: 6,
    padding: 10,
  },
});

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(QuizView);
