import { createEditButton } from "../components/buttons/createEditButton";
import { createRemoveButton } from "../components/buttons/createRemoveButton";
import { selectors } from "../store/actionsAndSelectors";

export class Card {
    constructor(data, onEdit, onDelete) {
        this.onEdit = onEdit;
        this.onDelete = onDelete;
        this.card = {
            id: data.id,
            title: data.title,
            description: data.description
        }
    }

    static createTestCard() {
        return {
            id: selectors.getCardsCount() + 1,
            title: 'Пример карты',
            description: 'Тестовое описание'
        }
    }

    create() {
        const card = document.createElement('div');

        const editButton = createEditButton();
        editButton.addEventListener('click', () => this.onEdit(this.card))
        const removeButton = createRemoveButton();
        removeButton.addEventListener('click', () => this.onDelete(this.card.id))

        card.style.backgroundColor = 'white';
        card.style.borderRadius = '15px';
        card.style.padding = '30px';
        card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
        card.style.alignContent = 'center';
        card.style.textAlign = 'center';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.justifyContent = 'space-between';

        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.flexDirection = 'row';
        buttonContainer.style.justifyContent = 'center';
        buttonContainer.style.gap = '30px';
        buttonContainer.style.padding = '0 10px';
        buttonContainer.appendChild(removeButton);
        buttonContainer.appendChild(editButton);

        const desc = document.createElement('div');
        desc.textContent = `${this.card.description}`;
        desc.style.overflow = ''
        desc.style.color = '#333';
        desc.style.fontSize = '16px';
        desc.style.fontStyle = 'italic'
        desc.style.lineHeight = '1.6';


        const title = document.createElement('h1');
        title.textContent = `${this.card.title}`;
        title.style.color = '#333';
        title.style.fontSize = '24px';

        card.append(title, desc, buttonContainer);

        return card;
    }
}