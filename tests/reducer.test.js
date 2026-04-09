import { actions, ActionTypes, selectors } from "../src/store/actionsAndSelectors"
import cardReducer from "../src/store/reducers/cardReducer"

describe("Тесты карточных reducer'ов", () => {
    let reducer = cardReducer;
    let initialState = {
        cards: [
            {
                id: 1,
                title: "Title 1",
                description: "Description 1"
            },
            {
                id: 2,
                title: "Title 2",
                description: "Description 2"
            },
        ],
        cur_page: 1
    };

    test("Добавление карт", () => {
        const newCard = {
            title: "Title 3",
            description: "Description 3"
        }
        const state = reducer(initialState, actions.addCard(newCard));
        expect(state).not.toEqual(initialState);
        expect(selectors.getCardsCount(state)).toBe(3);

        const mapped = state.cards.map(card => {
            const { id, ...info } = card;
            return info;
        })
        expect(mapped).toContainEqual(newCard);
    });

    test("Удаление карт", () => {
        const deleteId = 1;
        const state = reducer(initialState, actions.deleteCard(deleteId));
        expect(state).not.toEqual(initialState);
        expect(selectors.getCardsCount(state)).toBe(1);

        const card = state.cards.find(card => card.id === deleteId);
        expect(card).toBeUndefined()
    });

    test("Удаление неизвестной карты", () => {
        const deleteId = 4;
        const state = reducer(initialState, actions.deleteCard(deleteId));
        expect(state).toEqual(initialState);
        expect(selectors.getCardsCount(state)).toBe(2);
    });

    test('Обновление карты', () => {
        const updateId = 1;
        const newCard = {
            title: "Title 3",
            description: "Description 3"
        }
        const state = reducer(initialState, actions.updateCard(updateId, newCard));
        expect(state).not.toEqual(initialState);
        expect(selectors.getCardsCount(state)).toBe(2);

        const card = state.cards.find(card => card.id === updateId);
        const { id, ...info } = card;
        expect(info).toEqual(newCard)
    });

    test('Обновление неизвестной карты', () => {
        const updateId = 4;
        const newCard = {
            title: "Title 3",
            description: "Description 3"
        }
        const state = reducer(initialState, actions.updateCard(updateId, newCard));
        expect(state).toEqual(initialState);
        expect(selectors.getCardsCount(state)).toBe(2);

        const card = state.cards.find(card => card.id === updateId);
        expect(card).toBeUndefined()
    });
});

describe("Тесты страничных reducer'ов", () => {
    let reducer = cardReducer;
    let initialState = {
        cards: [],
        cur_page: 1
    };
    for (let i = 0; i < 10; i++) {
        const card = {
            id: i,
            title: `Title ${i}`,
            description: `Description ${i}`
        }
        initialState.cards.push(card)
    }
    initialState.cur_page = 1

    test('Перелючение следующей страницы', () => {
        initialState.cur_page = 1;
        const state = reducer(initialState, actions.nextPage());
        expect(state).not.toEqual(initialState);
        expect(state.cur_page).toBe(2);
    });

    test('Перелючение предыдущей страницы', () => {
        initialState.cur_page = 2;
        const state = reducer(initialState, actions.prevPage());
        expect(state).not.toEqual(initialState);
        expect(state.cur_page).toBe(1);
    });

    test('Нельзя переключаться за пределы', () => {
        initialState.cur_page = 1;
        let state = reducer(initialState, actions.prevPage());
        expect(state.cur_page).toBe(1);

        initialState.cur_page = 2;
        state = reducer(initialState, actions.nextPage());
        expect(state.cur_page).toBe(2);
    });
});

describe('Исключительные тесты', () => {
    let reducer = cardReducer;
    let initialState = {
        cards: [
            {
                id: 1,
                title: "Title 1",
                description: "Description 1"
            },
            {
                id: 2,
                title: "Title 2",
                description: "Description 2"
            },
        ],
        cur_page: 1
    };

    test('Вызов несуществующего экшена', () => {
        const state = reducer(initialState, { type: 'RELOAD_PAGE' });
        expect(state).toEqual(initialState);
    })
})