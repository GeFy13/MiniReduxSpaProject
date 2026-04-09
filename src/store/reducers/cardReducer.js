import { ActionTypes, selectors } from "../actionsAndSelectors";

const cardReducer = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_CARD: {
            const newCard = {
                ...action.payload,
                id: selectors.getCardsCount(state) + 1
            }
            return {
                ...state,
                cards: [...state.cards, newCard]
            };
        }

        case ActionTypes.DELETE_CARD:
            return {
                ...state,
                cards: state.cards.filter(card => card.id !== action.payload)
            };

        case ActionTypes.UPDATE_CARD: {
            const { id, updatedCard } = action.payload;
            return {
                ...state,
                cards: state.cards.map(card =>
                    card.id === id ? { ...card, ...updatedCard } : card
                )
            }
        }
        case ActionTypes.NEXT_PAGE:

            return state.cur_page < selectors.getPagesCount(state)
                ?
                {
                    ...state,
                    cur_page: state.cur_page + 1
                }
                : state;
                
        case ActionTypes.PREV_PAGE:
            return state.cur_page > 1
                ?
                {
                    ...state,
                    cur_page: state.cur_page - 1
                }
                : state;
        default:
            return state
    }
};

export default cardReducer;