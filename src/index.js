import './scss/index.scss';
import {taskOne, Tomato, taskTwo} from './js/task';

console.log(taskOne);
console.log(taskTwo);

const tasks = new Tomato({
  time: 1,
  pauseTime: 2,
});

tasks.addTask(taskOne);
tasks.addTask(taskTwo);
tasks.activateTask(taskTwo.id);
tasks.startTask();

console.log(tasks);
