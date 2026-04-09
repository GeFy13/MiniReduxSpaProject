export function createAddButton() {
    const button = document.createElement('button');

    const div = document.createElement('div');

    div.style.backgroundColor = '#ffffff3f';
    div.style.borderRadius = '15px';
    div.style.padding = '20px';
    div.style.width = 'auto';
    div.style.height = 'auto';
    div.style.display = 'flex';
    div.style.justifyContent = 'center';
    div.style.alignItems = 'center';
    div.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
    div.style.textAlign = 'center';

    button.textContent = 'Добавить';
    button.style.backgroundColor = 'white';
    button.style.color = '#667eea';
    button.style.border = 'none';
    button.style.width = '150px';
    button.style.height = '150px';
    button.style.borderRadius = '100px';
    button.style.cursor = 'pointer';
    button.style.transition = 'all 0.3s ease';
    button.style.boxShadow = '0 5px 15px rgba(234, 234, 234, 0.4)';
    button.style.fontSize = '18px';
    button.style.fontWeight = 'bold';
    button.style.transition = 'all 0.5s ease-in-out';

    button.onmouseover = () => {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 8px 20px rgba(234, 234, 234, 0.6)';
    };
    button.onmouseout = () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.4)';
    };

    div.appendChild(button)
    
    return div;
}