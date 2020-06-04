import { AsyncStorage } from 'react-native';

const DECK_STORAGE_KEY = 'FlashCard:deck';

export function fetchDeckResults() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) =>
    JSON.parse(results)
  );
}

export function createDeck({ deck }) {
  console.log('create deck invoked');
  const title = deck.title;
  return AsyncStorage.mergeItem(
    DECK_STORAGE_KEY,
    JSON.stringify({
      [title]: deck,
    })
  );
}

export function updateDeck(deckId, cardId, card) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) => {
    const data = JSON.parse(results);
    if (data[deckId].cards.some((card) => card['title'] === cardId)) {
      console.log('The same card already exists');
      return;
    } else {
      data[deckId].cards.push(card);
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data));
    }
  });
}
