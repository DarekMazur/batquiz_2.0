import { buildQuizBody } from '../../utils/buildQuizBody';
import { createButtonList } from '../../utils/createButtonList';
import GetHeader from '../GetHeader/GetHeader';

const QuizInit = (appBody) => {
  const initialState = {
    quizDifficulty: '',
    userName: '',
    viewType: 'onInit',
  };

  const handleClickAnswer = (e) => {
    if (e.target.parentElement.querySelector('.listItem--active')) {
      e.target.parentElement
        .querySelector('.listItem--active')
        .classList.remove('listItem--active');
    }

    e.target.classList.add('listItem--active');
  };

  const quizWrapper = document.createElement('section');
  quizWrapper.classList.add('quiz');

  const quizTitle = document.createElement('h3');
  quizTitle.classList.add('quiz__title');
  GetHeader(quizTitle, initialState.viewType);

  const quizBody = document.createElement('div');
  quizBody.classList.add('quiz__wrapper');
  quizBody.innerHTML = `
  <div>
    ${createButtonList(['easy', 'normal', 'hard'])}
  </div>
  <input />
  <div>
  </div>
  `;

  const quizNav = document.createElement('div');
  quizNav.classList.add('quiz__navigation');

  quizNav.innerHTML = `
  <button name='submit'>Start</button>
  <button name='reset'>Reset</button>
  `;
  /* 
    onQuizStart: <button>Check</button><button>Give up</button>
    onBonus: <button>Check</button>
    onQuizEnd: <button>Quit</button>
  */

  quizWrapper.appendChild(quizTitle);
  quizWrapper.appendChild(quizBody);
  quizWrapper.appendChild(quizNav);

  appBody.appendChild(quizWrapper);

  // (async function () {
  //   await buildQuizBody(initialState.quizDifficulty);
  //   GetHeader(quizTitle, 'onQuiz', initialState.userName, initialState.quizDifficulty);
  //   document.querySelectorAll(`.listItem`).forEach((listItem) => {
  //     listItem.addEventListener('click', handleClickAnswer);
  //   });
  // })();
};

export default QuizInit;
