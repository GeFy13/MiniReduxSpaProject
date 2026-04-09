export const ActionTypes = {
    ADD_CARD: 'ADD_CARD',
    UPDATE_CARD: 'UPDATE_CARD',
    DELETE_CARD: 'DELETE_CARD',
    NEXT_PAGE: 'NEXT_PAGE',
    PREV_PAGE: 'PREV_PAGE'
};

// Удобная активация действий
export const actions = {
    addCard: (card) => ({
        type: ActionTypes.ADD_CARD,
        payload: card
    }),

    updateCard: (id, updatedCard) => ({
        type: ActionTypes.UPDATE_CARD,
        payload: { id, updatedCard }
    }),

    deleteCard: (id) => ({
        type: ActionTypes.DELETE_CARD,
        payload: id
    }),

    nextPage: () => ({
        type: ActionTypes.NEXT_PAGE,
    }),

    prevPage: () => ({
        type: ActionTypes.PREV_PAGE,
    })
};

// Удобный доступ к данным
export const selectors = {
    getAllCards: (state) => state.cards,
    getCardById: (state, id) => state.cards.find(card => card.id === id),
    getCardsCount: (state) => state.cards.length,
    getPagesCount: (state) => Math.ceil(selectors.getCardsCount(state) / 7)
};