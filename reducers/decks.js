import { RECEIVE_DECKS, CREATE_DECK, DELETE_DECK } from '../actions';

export default function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };

    case CREATE_DECK:
      return {
        ...state,
        ...action.deck,
      };
    default:
      return state;
  }
}
