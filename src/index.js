import './scss/index.scss';
import {RenderTomato} from './js/view/renderTomato';

const init = () => {
  new RenderTomato(document.querySelector('body'));
};

init();
