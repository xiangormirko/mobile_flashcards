import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchDeckResults, clearAppData } from '../utils/api';
import { receiveDecks } from '../actions/index';
import TextButton from './TextButton';
import { gray, white, purple } from '../utils/colors';

const Item = ({ title, onSelect, cardsNum, bounceValue }) => {
  return (
    <TouchableOpacity onPress={() => onSelect(title)} style={styles.item}>
      <Animated.Text
        style={[styles.title, { transform: [{ scale: bounceValue }] }]}
      >
        {title}
      </Animated.Text>
      <Text style={styles.cardsNumber}> Cards contained: {cardsNum}</Text>
    </TouchableOpacity>
  );
};

class DecksView extends Component {
  state = {
    ready: false,
    bounceValue: new Animated.Value(1),
  };

  componentDidMount() {
    const { dispatch } = this.props;

    fetchDeckResults()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ ready: true })))
      .then(console.log('ciao signore'));
  }

  onSelect = (deck) => {
    const { bounceValue } = this.state;
    Animated.sequence([
      Animated.timing(bounceValue, { duration: 50, toValue: 1.1 }),
      Animated.spring(bounceValue, { toValue: 1, friction: 4 }),
    ]).start();
    setTimeout(() => {
      this.props.navigation.navigate('Deck Details', {
        deck: deck,
      });
    }, 500);
  };

  render() {
    const { decks } = this.props;
    const decksArray = Object.values(decks);
    const { ready, bounceValue } = this.state;

    console.log(decksArray);

    if (ready === false) {
      return <ActivityIndicator />;
    }

    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.pageTitleText}> Your Decks</Text>
        </View>
        <FlatList
          data={decksArray}
          renderItem={({ item }) => (
            <Item
              title={item.title}
              cardsNum={item.cards.length}
              bounceValue={bounceValue}
              onSelect={() => this.onSelect(item)}
            />
          )}
          keyExtractor={(item) => item.title}
        />
        <TextButton
          onPress={() => this.props.navigation.navigate('Create Deck')}
        >
          <Text> Create a deck </Text>
        </TextButton>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: gray,
    borderRadius: 6,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: white,
  },
  pageTitleText: {
    textAlign: 'center',
    fontSize: 25,
    padding: 10,
    color: white,
    backgroundColor: purple,
  },
  cardsNumber: {
    color: white,
  },
});

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(DecksView);
