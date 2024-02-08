/* eslint-disable max-len */
import './scss/index.scss';
import {RenderTomato} from './js/view.js';
import './js/controller.js';
import {Tomato, Task} from './js/model.js';

export const view = new RenderTomato(document.getElementById('app'));
view.render();

// это точно тут должно быть, не понятно что с tasks  потом делать, туда же данные о таксах должны попадать
const tasks = new Tomato({
  time: 30,
});

// можно ли так делать?
export const form = view.renderForm();
console.log(form);
