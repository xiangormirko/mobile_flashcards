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
import { addResults } from '../actions/index';
import { gray, yellow, white, blue, red, green } from '../utils/colors';
import { updateDeck } from '../utils/api';
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
  state = {
    quizIndex: 0,
    quizDeck: [],
    remainingCards: 0,
    correctCards: 0,
    testedCards: 0,
    currentCard: { title: 'loading', description: 'loading' },
    solutionView: false,
    title: 'loading',
  };

  getAnswer = () => {
    this.setState({
      solutionView: true,
    });
  };

  correct = () => {
    const {
      correctCards,
      quizIndex,
      testedCards,
      quizDeck,
      remainingCards,
    } = this.state;
    const nextCardIndex = this.state.quizIndex + 1;
    console.log(nextCardIndex);
    if (remainingCards === 1) {
      console.log('last one correct');
      this.setState({
        correctCards: correctCards + 1,
        testedCards: testedCards + 1,
        remainingCards: remainingCards - 1,
        solutionView: false,
        currentCard: {
          title: `Your Final Score: ${correctCards + 1}/${testedCards + 1}`,
          description: 'Quiz Complete',
        },
        title: 'Quiz Completed',
      });
    } else {
      this.setState({
        correctCards: correctCards + 1,
        quizIndex: quizIndex + 1,
        testedCards: testedCards + 1,
        remainingCards: remainingCards - 1,
        solutionView: false,
        currentCard: quizDeck[nextCardIndex],
      });
    }
  };

  incorrect = () => {
    const {
      correctCards,
      quizIndex,
      testedCards,
      quizDeck,
      remainingCards,
    } = this.state;
    const nextCardIndex = this.state.quizIndex + 1;
    console.log(nextCardIndex);
    if (remainingCards === 1) {
      this.setState({
        testedCards: testedCards + 1,
        remainingCards: remainingCards - 1,
        solutionView: false,
        currentCard: {
          title: `${correctCards}/${testedCards + 1}`,
          description: 'Quiz Complete',
        },
        title: 'Quiz Completed',
      });
    } else {
      this.setState({
        quizIndex: quizIndex + 1,
        testedCards: testedCards + 1,
        remainingCards: remainingCards - 1,
        solutionView: false,
        currentCard: quizDeck[nextCardIndex],
      });
    }
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
      deckId: this.props.route.params.deckId,
    }));
  }

  // create = () => {
  //   console.log('pressed create');
  //   const { correctCards, testedCards } = this.state;
  //   this.props.dispatch(
  //     addDeck({
  //       [deck.title]: deck,
  //     })
  //   );
  //   createDeck({ deck });
  //   this.toHome();
  // };

  finish = () => {
    const { deckId, correctCards, testedCards } = this.state;
    const results = `${correctCards}/${testedCards}`;
    console.log(results);
    this.props.dispatch(addResults(deckId, results));
    this.toHome();
  };

  toHome = () => {
    this.props.navigation.dispatch(
      CommonActions.goBack({
        key: 'QuizView',
      })
    );
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
            <Text style={styles.title}>{currentCard.title}</Text>
          </View>
          {this.state.solutionView === true ? (
            <View>
              <View style={[styles.card, styles.solutionCard]}>
                <Text style={[styles.title, styles.solutionTitle]}>
                  {currentCard.description}
                </Text>
              </View>
              <View style={styles.answers}>
                <TextButton
                  onPress={this.incorrect}
                  style={{ backgroundColor: red, width: 150, flex: 1 }}
                >
                  Incorrect
                </TextButton>

                <TextButton
                  onPress={this.correct}
                  style={{ backgroundColor: green, width: 150, flex: 1 }}
                >
                  Got it!
                </TextButton>
              </View>
            </View>
          ) : this.state.remainingCards === 0 ? (
            <Text></Text>
          ) : (
            <TextButton onPress={this.getAnswer} style={{ margin: 10 }}>
              Get Solution
            </TextButton>
          )}
        </View>
        <TextButton onPress={this.finish} style={{ margin: 10 }}>
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
    justifyContent: 'center',
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
  answers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderColor: gray,
    borderRadius: 6,
    padding: 10,
  },
  solutionCard: {
    backgroundColor: gray,
    borderColor: white,
  },
  solutionTitle: {
    color: white,
  },
});

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(QuizView);
