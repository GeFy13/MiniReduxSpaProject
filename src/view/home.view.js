import { createAddButton } from "../components/buttons/createAddButton";
import { createButton } from "../components/buttons/createButton";
import { Card } from "../model/card.model";
import { selectors } from "../store/actionsAndSelectors";
import { BackgroundView } from "./abstract.view";

export class HomeView {
    constructor(container, data, onAdd, onNext, onPrev, onDelete, onEdit) {
        new BackgroundView(container);
        this.container = document.getElementById('container');
        this.data = data;
        this.onAdd = onAdd;
        this.onNext = onNext;
        this.onPrev = onPrev;
        this.onDelete = onDelete;
        this.onEdit = onEdit;
        this.render();
    }

    render() {
        const cardHolder = document.createElement('div');
        cardHolder.style.backgroundColor = 'rgba(255, 255, 255, 0.35)';
        cardHolder.style.borderRadius = '15px';
        cardHolder.style.display = 'grid';
        cardHolder.style.gridTemplateColumns = 'repeat(4, 1fr)';
        cardHolder.style.gridTemplateRows = 'repeat(2, 1fr)';
        cardHolder.style.gap = '10px';
        cardHolder.style.boxSizing = 'border-box';
        cardHolder.style.height = '100%';
        cardHolder.style.width = '100%';
        cardHolder.style.padding = '20px';

        const addCard = createAddButton();
        addCard.addEventListener('click', () => this.onAdd());
        cardHolder.appendChild(addCard);


        for (
            let i = (this.data.cur_page - 1) * 7;
            i < Math.min(this.data.cur_page * 7, selectors.getCardsCount(this.data));
            i++) {
            const card = new Card(this.data.cards[i], this.onEdit, this.onDelete);
            cardHolder.appendChild(card.create());
        }

        const navpanel = document.createElement('div');
        navpanel.style.display = 'flex';
        navpanel.style.flexDirection = 'row';
        navpanel.style.alignContent = 'center';
        navpanel.style.justifyContent = 'center';
        navpanel.style.fontWeight = 'bold'
        navpanel.style.gap = '10px';

        const prevButton = createButton();
        prevButton.textContent = "Пред. страница"
        prevButton.style.fontSize = '12px';
        prevButton.style.fontWeight = 'bold'
        prevButton.style.color = "#667eea"
        prevButton.style.boxShadow = '0 5px 15px rgba(234, 234, 234, 0.4)';
        prevButton.addEventListener('click', () => this.onPrev())

        const nextButton = createButton();
        nextButton.textContent = "След. страница"
        nextButton.style.fontSize = '12px';
        nextButton.style.fontWeight = 'bold'
        nextButton.style.color = "#667eea"
        nextButton.style.boxShadow = '0 5px 15px rgba(234, 234, 234, 0.4)';
        nextButton.addEventListener('click', () => this.onNext())

        const pageCounter = document.createElement('div')
        pageCounter.style.backgroundColor = 'white';
        pageCounter.style.color = "#667eea"
        pageCounter.style.boxShadow = '0 5px 15px rgba(234, 234, 234, 0.4)';
        pageCounter.style.border = 'none';
        pageCounter.style.padding = '15px 20px';
        pageCounter.style.borderRadius = '25px';
        pageCounter.style.fontSize = '12px';
        pageCounter.textContent = `${this.data.cur_page}/${selectors.getPagesCount(this.data)}`

        nextButton.onmouseover = () => {
            nextButton.style.transform = 'translateY(-2px)';
            nextButton.style.boxShadow = '0 8px 20px rgba(234, 234, 234, 0.6)';
        };
        nextButton.onmouseout = () => {
            nextButton.style.transform = 'translateY(0)';
            nextButton.style.boxShadow = '0 5px 15px rgba(234, 234, 234, 0.4)';
        };

        prevButton.onmouseover = () => {
            prevButton.style.transform = 'translateY(-2px)';
            prevButton.style.boxShadow = '0 8px 20px rgba(234, 234, 234, 0.6)';
        };
        prevButton.onmouseout = () => {
            prevButton.style.transform = 'translateY(0)';
            prevButton.style.boxShadow = '0 5px 15px rgba(234, 234, 234, 0.4)';
        };

        navpanel.appendChild(prevButton)
        navpanel.appendChild(pageCounter)
        navpanel.appendChild(nextButton)
        this.container.appendChild(cardHolder);
        this.container.appendChild(navpanel);
    }
}