/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import {dataInstruction} from './model.js';

export class RenderTomato {
  constructor(root) {
    this.root = root;

    this.main = document.createElement('main');
    this.section = document.createElement('section');
    this.section.classList.add('main');
    this.container = document.createElement('div');
    this.container.classList.add('container', 'main__container');

    this.inner = document.createElement('div');
    this.inner.classList.add('pomodoro-form', 'window');
  }

  createHeader() {
    const header = document.createElement('header');
    const sectionHeader = document.createElement('section');
    sectionHeader.classList.add('header');
    const containerHeader = document.createElement('div');
    containerHeader.classList.add('container', 'header__container');
    const img = document.createElement('img');
    img.src = 'img/svg/noto_tomato.svg';
    img.alt = 'Tomato image';
    img.classList.add('header__logo');

    return {
      header, sectionHeader, containerHeader, img,
    };
  }

  renderHeader() {
    const {header, sectionHeader, containerHeader, img} = this.createHeader();
    header.append(sectionHeader);
    sectionHeader.append(containerHeader);
    containerHeader.append(img);

    return {header};
  }

  createWindowPanel() {
    const windowPanel = document.createElement('div');
    windowPanel.classList.add('window__panel');
    const windowPanelTitle = document.createElement('p');
    windowPanelTitle.classList.add('window__panel-title');
    windowPanelTitle.textContent = 'Сверстать сайт';
    const windowPanelText = document.createElement('p');
    windowPanelText.classList.add('window__panel-task-text');
    windowPanelText.textContent = 'Томат 2';

    return {
      windowPanel, windowPanelTitle, windowPanelText,
    };
  }

  createWindowBody() {
    const windowBody = document.createElement('div');
    windowBody.classList.add('window__body');
    const windowTimerText = document.createElement('p');
    windowTimerText.classList.add('window__timer-text');
    windowTimerText.textContent = '25:00';

    const windowBtns = document.createElement('div');
    windowBtns.classList.add('window__buttons');
    const windowBtnPrimary = document.createElement('button');
    windowBtnPrimary.classList.add('button', 'button-primary');
    windowBtnPrimary.textContent = 'Старт';
    const windowBtnSecondary = document.createElement('button');
    windowBtnSecondary.classList.add('button', 'button-secondary', 'hidden');
    windowBtnSecondary.textContent = 'Стоп';

    return {
      windowBody, windowTimerText, windowBtns, windowBtnPrimary, windowBtnSecondary,
    };
  }

  renderWindowPanel() {
    const {windowPanel, windowPanelTitle, windowPanelText} = this.createWindowPanel();
    windowPanel.append(windowPanelTitle, windowPanelText);
    return {windowPanel};
  }

  renderWindowBody() {
    const {windowBody, windowTimerText, windowBtns, windowBtnPrimary, windowBtnSecondary,
    } = this.createWindowBody();

    windowBody.append(windowTimerText, windowBtns);
    windowBtns.append(windowBtnPrimary, windowBtnSecondary);
    return {windowBody};
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
    btnImportance.classList.add('button', 'button-importance', 'default');
    btnImportance.ariaLabel = 'Указать важность';
    btnImportance.type = 'button';
    const addBtn = document.createElement('button');
    addBtn.classList.add('button', 'button-primary', 'task-form__add-button');
    addBtn.textContent = 'Добавить';
    addBtn.type = 'submit';

    return {
      form, input, btnImportance, addBtn,
    };
  }

  renderForm() {
    const {form, input, btnImportance, addBtn} = this.createForm();
    form.append(input, btnImportance, addBtn);
    return {form};
  }

  createInstruction() {
    const manual = document.createElement('div');
    manual.classList.add('manual');

    const details = document.createElement('details');
    details.classList.add('manual__details');

    const summary = document.createElement('summary');
    summary.classList.add('manual__title', 'tasks__header-title');
    summary.textContent = 'Инструкция';

    const manualList = document.createElement('ol');
    manualList.classList.add('manual__list');

    return {
      manual, details, summary, manualList,
    };
  }

  renderInstruction(data) {
    const {manual, details, summary, manualList} = this.createInstruction();

    manual.append(details);
    details.append(summary, manualList);

    const items = data.map(el => {
      const manualItem = document.createElement('li');
      manualItem.classList.add('manual__item');
      manualItem.innerHTML = el;
      return manualItem;
    });
    manualList.append(...items);

    return {manual};
  }

  renderItem() {
    const tasksListItem = document.createElement('li');
    tasksListItem.classList.add('tasks__item', 'important');

    const countNumber = document.createElement('span');
    countNumber.classList.add('count-number');
    countNumber.textContent = '';
    const tasksText = document.createElement('button');
    tasksText.classList.add('tasks__text', 'tasks__text_active');
    tasksText.textContent = '';
    const tasksBtn = document.createElement('button');
    tasksBtn.classList.add('tasks__button');

    const popup = document.createElement('div');
    popup.classList.add('popup', 'popup_active');
    const editBtn = document.createElement('button');
    editBtn.classList.add('popup__button', 'popup__edit-button');
    editBtn.textContent = 'Редактировать';
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('popup__button', 'popup__delete-button');
    deleteBtn.textContent = 'Удалить';

    tasksListItem.append(countNumber, tasksText, tasksBtn, popup);
    popup.append(editBtn, deleteBtn);

    return {tasksListItem};
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
    const {tasksListItem} = this.renderItem();
    tasksList.append(tasksListItem);
    const taskDeadline = document.createElement('p');
    taskDeadline.classList.add('tasks__deadline');
    taskDeadline.textContent = '1 час 30 мин';

    return {
      pomodoroTasks, tasks, titleMain, tasksList, taskDeadline,
    };
  }

  renderTasksBlock(data) {
    const {pomodoroTasks, tasks, titleMain, tasksList, taskDeadline} = this.createTasksBlock();
    this.manual = this.renderInstruction(data);
    pomodoroTasks.append(tasks, this.manual.manual);
    tasks.append(titleMain, tasksList, taskDeadline);
    return {pomodoroTasks};
  }

  render() {
    this.header = this.renderHeader();
    this.root.append(this.header.header);
    this.form = this.renderForm();
    this.windowPanel = this.renderWindowPanel();
    this.windowBody = this.renderWindowBody();
    this.pomodoroTasks = this.renderTasksBlock(dataInstruction);

    this.root.append(this.main);
    this.main.append(this.section);
    this.section.append(this.container);
    this.container.append(this.inner, this.pomodoroTasks.pomodoroTasks);

    this.inner.append(this.windowPanel.windowPanel, this.windowBody.windowBody, this.form.form);
  }
}

// export const view = new RenderTomato(document.getElementById('app'));
// view.render();


// const tasks = new Tomato({
//   time: 30,
// });

// const form = document.querySelector('.task-form');
// const controller = new ControllerTomato(tasks);

// const task = controller.getTask(form);
// const renderTask = view.renderItem(task);
