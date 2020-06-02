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

export function updateDeck({ deck }) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) => {
    const data = JSON.parse(results);
    data[deck.title] = deck;
    AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data));
  });
}
