import answers from 'url:/src/utils/api/answers.json';

export const getAnswers = (difficulty, questionType) =>
  fetch(answers)
    .then((response) => response.json())
    .then((data) => data[questionType][difficulty]);
