import { Card } from "../model/card.model";

export function createStore(reducer, initialState) {
    let state = initialState;
    let listeners = []

    function getState() {
        return state;
    }

    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach(listener => listener(state));
        localStorage.setItem('cards_gallery_data', JSON.stringify(state));
        return action;
    }

    function subscribe(listener) {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        }
    }

    dispatch({ type: '@@INIT' });

    return {
        getState,
        dispatch,
        subscribe
    };
}

export const loadInitialState = () => {
    const data = localStorage.getItem('cards_gallery_data');
    if (data) {
        return JSON.parse(data);
    }
    return {
        cards: [
            Card.createTestCard()
        ],
        cur_page: 1,
    };
};