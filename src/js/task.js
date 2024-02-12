/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
export class Task {
  constructor(title, count = 0) {
    this.title = title;
    this.count = count;
    this.id = Math.floor(Math.random() * 1_000_000).toString();
  }

  increaseCount() {
    ++this.count;
  }

  changeTitle(newTitle) {
    this.title = newTitle;
    return this;
  }
}

export class ImportantTask extends Task {
  importance = 'important';

  constructor(title, count = 0) {
    super(title, count);
  }
}

export class StandardTask extends Task {
  importance = 'standard';

  constructor(title, count = 0) {
    super(title, count);
  }
}

export class UnimportantTask extends Task {
  importance = 'unimportant';

  constructor(title, count = 0) {
    super(title, count);
  }
}
