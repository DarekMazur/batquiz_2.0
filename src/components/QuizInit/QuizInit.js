const QuizInit = (appBody) => {
  const quizWrapper = document.createElement('section');
  quizWrapper.classList.add('quiz');

  const quizTitle = document.createElement('h3');
  quizTitle.classList.add('quiz__title');
  quizTitle.innerText = 'Welcome to BatQuiz! Please select game level and set your nickname.'; //initial title
  /* onQuizStart: `Nice to see you ${playerName}, let's face with ${difficulty} quiz!` 
    onBonus: `Great job ${playerName}! Get more points with bonus question!`
    onQuizEnd: DEPENDS ON FINAL RESULTS
  */

  const quizBody = document.createElement('div');
  quizBody.classList.add('quiz__wrapper');
  quizBody.innerHTML =
    '<div><button>Easy</button><button>Normal</button><button>Hard</button></div><input /><div></div>'; //initial state

  const quizNav = document.createElement('div');
  quizNav.classList.add('quiz__navigation');

  quizNav.innerHTML = '<button>SEND</button><button>RESET</button>'; //initial state
  /* 
    onQuizStart: <button>Check</button><button>Give up</button>
    onBonus: <button>Check</button>
    onQuizEnd: <button>Quit</button>
  */

  quizWrapper.appendChild(quizTitle);
  quizWrapper.appendChild(quizBody);
  quizWrapper.appendChild(quizNav);

  appBody.appendChild(quizWrapper);
};

export default QuizInit;
