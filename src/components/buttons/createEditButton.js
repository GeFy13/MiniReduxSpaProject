import { createButton } from "./createButton";

export function createEditButton() {
    const button = createButton();

    button.textContent = 'Изменить';
    button.style.backgroundColor = '#667eea';
    button.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.4)';

    button.onmouseover = () => {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.6)';
    };
    button.onmouseout = () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.4)';
    };

    return button;
}