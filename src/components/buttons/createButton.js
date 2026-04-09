export function createButton() {
    const button = document.createElement('button');

    button.style.color = 'white';
    button.style.border = 'none';
    button.style.padding = '10px 20px';
    button.style.borderRadius = '25px';
    button.style.fontSize = '12px';
    button.style.fontWeight = 'bold';
    button.style.cursor = 'pointer';
    button.style.transition = 'all 0.5s ease';

    return button;
}