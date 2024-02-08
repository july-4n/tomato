/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import {controller} from './controller.js';
// Error Cannot access 'form' before initialization
// const {task} = controller.getTask();


export const dataInstruction = [
  'Напишите название задачи чтобы её&nbsp;добавить',
  'Для активации задачи, выберите её&nbsp;из&nbsp;списка',
  'Запустите таймер',
  'Работайте пока таймер не&nbsp;прозвонит',
  'Сделайте короткий перерыв (5&nbsp;минут)',
  'Продолжайте работать, пока задача не&nbsp;будет выполнена.',
  'Каждые 4&nbsp;периода таймера делайте длинный перерыв (15-20&nbsp;минут).',
];

export class Task {
  constructor(text, counter = 0) {
    this.text = text;
    this.counter = counter;
    this.id = Math.floor(Math.random() * 1_000_000);
  }

  increaseCounter() {
    ++this.counter;
  }

  changeTitle(newTitle) {
    this.title = newTitle;
  }
}
class ImportantTask extends Task {
  constructor(importance) {
    super(importance);
  }
}
class StandardTask extends Task {
  constructor(importance) {
    super(importance);
  }
}
class UnimportantTask extends Task {
  constructor(importance) {
    super(importance);
  }
}

export class Tomato {
  constructor({time = 25, pauseTime = 5, longPauseTime = 15, tasks = []}) {
    if (Tomato.instance) {
      return Tomato.instance;
    }
    this.time = time;
    this.pauseTime = pauseTime;
    this.longPauseTime = longPauseTime;
    this.tasks = tasks;
    this.activeTask = null;
    Tomato.instance = this;
  }

  addTask(task, taskType, importance) {
    switch (taskType) {
      case 'important':
        task = new ImportantTask(importance);
        break;
      case 'standard':
        task = new StandardTask(importance);
        break;
      case 'unimportant':
        task = new UnimportantTask(importance);
        break;
      default:
        throw new Error('Не корректный тип задания!');
    }
    this.tasks.push(task);
  }

  activateTask(taskId) {
    const task = this.tasks.find(task => task.id === taskId);
    if (task) this.activeTask = task;
    return this.activeTask;
  }

  startTask() {
    if (this.activeTask) {
      let timerDuration = this.time;

      const timer = setInterval(() => {
        if (timerDuration === 0) {
          clearInterval(timer);
          console.log(`прошло ${this.time}`);
          this.startBreakTimer();
        } else {
          timerDuration--;
        }
      }, (this.time * 60000));
    } else {
      console.log(`Активных задач нет`);
    }
  }

  startBreakTimer(taskId) {
    let currentPauseTime;
    if (this.increaseTaskCounter(taskId) === 3) {
      currentPauseTime = this.longPauseTime;
    } else {
      currentPauseTime = this.pauseTime;
    }
    const intervalDelay = currentPauseTime * 60000;

    const pauseTimer = setInterval(() => {
      if (currentPauseTime === 0) {
        clearInterval(pauseTimer);
        console.log(`Перерыв завершен!`);
      } else {
        currentPauseTime--;
      }
    }, intervalDelay);
  }

  increaseTaskCounter(taskId) {
    const taskActive = this.activateTask(taskId);
    const increasedCounter = taskActive.increaseCounter();
    return increasedCounter;
  }
}
