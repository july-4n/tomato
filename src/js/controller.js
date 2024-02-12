/* eslint-disable require-jsdoc */
import {Model} from './model.js';

export class Controller {
  constructor() {
    this.model = new Model();
  }

  onFormSubmit(title, importanceValue) {
    return this.model.formSubmit(title, importanceValue);
  }

  onActiveTask(taskId) {
    return this.model.activateTask(taskId);
  }

  onMoveTaskToFirstPlace(activeTaskIndex) {
    this.model.moveTaskToFirstPlace(activeTaskIndex);
  }

  onDeadlineTime() {
    return this.model.updateDeadlineTime();
  }

  onStopButton() {
    this.model.stopButton();
  }

  onStartButton(updateDeadlineTimer) {
    this.model.startButton(updateDeadlineTimer);
  }

  onRenameTask(taskId, newTitleTask) {
    return this.model.renameTask(taskId, newTitleTask);
  }

  onRemoveTask(taskId) {
    return this.model.removeTask(taskId);
  }

  onClearTasks() {
    return this.model.clearTasks();
  }
}
