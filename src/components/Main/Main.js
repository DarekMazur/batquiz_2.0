import QuizInit from '../QuizInit/QuizInit';

const Main = () => {
  const mainWrapper = document.createElement('main');
  mainWrapper.classList.add('wrapper');
  document.querySelector('body').appendChild(mainWrapper);
  QuizInit(mainWrapper);
};

export default Main;
