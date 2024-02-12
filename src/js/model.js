/* eslint-disable require-jsdoc */
import {Timer} from './timer';
import {StandardTask, ImportantTask, UnimportantTask} from './task';
export const importanceLevels = ['standard', 'important', 'unimportant'];
export class Model {
  constructor() {
    this.timer = new Timer({});
    this.importanceLevels = importanceLevels;
    this.deadlineTime = null;
    this.deadlineTimerStarted = false;
    this.deadlineId = null;
    this.isTimerRunning = false;
    this.isTimerPaused = false;
  }

  formSubmit(title, importanceValue) {
    let task;

    if (importanceValue === this.importanceLevels[0]) {
      task = new StandardTask(title);
    } else if (importanceValue === this.importanceLevels[1]) {
      task = new ImportantTask(title);
    } else if (importanceValue === this.importanceLevels[2]) {
      task = new UnimportantTask(title);
    }

    this.timer.addTask(task);
    this.deadlineTime += this.timer.time;

    return {task, deadlineTime: this.deadlineTime};
  }

  activateTask(taskId) {
    this.timer.activateTask(taskId);
    const activeTaskIndex = this.timer.tasks.indexOf(this.timer.activeTask);
    return activeTaskIndex;
  }

  moveTaskToFirstPlace(activeTaskIndex) {
    const activeTask = this.timer.tasks.splice(activeTaskIndex, 1)[0];
    this.timer.tasks.unshift(activeTask);
    this.isTimerRunning = false;
  }

  hasTasks() {
    return this.timer.tasks.length > 0;
  }

  resetTimer() {
    this.deadlineTime = 0;
    this.deadlineTimerStarted = false;
    clearInterval(this.deadlineId);
    this.timer.clearTimer();
    this.isTimerRunning = false;
    this.isTimerPaused = false;
    this.timer.activeTask = null;
  }

  updateDeadlineTime() {
    if (this.hasTasks()) {
      this.deadlineTime -= this.timer.time;
      this.deadlineTime = this.deadlineTime < 0 ? 0 : this.deadlineTime;
      return this.deadlineTime;
    }

    if (this.timer.tasks.length <= 0 || this.deadlineTime <= 0) {
      this.resetTimer();
    }
  }

  stopButton() {
    this.timer.pauseTimer();
    this.isTimerPaused = true;
  }

  startDeadlineTimer(updateDeadlineTimer) {
    if (!this.deadlineTimerStarted) {
      this.deadlineId = setInterval(() => {
        this.deadlineTime--;
        updateDeadlineTimer(this.deadlineTime);

        if (this.deadlineTime <= 0) {
          clearInterval(this.deadlineId);
          this.deadlineTimerStarted = false;
          const deadlineTimerText =
              document.querySelector('.tasks__deadline');
          deadlineTimerText.textContent = 'Время вышло';
        }
      }, 60000);

      this.deadlineTimerStarted = true;
    }
  }

  startButton(updateDeadlineTimer) {
    if (!this.isTimerRunning && this.timer.activeTask) {
      this.timer.runTask(this.timer.time);
      this.startDeadlineTimer(updateDeadlineTimer);
      this.isTimerRunning = true;
      this.isTimerPaused = false;
    } else if (this.isTimerPaused) {
      this.timer.resumeTimer();
      this.isTimerPaused = false;
    }
    return this.deadlineTime;
  }

  renameTask(taskId, newTitleTask) {
    const taskToUpdate = this.timer.findTask(taskId);
    if (taskToUpdate) {
      taskToUpdate.changeTitle(newTitleTask);
    }
    return taskToUpdate;
  }

  removeTask(taskId) {
    const firstTaskId = this.timer.tasks[0].id;
    this.timer.removeTask(taskId);

    if (taskId === firstTaskId) {
      this.timer.clearTimer();
      this.isTimerRunning = false;
      this.isTimerPaused = false;
      this.timer.activeTask = null;
    }
    return firstTaskId;
  }

  clearTasks() {
    if (this.deadlineTime === 0 && this.timer.tasks.length > 0) {
      this.timer.tasks = [];
      this.resetTimer();
      return true;
    }
    return false;
  }
}
