import { HomeView } from './view/home.view'
import { createStore, loadInitialState } from './store/store';
import cardReducer from './store/reducers/cardReducer';
import { Router } from './routes/routes';
import { actions, ActionTypes, selectors } from './store/actionsAndSelectors';
import { AddView } from './view/add.view';

document.addEventListener('DOMContentLoaded', () => {
    let unsubscribe;
    const store = createStore(cardReducer, loadInitialState());

    const router = new Router([
        { path: '/', handler: showHomeView },
        { path: '/add', handler: showAddView },
        { path: '/edit/:id', handler: showEditView},
        { path: '*', handler: () => router.navigate('/') }
    ]);

    store.subscribe(() => {
        try {
            const state = store.getState();
            localStorage.setItem('cards_gallery_data', JSON.stringify(state))
        } catch (error) {
            throw new Error("Ошибка сохранения данных в LocalStorage:", error);
        }
    })

    function showHomeView() {
        const data = JSON.parse(localStorage.getItem('cards_gallery_data'));
        new HomeView(
            document.getElementById('root'),
            data,
            () => router.navigate('/add'),
            () => {   
                if (data.cur_page < selectors.getPagesCount(data)) {
                    store.dispatch(actions.nextPage());
                }
            },
            () => {
                if (data.cur_page > 1) {
                    store.dispatch(actions.prevPage());
                }
            },
            (id) => store.dispatch(actions.deleteCard(id)),
            (card) => router.navigate(`/edit/${card.id}`)
        )

        if (unsubscribe) unsubscribe();
        unsubscribe = store.subscribe(() => {
            router.navigate('/');
        })
    }

    function showAddView() {
        new AddView(
            document.getElementById('root'),
            null,
            (card) => store.dispatch(actions.addCard(card)),
            () => router.navigate('/')
        );
        if (unsubscribe) unsubscribe();
        unsubscribe = store.subscribe(() => {
            router.navigate('/');
        })
    }

    function showEditView(params) {
        const id = parseInt(params.id);
        const state = store.getState();
        const card = selectors.getCardById(state, id);

        new AddView(
            document.getElementById('root'),
            card,
            (card) => store.dispatch(actions.updateCard(id, card)),
            () => router.navigate('/')
        );
        if (unsubscribe) unsubscribe();
        unsubscribe = store.subscribe(() => {
            router.navigate('/');
        })
    }

    router.handleRoute();
})