/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
export class Task {
  constructor(title, counter = 0) {
    this.title = title;
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

export class Tomato {
  constructor({time = 25, pauseTime = 5, longPauseTime = 15, tasks = []}) {
    this.time = time;
    this.pauseTime = pauseTime;
    this.longPauseTime = longPauseTime;
    this.tasks = tasks;
    this.activeTask = null;
  }

  addTask(task) {
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

export const taskOne = new Task('Погулять', 1);
export const taskTwo = new Task('Почитать', 1);
