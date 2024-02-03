/* eslint-disable require-jsdoc */
class Task {
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


export const taskOne = new Task('Say hello', 1);
