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
    userName = e.target.value;
    document.querySelector('.alertMessage').innerHTML = '';
  };

  const handleReset = () => {
    quizDifficulty = initialState.quizDifficulty;
    userName = initialState.userName;
    document.querySelector(`.form__name`).value = '';
    document.querySelector('.alertMessage').innerHTML = '';
    document
      .querySelector('.selectDifficulty--active')
      .classList.remove('selectDifficulty--active');
  };

  const handleQuizSubmit = () => {
    const sendAnswers = () => {
      countResult(
        getUserAnswers(document.querySelectorAll('.listItem--active span')),
        quizDifficulty,
        count === null ? 'quiz' : 'bonus',
        userName,
      );
    };
    if (document.querySelectorAll('.listItem--active').length < 10) {
      if (
        confirm('Nie ma jeszcze odpowiedzi na wszystkie pytania. Czy na pewno chcesz i???? dalej?')
      ) {
        sendAnswers();
      } else {
        null;
      }
    }
    sendAnswers();
  };

  const handleQuizGiveUp = () => {
    if (confirm('Czy na pewno chcesz przerwa???')) {
      location.reload();
    } else {
      null;
    }
  };

  const handleClickStart = async function () {
    if (quizDifficulty === '') {
      try {
        throw new Error(
          'Wiem, ??e jeste?? kozak i chcesz na hardzie, ale musisz nadal wybra?? poziom',
        );
      } catch (e) {
        return (document.querySelector('.alertMessage').innerHTML = e.message);
      }
    } else if (userName === '' || userName === ' ') {
      try {
        throw new Error(`Nie ma si?? czego wstydzi??, podaj jakie?? imi??...`);
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
        <button name='resolve'>Gotowe!</button>
        <button name='giveUp'>Rezygnuj</button>
      `;

    document.querySelector(`button[name='resolve']`).addEventListener('click', handleQuizSubmit);
    document.querySelector(`button[name='giveUp']`).addEventListener('click', handleQuizGiveUp);
  };

  const quizWrapper = document.createElement('section');
  quizWrapper.classList.add('quiz');

  const introductionMessage = document.createElement('div');
  introductionMessage.classList.add('quiz__introduction');
  introductionMessage.innerHTML = `
    <p><span class='bat'>Batman</span>, Cz??owiek-Nietoperz, Zamaskowany Krzy??owiec, Mroczny Rycerz, Stra??nik Gotham, Gacek. Posta??-legenda. Uznany za najwi??kszego bohatera wszechczas??w przez magazyn SFX. Cz??owiek, kt??y pomimo braku supermocy (o ile za supermoc nie uzna?? liczby zer na koncie) jest w stanie pokona?? najpot????niejszych przedstawicieli Universum DC. Dzi?? nadszed?? czas, by sprawdzi?? swoj?? wiedz?? o Cz??owieku-Nietoperzu. Pytania s?? podzielone na trzy kategorie - ??atwe, normalne i trudne. Jednak je??eli swoje informacje o Mrocznym Rycerzu czerpiesz z film??w, to w Arkham maj?? ju?? przygotowan?? cel??.</p>
    <p>Przed Tob?? 10 pyta??. Czas rozrusza?? szare kom??rki i odpowiedzie?? na pytanie - Jak dobrze znasz Zamaskowanego Krzy??owca!</p>
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
      <div class='form'>
        <input id='name' class='form__name' name='name' autocomplete="off" placeholder=" " />
        <label for='name'>Imi??/Nick</label>
      </div>
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
    .then(document.querySelector(`.form__name`).addEventListener('change', handleNameChange))
    .then(document.querySelector(`button[name='reset']`).addEventListener('click', handleReset))
    .then(
      document.querySelector(`button[name='submit']`).addEventListener('click', handleClickStart),
    );
};

export default QuizInit;
