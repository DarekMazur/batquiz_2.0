import * as style from './QuizStyle.scss';

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

    if (e.target.parentElement.querySelector('.selectDifficulty--active')) {
      e.target.parentElement
        .querySelector('.selectDifficulty--active')
        .classList.remove('selectDifficulty--active');
    }

    e.target.classList.add('selectDifficulty--active');
    document.querySelector('.alertMessage').innerHTML = '';
  };

  const handleNameChange = (e) => {
    userName = e.target.value.toString();
    document.querySelector('.alertMessage').innerHTML = '';
  };

  const handleReset = () => {
    quizDifficulty = initialState.quizDifficulty;
    userName = initialState.userName;
    document.querySelector(`.nameForm`).value = '';
    document.querySelector('.alertMessage').innerHTML = '';
    document
      .querySelector('.selectDifficulty--active')
      .classList.remove('selectDifficulty--active');
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
    document.querySelector('.quiz__introduction').innerHTML = '';
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

  const introductionMessage = document.createElement('div');
  introductionMessage.classList.add('quiz__introduction');
  introductionMessage.innerHTML = `
    <p><span class='bat'>Batman</span>, Człowiek-Nietoperz, Zamaskowany Krzyżowiec, Mroczny Rycerz, Strażnik Gotham, Gacek. Postać-legenda. Uznany za największego bohatera wszechczasów przez magazyn SFX. Człowiek, któy pomimo braku supermocy (o ile za supermoc nie uznać liczby zer na koncie) jest w stanie pokonać najpotężniejszych przedstawicieli Universum DC. Dziś nadszedł czas, by sprawdzić swoją wiedzę o Człowieku-Nietoperzu. Pytania są podzielone na trzy kategorie - łatwe, normalne i trudne. Jednak jeżeli swoje informacje o Mrocznym Rycerzu czerpiesz z filmów, to w Arkham mają już przygotowaną celę.</p>
    <p>Przed Tobą 10 pytań. Czas rozruszać szare komórki i odpowiedzieć na pytanie - Jak dobrze znasz Zamaskowanego Krzyżowca!</p>
  `;

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
      <input class='nameForm' name='name' />
      <label for='name'>Imię/Nick</label>
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
    quizWrapper.appendChild(introductionMessage);
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
    .then(document.querySelector(`.nameForm`).addEventListener('change', handleNameChange))
    .then(document.querySelector(`button[name='reset']`).addEventListener('click', handleReset))
    .then(
      document.querySelector(`button[name='submit']`).addEventListener('click', handleClickStart),
    );
};

export default QuizInit;
