import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import Card from './Card';
import CreateDeck from './CreateDeck';
import { fetchDeckResults } from '../utils/api';
import { receiveDecks } from '../actions/index';
import TextButton from './TextButton';
import { gray, lightPurple, white, blue, purple } from '../utils/colors';

const Item = ({ title, onSelect }) => {
  return (
    <TouchableOpacity onPress={() => onSelect(title)} style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

class DecksView extends Component {
  state = {
    ready: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;

    fetchDeckResults()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ ready: true })))
      .then(console.log('ciao signore'));
  }

  onSelect = (deck) => {
    console.log('pressedd');
    this.props.navigation.navigate('Deck Details', {
      deck: deck,
    });
  };

  render() {
    const { decks } = this.props;
    const decksArray = Object.values(decks);
    const { ready } = this.state;

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
            <Item title={item.title} onSelect={() => this.onSelect(item)} />
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
});

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(DecksView);
