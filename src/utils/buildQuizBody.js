import { getQuestions } from './getQuestions';

const buildQuiz = (questionData) => {
  const quizBody = document.querySelector('.quiz__wrapper');
  const questionBody = document.createElement('div');
  questionBody.classList.add('question');
  questionBody.innerHTML = `
  <h3>${questionData.question}</div>
  `;
  quizBody.appendChild(questionBody);
};

export const buildQuizBody = async (difficulty, questionType) => {
  document.querySelector('.quiz__wrapper').innerHTML = '';
  const questions = await getQuestions(difficulty, questionType);
  try {
    questions.map((question) => buildQuiz(question));
  } catch {
    buildQuiz(questions);
  }
};
