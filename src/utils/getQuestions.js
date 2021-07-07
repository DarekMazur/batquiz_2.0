const questions = require('url:/src/utils/api/questions.json');
const bonus = require('url:/src/utils/api/bonus-questions.json');

export const getQuestions = (difficulty, questionType) =>
  fetch(questionType ? bonus : questions).then((response) =>
    response.json().then((data) => data[difficulty]),
  );
