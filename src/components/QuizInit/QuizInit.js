import { buildQuizBody } from '../../utils/buildQuizBody';
import { createButtonList } from '../../utils/createButtonList';
import GetHeader from '../GetHeader/GetHeader';

const QuizInit = (appBody) => {
  const initialState = {
    quizDifficulty: '',
    userName: '',
    viewType: 'onInit',
  };

  let quizDifficulty = initialState.quizDifficulty;
  let userName = initialState.userName;

  const handleClickAnswer = (e) => {
    if (e.target.parentElement.querySelector('.listItem--active')) {
      e.target.parentElement
        .querySelector('.listItem--active')
        .classList.remove('listItem--active');
    }

    e.target.classList.add('listItem--active');
  };

  const handleDifficultyClick = (e) => {
    quizDifficulty = e.target.name;
    document.querySelector('.alertMessage').innerHTML = '';
  };

  const handleNameChange = (e) => {
    userName = e.target.value;
    document.querySelector('.alertMessage').innerHTML = '';
  };

  const handleReset = () => {
    quizDifficulty = initialState.quizDifficulty;
    userName = initialState.userName;
    document.querySelector(`.nameForm_playerName`).value = '';
    document.querySelector('.alertMessage').innerHTML = '';
  };

  const handleClickStart = async function () {
    await buildQuizBody(quizDifficulty);
    GetHeader(quizTitle, 'onQuiz', userName, quizDifficulty);
    document.querySelectorAll(`.listItem`).forEach((listItem) => {
      listItem.addEventListener('click', handleClickAnswer);
    });
  };

  const quizWrapper = document.createElement('section');
  quizWrapper.classList.add('quiz');

  const quizTitle = document.createElement('h3');
  quizTitle.classList.add('quiz__title');
  GetHeader(quizTitle, initialState.viewType);

  const quizBody = document.createElement('div');
  quizBody.classList.add('quiz__wrapper');

  const renderInitialQuizBody = async () => {
    quizBody.innerHTML = `
  <div class='buttonWrapper'>
    ${createButtonList(['easy', 'normal', 'hard'], 'selectDifficulty')}
  </div>
  <input class='nameForm_playerName' name='name' />
  <label for='name'>Your nickname</label>
  <p class='alertMessage'>
  </p>
  `;
    const quizNav = document.createElement('div');
    quizNav.classList.add('quiz__navigation');

    quizNav.innerHTML = `
  <button name='submit'>Start</button>
  <button name='reset'>Reset</button>
  `;
    quizWrapper.appendChild(quizTitle);
    quizWrapper.appendChild(quizBody);
    quizWrapper.appendChild(quizNav);

    appBody.appendChild(quizWrapper);
  };

  renderInitialQuizBody()
    .then(
      document.querySelectorAll(`.selectDifficulty`).forEach((button) => {
        button.addEventListener('click', handleDifficultyClick);
      }),
    )
    .then(
      document.querySelector(`.nameForm_playerName`).addEventListener('change', handleNameChange),
    )
    .then(document.querySelector(`button[name='reset']`).addEventListener('click', handleReset))
    .then(
      document.querySelector(`button[name='submit']`).addEventListener('click', handleClickStart),
    );

  /* 
    onQuiz: <button>Check</button><button>Give up</button>
    onBonus: <button>Check</button>
    onQuizEnd: <button>Quit</button>
  */
};

export default QuizInit;
