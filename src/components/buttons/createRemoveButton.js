import { createButton } from "./createButton";

export function createRemoveButton() {
    const button = createButton();

    button.textContent = 'Удалить';
    button.style.backgroundColor = '#ff5f5b';
    button.style.boxShadow = '0 5px 15px rgba(255, 95, 91, 0.4)';

    button.onmouseover = () => {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 5px 15px rgba(255, 95, 91, 0.6)';
    };
    button.onmouseout = () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 5px 15px rgba(255, 95, 91, 0.4)';
    };

    return button;
}