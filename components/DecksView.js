import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import Card from './Card';
import CreateDeck from './CreateDeck';
import { fetchDeckResults } from '../utils/api';
import { receiveDecks } from '../actions/index';
import TextButton from './TextButton';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

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
      .then(() => this.setState(() => ({ ready: true })));
  }

  onSelect = (deck) => {
    console.log('pressed');
    this.props.navigation.navigate('Deck Details', {
      deck: deck,
    });
  };

  render() {
    console.log(this.onSelect);
    const { decks } = this.props;
    const decksArray = Object.values(decks);
    console.log(decksArray);
    return (
      <SafeAreaView style={styles.container}>
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
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(DecksView);
