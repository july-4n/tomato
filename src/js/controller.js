/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

// Cannot access 'view' before initialization
// import {view} from '../index.js';

import {form} from '../index.js';

// обрабатывает submit, получает task, должен передать task Model

class ControllerTomato {
  constructor(model) {
    this.model = model;
    this.getTask = this.getTask.bind(this);
  }

  getTask() {
    form.addEventListener('submit', evt => {
      evt.preventDefault();
      const formData = new FormData(evt.target);
      const task = Object.fromEntries(formData)['task-name'];
      console.log(task);
      return task;
    });
  }
}

export const controller = new ControllerTomato();
