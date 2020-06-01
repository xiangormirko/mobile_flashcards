import { RECEIVE_DECKS, ADD_DECK, DELETE_DECK, ADD_CARD } from '../actions';

export default function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };

    case ADD_DECK:
      return {
        ...state,
        ...action.deck,
      };
    case ADD_CARD:
      const { deckId, cardId, card } = action;
      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          [cards]: {
            ...state[deckId].cards,
            cards: state[deckId].cards.includes(cardId)
              ? console.log('same card already exists')
              : state[deckId].cards.concat(card),
          },
        },
      };

    default:
      return state;
  }
}
