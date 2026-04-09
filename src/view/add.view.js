import { createAbstractElement } from "../components/abstractElement";
import { createEditButton } from "../components/buttons/createEditButton";
import { createRemoveButton } from "../components/buttons/createRemoveButton";
import { BackgroundView } from "./abstract.view";

export class AddView {
    constructor(container, card = null, onSubmit, onCancel) {
        new BackgroundView(container);
        this.container = document.getElementById('container');
        this.card = card;
        this.onSubmit = onSubmit;
        this.onCancel = onCancel;
        this.render();
    }

    render() {
        const form = createAbstractElement('div');
        form.style.background = 'white'
        form.style.borderRadius = '20px'
        form.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)'
        form.style.padding = '40px'
        form.style.maxWidth = '600px'
        form.style.minWidth = '300px'
        form.style.width = '100%'

        const formTitle = createAbstractElement('h1');
        formTitle.textContent = `${this.card ? 'Изменение' : 'Создание'} карточки`
        formTitle.style.textAlign = 'center'
        formTitle.style.marginBottom = '30px'
        formTitle.style.fontSize = '28px'

        const titleGroup = createAbstractElement('div');
        titleGroup.style.marginBottom = '25px'

        const titleLable = createAbstractElement('label');
        titleLable.textContent = 'Название карточки'
        titleLable.style.display = 'block'
        titleLable.style.marginBottom = '8px'
        titleLable.style.fontWeight = '600'
        titleLable.style.color = '#555'
        titleLable.htmlFor = 'title'

        const titleInput = createAbstractElement('input');
        titleInput.id = 'title'
        titleInput.style.width = '100%'
        titleInput.style.padding = '12px 16px'
        titleInput.style.border = '2px solid #e0e0e0'
        titleInput.style.borderRadius = '10px'
        titleInput.style.fontSize = '16px'
        titleInput.style.fontFamily = 'inherit'
        titleInput.style.transition = 'all 0.3s ease'
        titleInput.setAttribute('type', 'text')
        titleInput.placeholder = 'Введите название...'
        if (this.card) {
            titleInput.value = this.card.title;
        }

        titleInput.addEventListener('focusin', () => {
            titleInput.style.outline = 'none'
            titleInput.style.borderColor = '#667eea'
            titleInput.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'
        })

        titleInput.addEventListener('focusout', () => {
            titleInput.style.outline = 'none'
            titleInput.style.borderColor = '#e0e0e0'
            titleInput.style.boxShadow = 'none'
        })

        const descGroup = createAbstractElement('div');
        descGroup.style.marginBottom = '25px'

        const descLable = createAbstractElement('label');
        descLable.textContent = 'Описание'
        descLable.style.display = 'block'
        descLable.style.marginBottom = '8px'
        descLable.style.fontWeight = '600'
        descLable.style.color = '#555'
        descLable.htmlFor = 'desc'

        const descInput = createAbstractElement('textarea');
        descInput.id = 'desc'
        descInput.style.width = '100%'
        descInput.style.padding = '12px 16px'
        descInput.style.border = '2px solid #e0e0e0'
        descInput.style.borderRadius = '10px'
        descInput.style.fontSize = '16px'
        descInput.style.fontFamily = 'inherit'
        descInput.style.transition = 'all 0.3s ease'
        descInput.setAttribute('type', 'text')
        descInput.placeholder = 'Введите описание...'
        descInput.style.resize = 'none'
        descInput.style.minHeight = '120px'
        if (this.card) {
            descInput.value = this.card.description;
        }


        const submitButton = createEditButton();
        submitButton.textContent = this.card ? 'Изменить' : 'Создать'
        submitButton.style.fontWeight = 'bold'
        
        const cancelButton = createRemoveButton();
        cancelButton.textContent = 'Отмена'
        cancelButton.style.fontWeight = 'bold'

        const button_panel = createAbstractElement('div');
        button_panel.style.display = 'flex';
        button_panel.style.flexDirection = 'row';
        button_panel.style.width = '100%';
        button_panel.style.justifyContent = 'center';
        button_panel.style.gap = '20px';

        descInput.addEventListener('focusin', () => {
            descInput.style.outline = 'none'
            descInput.style.borderColor = '#667eea'
            descInput.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'
        })

        descInput.addEventListener('focusout', () => {
            descInput.style.outline = 'none'
            descInput.style.borderColor = '#e0e0e0'
            descInput.style.boxShadow = 'none'
        })

        submitButton.addEventListener('click', () => {
            const formData = {
                title: document.getElementById('title').value.trim(),
                description: document.getElementById('desc').value.trim(),
            }

            if (!formData.title || !formData.description) {
                alert('Заполните необходимые поля: заголовок и описание');
                return;
            }

            this.onSubmit(formData);
        })

        cancelButton.addEventListener('click', () => this.onCancel());

        button_panel.append(cancelButton, submitButton);
        titleGroup.append(titleLable, titleInput);
        descGroup.append(descLable, descInput);
        form.append(formTitle, titleGroup, descGroup, button_panel);
        this.container.appendChild(form)
    }
}