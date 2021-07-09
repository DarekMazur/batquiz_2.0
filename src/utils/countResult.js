import { buildQuizBody } from './buildQuizBody';
import { getAnswers } from './getAnswers';
import getHeader from './getHeader';

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
  // console.log(count);
  return count;
};

export const countResult = async (answers, difficulty, questionType, userName) => {
  let count = 0;

  // const decrease = (difficulty) => {
  //   switch (difficulty) {
  //     case 'easy':
  //       return 2;
  //     case 'normal':
  //       return 1.5;
  //     case 'hard':
  //       return 1;
  //   }
  // };

  // const increase = (difficulty) => {
  //   switch (difficulty) {
  //     case 'easy':
  //       return 2;
  //     case 'normal':
  //       return 5;
  //     case 'hard':
  //       return 7;
  //   }
  // };

  maxCount = 10 + 10 * increase(difficulty);

  const data = await checkAnswers(answers, difficulty, questionType, count);
  // console.log(data);

  if (questionType === 'quiz') {
    count = 10 + (answers.length - 10) * decrease(difficulty);
  } else if (questionType === 'bonus') {
    count = count;
  }

  // console.log(`pre: ${count}`);

  // console.log(checkAnswers(answers, difficulty, questionType, count));
  count += data;

  if (count === maxCount) {
    getHeader(document.querySelector('.quiz__title'), 'onBonus', userName, difficulty);
    buildQuizBody(difficulty, 'bonus');
  }
  // console.log(`maxCount: ${maxCount}`);
  // console.log(`count: ${count}`);

  return count;
};
