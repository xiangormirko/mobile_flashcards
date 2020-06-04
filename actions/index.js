export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const DELETE_DECK = 'DELETE_DECK';
export const ADD_CARD = 'ADD_CARD';
export const UPDATE_CARD = 'EDIT_CARD';
export const DELETE_CARD = 'DELETE_CARD';
import { updateDeck } from '../utils/api';

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  };
}

export function addCard(deckId, cardId, card) {
  // console.log('action');
  // console.log(deckId, cardId, card);
  return (dispatch) => {
    dispatch({ type: ADD_CARD, deckId, cardId, card });
    return updateDeck(deckId, cardId, card).catch((e) => {
      console.warn('Error in updateDeck: ', e);
    });
  };
  // return {
  //   type: ADD_CARD,
  //   deckId,
  //   cardId,
  //   card,
  // };
}
