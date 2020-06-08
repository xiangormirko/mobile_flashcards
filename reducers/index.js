import {
  RECEIVE_DECKS,
  ADD_DECK,
  DELETE_DECK,
  ADD_CARD,
  ADD_RESULTS,
} from '../actions';

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
    case ADD_CARD: {
      const { deckId, cardId, card } = action;

      if (state[deckId].cards.some((card) => card['title'] === cardId)) {
        console.log('The same card already exists');
        return { ...state };
      }
      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          cards: state[deckId].cards.concat(card),
        },
      };
    }

    case ADD_RESULTS: {
      const { deckId, results } = action;
      // console.log('reducer');
      // console.log(state[deckId]);

      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          performance: state[deckId].performance.concat(results),
        },
      };
    }
    default:
      return state;
  }
}
