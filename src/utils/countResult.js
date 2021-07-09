import { buildQuizBody } from './buildQuizBody';
import { buildResutsView } from './buildResultsView';
import { getAnswers } from './getAnswers';
import getHeader from './getHeader';
import getUserAnswers from './getUserAnswers';
import { handleClickAnswer } from './handlers';

const decrease = (difficulty) => {
  switch (difficulty) {
    case 'easy':
      return 2;
    case 'normal':
      return 1.5;
    case 'hard':
      return 1;
  }
};

const increase = (difficulty) => {
  switch (difficulty) {
    case 'easy':
      return 2;
    case 'normal':
      return 5;
    case 'hard':
      return 7;
  }
};

const checkAnswers = async (answers, difficulty, questionType, count) => {
  const answersPattern = await getAnswers(difficulty, questionType);

  answers.forEach((userAnswer) => {
    answersPattern.find((correctAnswer) => {
      if (correctAnswer.id === userAnswer.id) {
        if (correctAnswer.answer.toLowerCase() === userAnswer.answer.toLowerCase()) {
          count += increase(difficulty);
        } else {
          count -= decrease(difficulty);
        }
      }
    });
  });
  return count;
};

export const countResult = async (answers, difficulty, questionType, userName) => {
  let count = 0;

  maxCount = 10 + 10 * increase(difficulty);

  const data = await checkAnswers(answers, difficulty, questionType, count);

  if (questionType === 'quiz') {
    count = 10 + (answers.length - 10) * decrease(difficulty);
  } else if (questionType === 'bonus') {
    count = count;
  }

  count += data;

  if (count === maxCount) {
    const handleAnswer = (e) => handleClickAnswer(e);
    getHeader(document.querySelector('.quiz__title'), 'onBonus', userName, difficulty);
    const renderBonusBody = async () => {
      await buildQuizBody(difficulty, 'bonus');
      const sender = document.querySelector(`.quiz__navigation`);
      sender.innerHTML = `
        <button name='resolveBonus'>Send!</button>
      `;
      document.querySelectorAll(`.listItem`).forEach((listItem) => {
        listItem.addEventListener('click', handleAnswer);
      });
    };
    renderBonusBody();
    const bonusAnswer = async () => {
      const answerPatttern = await getAnswers(difficulty, 'bonus');
      const answer = getUserAnswers(document.querySelectorAll(`.listItem--active`))[0];
      try {
        answerPatttern.find((correctAnswer) => {
          if (correctAnswer.id === answer.id) {
            if (correctAnswer.answer.toLowerCase() === answer.answer.toLowerCase()) {
              count += increase(difficulty) * 2;
            }
          }
        });
        buildResutsView(count, maxCount);
      } catch {
        buildResutsView(count, maxCount);
      }
    };

    document.querySelector(`.quiz__navigation`).addEventListener('click', bonusAnswer);
  } else {
    buildResutsView(count, maxCount);
  }
};
