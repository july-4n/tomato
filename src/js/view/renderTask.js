/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
export class RenderTask {
  constructor(task, countList) {
    this.task = task;
    this.countList = countList;
    this.renderItem();
  }

  renderItem() {
    const taskClass = this.countList === 1 ? 'tasks__text_active' : '';

    this.tasksListItem = document.createElement('li');
    this.tasksListItem.classList.add('tasks__item', `${this.task.importance}`);
    this.tasksListItem.setAttribute('data-id', this.task.id);
    const countNumber = document.createElement('span');
    countNumber.classList.add('count-number');
    countNumber.textContent = this.countList;

    const tasksText = document.createElement('button');
    tasksText.classList.add('tasks__text');
    if (taskClass !== '') {
      tasksText.classList.add(taskClass);
    }

    tasksText.textContent = this.task.title;

    const tasksBtn = document.createElement('button');
    tasksBtn.classList.add('tasks__button');

    const popup = document.createElement('div');
    popup.classList.add('popup');

    const editBtn = document.createElement('button');
    editBtn.classList.add('popup__button', 'popup__edit-button');
    editBtn.textContent = 'Редактировать';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('popup__button', 'popup__delete-button');
    deleteBtn.textContent = 'Удалить';

    this.tasksListItem.append(countNumber, tasksText, tasksBtn, popup);
    popup.append(editBtn, deleteBtn);

    return this.tasksListItem;
  }
}
