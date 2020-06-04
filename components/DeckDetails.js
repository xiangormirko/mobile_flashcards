import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import { gray, lightPurple, white, blue } from '../utils/colors';

const Item = ({ title, description, onSelect }) => {
  return (
    <TouchableOpacity onPress={() => onSelect(title)} style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
};

class DeckDetails extends Component {
  state = {
    test: 'Ciao coccodrillo',
  };

  onSelect = (card) => {
    console.log('pressed a card');
  };

  render() {
    const deck = this.props.decks[this.props.route.params.deck.title];
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text>{deck.title}</Text>
          <Text>{deck.cards.length}</Text>
        </View>
        <FlatList
          data={deck.cards}
          renderItem={({ item }) => (
            <Item
              title={item.title}
              description={item.description}
              onSelect={() => this.onSelect(item)}
            />
          )}
          keyExtractor={(item) => item.title}
        />
        <TextButton
          onPress={() =>
            this.props.navigation.navigate('Add Card', {
              deckId: deck.title,
            })
          }
        >
          <Text> Add a Card </Text>
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
    backgroundColor: white,
    borderWidth: 1,
    borderColor: gray,
    borderRadius: 6,
    padding: 10,
    marginVertical: 2,
    marginHorizontal: 4,
  },
  title: {
    fontSize: 25,
  },
});

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(DeckDetails);
