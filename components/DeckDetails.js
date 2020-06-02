import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';

class DeckDetails extends Component {
  state = {
    test: 'Ciao coccodrillo',
  };

  render() {
    const deck = this.props.decks[this.props.route.params.deck.title];
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text>{deck.title}</Text>
          <Text>{deck.cards.length}</Text>
        </View>
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

export default connect(mapStateToProps)(DeckDetails);
