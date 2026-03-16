import { setupCounter } from "./components/counter"

// Создание элементов через JavaScript
const app = document.getElementById('root')

// Создаем заголовок
const title = document.createElement('h1')
title.textContent = 'Hello Vite + JavaScript!'
title.style.color = '#333'
title.style.fontFamily = 'Arial, sans-serif'
title.style.display = "flex"
title.style.justifyContent = "center"
title.style.alignItems = 'center';

// Создаем кнопку
const button = document.createElement('button')
button.textContent = 'Нажми меня'
button.style.padding = '10px 20px'
button.style.backgroundColor = '#646cff'
button.style.color = 'white'
button.style.border = 'none'
button.style.borderRadius = '5px'
button.style.cursor = 'pointer'

// Добавляем все на страницу
app.appendChild(title)
app.appendChild(button)

setupCounter(button)