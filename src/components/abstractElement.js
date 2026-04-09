/**
 * Создает шаблон DOM-элемента
 * @param {string} type - тип элемента
 * @returns {HTMLElement} - элемент
 */
export function createAbstractElement(type) {
    const el = document.createElement(type)
    el.style.margin = '0'
    el.style.padding = '0'
    el.style.boxSizing = 'border-box'
    return el;
}