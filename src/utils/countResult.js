import { getAnswers } from './getAnswers';

const checkAnswers = async (answers, difficulty, questionType) => {
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
};

export const countResult = (answers, difficulty, questionType) => {
  let count = 10;

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

  maxCount = 10 + 10 * increase(difficulty);

  if (answers.length < 10) {
    count = 10 + (answers.length - 10) * decrease(difficulty);
  }

  checkAnswers(answers, difficulty, questionType);

  return count;
};
