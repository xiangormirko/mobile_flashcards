import { AsyncStorage } from 'react-native';

const DECK_STORAGE_KEY = 'FlashCard:deck';

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
