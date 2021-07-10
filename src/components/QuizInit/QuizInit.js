import { buildQuizBody } from '../../utils/buildQuizBody';
import { countResult } from '../../utils/countResult';
import { createButtonList } from '../../utils/createButtonList';
import getHeader from '../../utils/getHeader';
import getUserAnswers from '../../utils/getUserAnswers';
import { handleClickAnswer } from '../../utils/handlers';

const QuizInit = (appBody) => {
  const initialState = {
    quizDifficulty: '',
    userName: '',
    viewType: 'onInit',
    count: null,
  };

  let quizDifficulty = initialState.quizDifficulty;
  let userName = initialState.userName;
  let viewType = initialState.viewType;
  let count = initialState.count;

  const handleAnswer = (e) => handleClickAnswer(e);

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

  const handleQuizSubmit = () => {
    const sendAnswers = () => {
      countResult(
        getUserAnswers(document.querySelectorAll('.listItem--active')),
        quizDifficulty,
        count === null ? 'quiz' : 'bonus',
        userName,
      );
    };
    if (document.querySelectorAll('.listItem--active').length < 10) {
      if (confirm('Quiz is not finished yet. Are you sure you want to continue?')) {
        sendAnswers();
      } else {
        null;
      }
    }
    sendAnswers();
  };

  const handleQuizGiveUp = () => {
    if (confirm('Are you sure you want to quit?')) {
      location.reload();
    } else {
      null;
    }
  };

  const handleClickStart = async function () {
    if (quizDifficulty === '') {
      try {
        throw new Error('Choose quiz difficulty');
      } catch (e) {
        return (document.querySelector('.alertMessage').innerHTML = e.message);
      }
    } else if (userName === '' || userName === ' ') {
      try {
        throw new Error(`Don't be shy, introduce yourself!`);
      } catch (e) {
        return (document.querySelector('.alertMessage').innerHTML = e.message);
      }
    }

    await buildQuizBody(quizDifficulty);
    getHeader(quizTitle, 'onQuiz', userName, quizDifficulty);
    document.querySelectorAll(`.listItem`).forEach((listItem) => {
      listItem.addEventListener('click', handleAnswer);
    });
    document.querySelector(`.quiz__navigation`).innerHTML = `
        <button name='resolve'>Send!</button>
        <button name='giveUp'>Give up</button>
      `;

    document.querySelector(`button[name='resolve']`).addEventListener('click', handleQuizSubmit);
    document.querySelector(`button[name='giveUp']`).addEventListener('click', handleQuizGiveUp);
  };

  const quizWrapper = document.createElement('section');
  quizWrapper.classList.add('quiz');

  const quizTitle = document.createElement('h3');
  quizTitle.classList.add('quiz__title');
  getHeader(quizTitle, viewType);

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
};

export default QuizInit;
