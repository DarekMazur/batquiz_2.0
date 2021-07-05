const QuizInit = (appBody) => {
  const quizWrapper = document.createElement('section');
  quizWrapper.classList.add('quiz');

  const quizTitle = document.createElement('h3');
  quizTitle.classList.add('quiz__title');
  quizTitle.innerText = 'Title';

  const quizBody = document.createElement('div');
  quizBody.classList.add('quiz__wrapper');
  quizBody.innerText = 'Wrapper';

  const quizNav = document.createElement('div');
  quizNav.classList.add('quiz__navigation');

  quizNav.innerText = 'Navigation';

  quizWrapper.appendChild(quizTitle);
  quizWrapper.appendChild(quizBody);
  quizWrapper.appendChild(quizNav);

  appBody.appendChild(quizWrapper);
};

export default QuizInit;
