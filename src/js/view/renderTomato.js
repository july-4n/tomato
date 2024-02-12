/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import {dataInstruction} from '../data';
import {importanceLevels} from '../model';
import {Controller} from '../controller';
import {RenderTask} from '../view/renderTask';
import {Timer} from '../timer';
import {pluralize} from './pluralize';

const timer = new Timer({});

export class RenderTomato {
  constructor(root) {
    this.root = root;
    this.controller = new Controller();
    this.header = this.createHeader();
    this.main = this.createMain();
    this.modalOverlay = this.createModalOverlay();
    this.countStyleButton = 1;
    this.render();
    this.bindListeners();
  }

  createHeader() {
    const header = document.createElement('header');
    const sectionHeader = document.createElement('section');
    sectionHeader.classList.add('header');
    const containerHeader = document.createElement('div');
    containerHeader.classList.add('container', 'header__container');
    const img = document.createElement('img');
    img.src = require('../../img/svg/noto_tomato.svg');
    img.alt = 'Tomato image';
    img.classList.add('header__logo');
    const headerTitle = document.createElement('h1');
    headerTitle.classList.add('header__title');
    headerTitle.textContent = 'Tomato timer';

    header.append(sectionHeader);
    sectionHeader.append(containerHeader);
    containerHeader.append(img);
    containerHeader.append(headerTitle);

    return header;
  }

  createMain() {
    const main = document.createElement('main');
    const section = document.createElement('section');
    section.classList.add('main');
    const containerMain = document.createElement('div');
    containerMain.classList.add('container', 'main__container');

    const inner = document.createElement('div');
    inner.classList.add('pomodoro-form', 'window');
    this.form = this.createForm();
    this.windowPanel = this.createWindowPanel();
    this.windowBody = this.createWindowBody();
    this.pomodoroTasks = this.createTasksBlock();

    inner.append(this.windowPanel, this.windowBody, this.form);
    main.append(section);
    section.append(containerMain);
    containerMain.append(inner, this.pomodoroTasks);

    this.main = main;

    return main;
  }

  createWindowPanel() {
    const windowPanel = document.createElement('div');
    windowPanel.classList.add('window__panel');
    const windowPanelTitle = document.createElement('p');
    windowPanelTitle.classList.add('window__panel-title');
    const windowPanelText = document.createElement('p');
    windowPanelText.classList.add('window__panel-task-text', 'window__panel-task_active');
    windowPanelText.textContent = '';

    windowPanel.append(windowPanelTitle, windowPanelText);

    this.windowPanelTitle = windowPanelTitle;
    this.windowPanelText = windowPanelText;

    return windowPanel;
  }

  createWindowBody() {
    const windowBody = document.createElement('div');
    windowBody.classList.add('window__body');
    const windowTimerText = document.createElement('p');
    windowTimerText.classList.add('window__timer-text');
    windowTimerText.textContent = '00:00';
    const windowBtns = document.createElement('div');
    windowBtns.classList.add('window__buttons');
    const windowBtnPrimary = document.createElement('button');
    windowBtnPrimary.classList.add('button', 'button-primary');
    windowBtnPrimary.textContent = 'Старт';
    const windowBtnSecondary = document.createElement('button');
    windowBtnSecondary.classList.add('button', 'button-secondary');
    windowBtnSecondary.textContent = 'Стоп';

    windowBody.append(windowTimerText, windowBtns);
    windowBtns.append(windowBtnPrimary, windowBtnSecondary);

    this.windowTimerText = windowTimerText;
    this.windowBtnPrimary = windowBtnPrimary;
    this.windowBtnSecondary = windowBtnSecondary;

    return windowBody;
  }

  createForm() {
    const form = document.createElement('form');
    form.classList.add('task-form');
    form.action = 'submit';

    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('task-name', 'input-primary');
    input.name = 'task-name';
    input.id = 'task-name';
    input.placeholder = 'название задачи';

    const btnImportance = document.createElement('button');
    btnImportance.classList.add('button', 'button-importance', 'standard');
    btnImportance.ariaLabel = 'Указать важность';
    btnImportance.setAttribute('data-importance', 'standard');
    btnImportance.type = 'button';
    const addBtn = document.createElement('button');
    addBtn.classList.add('button', 'button-primary', 'task-form__add-button');
    addBtn.textContent = 'Добавить';
    addBtn.type = 'submit';

    form.append(input, btnImportance, addBtn);

    this.form = form;
    this.inputTitle = input;
    this.btnImportance = btnImportance;

    return form;
  }

  createInstruction(data) {
    const manual = document.createElement('div');
    manual.classList.add('manual');

    const details = document.createElement('details');
    details.classList.add('manual__details');

    const summary = document.createElement('summary');
    summary.classList.add('manual__title', 'tasks__header-title');
    summary.textContent = 'Инструкция';

    const manualList = document.createElement('ol');
    manualList.classList.add('manual__list');

    manual.append(details);
    details.append(summary, manualList);

    const items = data.map(el => {
      const manualItem = document.createElement('li');
      manualItem.classList.add('manual__item');
      manualItem.innerHTML = el;
      return manualItem;
    });
    manualList.append(...items);

    return manual;
  }

  createTasksBlock() {
    const pomodoroTasks = document.createElement('div');
    pomodoroTasks.classList.add('pomodoro-tasks');
    const tasks = document.createElement('div');
    tasks.classList.add('tasks');
    const titleMain = document.createElement('p');
    titleMain.classList.add('tasks__title');
    titleMain.textContent = 'Задачи:';
    const tasksList = document.createElement('ul');
    tasksList.classList.add('tasks__list');

    const taskDeadline = document.createElement('p');
    taskDeadline.classList.add('tasks__deadline');

    this.manual = this.createInstruction(dataInstruction);
    pomodoroTasks.append(tasks, this.manual);
    tasks.append(titleMain, tasksList, taskDeadline);

    this.tasksList = tasksList;
    this.taskDeadline = taskDeadline;

    return pomodoroTasks;
  }

  createModalOverlay() {
    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal-overlay');
    const modalDelete = document.createElement('div');
    modalDelete.classList.add('modal-delete');
    const modalDeleteTitle = document.createElement('p');
    modalDeleteTitle.classList.add('modal-delete__title');
    modalDeleteTitle.textContent = 'Удалить задачу?';
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('modal-delete__close-button');
    const btnPrimary = document.createElement('button');
    btnPrimary.classList.add('modal-delete__delete-button', 'button-primary');
    btnPrimary.textContent = 'Удалить';
    const btnCancel = document.createElement('button');
    btnCancel.classList.add('modal-delete__cancel-button');
    btnCancel.textContent = 'Отмена';

    modalDelete.append(modalDeleteTitle, closeBtn, btnPrimary, btnCancel);
    modalOverlay.append(modalDelete);
    return modalOverlay;
  }

  render() {
    this.root.append(this.header);
    this.root.append(this.main);
    this.root.append(this.modalOverlay);
  }

  formSubmitClick = (evt) => {
    evt.preventDefault();
    const form = this.form;
    const tasksList = this.tasksList;

    const taskFormValue = this.inputTitle.value.trim();
    if (taskFormValue === '') return;

    const delTasks = this.controller.onClearTasks();
    const tasks = tasksList.querySelectorAll('li');

    if (tasks.length > 0 && delTasks) {
      for (const task of tasks) {
        task.remove();
      }
    }
    this.configureInitialValues();

    const formData = new FormData(form);

    const title = formData.get('task-name').trim();
    const importanceValue = this.btnImportance.getAttribute('data-importance');
    const {task, deadlineTime} = this.controller.onFormSubmit(title, importanceValue);
    this.addTaskToList(task, deadlineTime);
  };

  btnImportanceClick = ({target}) => {
    target.classList.remove(...importanceLevels);
    target.classList.add(importanceLevels[this.countStyleButton]);
    target.setAttribute('data-importance', importanceLevels[this.countStyleButton]);

    this.countStyleButton = (this.countStyleButton + 1) % importanceLevels.length;
  };

  taskTextClick = (task, taskId) => {
    if (!timer.activeTask || taskId !== timer.activeTask.id) {
      const activeTaskIndex = this.controller.onActiveTask(taskId);
      const activeTaskText = task.querySelector('.tasks__text');

      if (!activeTaskText.classList.contains('tasks__text_active')) {
        this.controller.onMoveTaskToFirstPlace(activeTaskIndex);
        this.updateTaskList(activeTaskIndex);
      }
    }
  };

  deleteButtonClick = () => {
    const deadlineTime = this.controller.onDeadlineTime();
    this.updateDeadlineTimer(deadlineTime);

    timer.tasks.length > 0 ?
      this.updateWindowPanel() : this.configureInitialValues();
  };

  bindListeners() {
    const form = this.form;
    const tasksList = this.tasksList;
    const windowTimerText = this.windowTimerText;
    const btnImportance = this.btnImportance;
    const windowBtnSecondary = this.windowBtnSecondary;
    const windowBtnPrimary = this.windowBtnPrimary;

    form.addEventListener('keydown', (evt) => {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        form.dispatchEvent(new Event('submit'));
      }
    });

    form.addEventListener('submit', this.formSubmitClick);

    btnImportance.addEventListener('click', this.btnImportanceClick);

    tasksList.addEventListener('click', ({target}) => {
      const task = target.closest('.tasks__item');
      const taskId = task.getAttribute('data-id');
      if (target.closest('.tasks__text')) {
        this.taskTextClick(task, taskId);
      }

      if (target.closest('.tasks__button')) {
        const popup = task.querySelector('.popup');
        popup.classList.toggle('popup_active');
        this.closeAllMenus(task);

        const editButton = task.querySelector('.popup__edit-button');
        const taskText = task.querySelector('.tasks__text');
        const titleTask = taskText.textContent;

        editButton.addEventListener('click', () => {
          this.setCursorToEnd(taskText);
        });

        document.addEventListener('click', ({target}) => {
          if (!target.closest('.tasks__text') &&
            !target.closest('.popup__edit-button')) {
            taskText.contentEditable = false;
            const newTitleTask = taskText.textContent.trim();
            if (newTitleTask === '') {
              taskText.textContent = titleTask;
            } else {
              taskText.textContent = newTitleTask;
              const taskToUpdate =
                this.controller.onRenameTask(taskId, newTitleTask);
              if (taskToUpdate) {
                this.updateWindowPanel();
              }
            }
          }
        });

        const delButton = task.querySelector('.popup__delete-button');
        delButton.addEventListener('click', () => {
          this.modalOverlay.style.display = 'block';
          this.modalOverlay.setAttribute('data-task-id', taskId);
        });

        let taskDeleted = false;

        this.modalOverlay.addEventListener('click', ({target}) => {
          if (target.classList.contains('modal-delete__close-button') ||
            target.classList.contains('modal-delete__cancel-button')) {
            this.closeModal(this.modalOverlay);
          }

          if (target.classList.contains('modal-delete__delete-button') &&
            !taskDeleted) {
            taskDeleted = true;
            const taskIdToDelete = this.modalOverlay.getAttribute('data-task-id');
            const taskToRemove = document.querySelector(`[data-id="${taskIdToDelete}"]`);
            const firstTaskId = this.controller.onRemoveTask(taskIdToDelete);

            if (taskIdToDelete === firstTaskId) {
              windowTimerText.textContent = '00:00';
            }

            if (taskToRemove) {
              taskToRemove.remove();
              this.updateCountList();
              this.deleteButtonClick();
            }
            this.closeModal(this.modalOverlay);
          }
        });
      }
    });

    document.addEventListener('click', ({target}) => {
      if (!target.closest('.popup') &&
        !target.closest('.tasks__button')) {
        const popups = document.querySelectorAll('.popup');
        popups.forEach((popup) => {
          this.closeMenu(popup);
        });
      }
    });

    windowBtnSecondary.addEventListener('click', () => {
      this.controller.onStopButton();
    });

    windowBtnPrimary.addEventListener('click', () => {
      this.controller.onStartButton(this.updateDeadlineTimer.bind(this));
    });
  }

  configureInitialValues() {
    this.taskDeadline.textContent = '';
    this.windowPanelTitle.textContent = '';
    this.windowPanelText.textContent = '';
    this.windowTimerText.textContent = '00:00';
  }

  formatTimeWords(minutes) {
    const hourVariations = ['час', 'часа', 'часов'];
    const minuteVariations = ['минута', 'минуты', 'минут'];

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    let formattedHours;

    if (hours >= 1) {
      formattedHours = pluralize(hours, hourVariations);
    }
    const formattedMinutes =
      pluralize(remainingMinutes, minuteVariations);

    return {hours, remainingMinutes, formattedHours, formattedMinutes};
  }

  updateWindowPanel() {
    const windowPanelTitle = this.windowPanelTitle;
    const windowPanelText = this.windowPanelText;
    windowPanelTitle.textContent = timer.tasks[0].title;
    windowPanelText.textContent = timer.tasks[1] ?
      timer.tasks[1].title : '';
  }

  updateDeadlineTimer(minutes) {
    const taskDeadline = this.taskDeadline;
    if (minutes <= 0) {
      taskDeadline.textContent = 'Время вышло';
      return;
    }

    const {
      hours,
      remainingMinutes,
      formattedHours,
      formattedMinutes,
    } = this.formatTimeWords(minutes);

    if (formattedHours && formattedMinutes) {
      taskDeadline.textContent = `
      ${hours} ${formattedHours} ${remainingMinutes} ${formattedMinutes}`;
    } else if (formattedMinutes) {
      taskDeadline.textContent = `${remainingMinutes} ${formattedMinutes}`;
    }
  }

  addTaskToList(task, deadlineTime) {
    const tasksList = this.tasksList;
    const tasks = tasksList.querySelectorAll('li');
    const countList = tasks.length + 1;
    const row = new RenderTask(task, countList);
    tasksList.append(row.tasksListItem);
    this.updateDeadlineTimer(deadlineTime);
    this.updateWindowPanel();
    this.form.reset();
  }

  updateTaskList(activeTaskIndex) {
    const tasksList = this.tasksList;
    const tasks = Array.from(tasksList.querySelectorAll('li'));
    tasks.forEach(task => {
      const taskText = task.querySelector('.tasks__text');
      if (taskText) {
        taskText.classList.remove('tasks__text_active');
      }
    });

    const activeTaskOnPage = tasks.splice(activeTaskIndex, 1)[0];
    const activeTaskText = activeTaskOnPage.querySelector('.tasks__text');
    activeTaskText.classList.add('tasks__text_active');

    tasks.unshift(activeTaskOnPage);
    tasks.forEach((task) => {
      tasksList.append(task);
    });

    this.updateCountList();
    this.updateWindowPanel();
  }

  closeMenu(popup) {
    popup.classList.remove('popup_active');
  }

  closeAllMenus(task) {
    const allTasks = document.querySelectorAll('.tasks__item');
    allTasks.forEach((newTask) => {
      if (newTask !== task) {
        const popup = newTask.querySelector('.popup');
        this.closeMenu(popup);
      }
    });
  }

  setCursorToEnd(element) {
    element.contentEditable = true;
    const range = document.createRange();
    range.selectNodeContents(element);
    range.collapse(false);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  closeModal(element) {
    element.style.display = 'none';
  }

  updateCountList() {
    const tasksList = this.tasksList;
    const tasks = tasksList.querySelectorAll('li');
    tasks.forEach((task, index) => {
      const countNumber = task.querySelector('.count-number');
      countNumber.textContent = index + 1;
    });
  }
}
