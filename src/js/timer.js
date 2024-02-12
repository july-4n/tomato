/* eslint-disable require-jsdoc */

export class Timer {
  constructor({time = 25, pauseTime = 5, longPauseTime = 15, tasks = []}) {
    if (Timer.instance) {
      return Timer.instance;
    }
    this.time = Math.floor(time);
    this.pauseTime = pauseTime;
    this.longPauseTime = longPauseTime;
    this.tasks = tasks;
    this.activeTask = null;
    this.timerId = null;
    this.remainingTime = 0;
    Timer.instance = this;
  }

  addTask(task) {
    this.tasks.push(task);
    return this;
  }

  findTask(id) {
    return this.tasks.find((task) => task.id === id);
  }

  removeTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  activateTask(id) {
    this.activeTask = this.findTask(id);
    return this;
  }

  runTask(time) {
    if (!this.activeTask) {
      console.warn('Нет активной задачи');
      return;
    }

    const timeInSeconds = time * 60;
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.updateTimerDisplay(timeInSeconds);
  }

  updateTimerDisplay(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const timerText = document.querySelector('.window__timer-text');
    timerText.textContent = `${formattedMinutes}:${formattedSeconds}`;

    this.timerId = setTimeout(() => {
      timeInSeconds--;
      this.updateTimerDisplay(timeInSeconds);
    }, 1000);

    this.remainingTime = timeInSeconds;

    if (timeInSeconds <= 0) {
      clearTimeout(this.timerId);

      if (this.activeTask.count === 0) {
        this.runTask(this.pauseTime);
      } else if (this.activeTask.count % 3 === 0) {
        this.runTask(this.longPauseTime);
      } else {
        this.runTask(this.time);
      }

      this.increaseCountTask(this.activeTask.id);
    }
  }

  increaseCountTask(id) {
    this.findTask(id).increaseCount();
  }

  pauseTimer() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  resumeTimer() {
    if (this.remainingTime > 0) {
      this.runTask(this.remainingTime / 60);
    }
  }

  clearTimer() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
}

