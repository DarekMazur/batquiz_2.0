import { getQuestions } from './getQuestions';

import e01 from 'url:/src/assets/images/easy/1.jpg';
import e02 from 'url:/src/assets/images/easy/2.jpg';
import e03 from 'url:/src/assets/images/easy/3.jpg';
import e04 from 'url:/src/assets/images/easy/4.jpg';
import e05 from 'url:/src/assets/images/easy/5.jpg';
import e06 from 'url:/src/assets/images/easy/6.jpg';
import e07 from 'url:/src/assets/images/easy/7.jpg';
import e08 from 'url:/src/assets/images/easy/8.jpg';
import e09 from 'url:/src/assets/images/easy/9.jpg';
import e10 from 'url:/src/assets/images/easy/10.jpg';

import n01 from 'url:/src/assets/images/normal/1.jpg';
import n02 from 'url:/src/assets/images/normal/2.jpg';
import n03 from 'url:/src/assets/images/normal/3.jpg';
import n04 from 'url:/src/assets/images/normal/4.jpg';
import n05 from 'url:/src/assets/images/normal/5.jpg';
import n06 from 'url:/src/assets/images/normal/6.jpg';
import n07 from 'url:/src/assets/images/normal/7.jpg';
import n08 from 'url:/src/assets/images/normal/8.jpg';
import n09 from 'url:/src/assets/images/normal/9.jpg';
import n10 from 'url:/src/assets/images/normal/10.jpg';

import h01 from 'url:/src/assets/images/hard/1.jpg';
import h02 from 'url:/src/assets/images/hard/2.jpg';
import h03 from 'url:/src/assets/images/hard/3.jpg';
import h04 from 'url:/src/assets/images/hard/4.jpg';
import h05 from 'url:/src/assets/images/hard/5.jpg';
import h06 from 'url:/src/assets/images/hard/6.jpg';
import h07 from 'url:/src/assets/images/hard/7.jpg';
import h08 from 'url:/src/assets/images/hard/8.jpg';
import h09 from 'url:/src/assets/images/hard/9.jpg';
import h10 from 'url:/src/assets/images/hard/10.jpg';

import b_e from 'url:/src/assets/images/easy/bonus.jpg';
import b_n from 'url:/src/assets/images/normal/bonus.jpg';
import b_h from 'url:/src/assets/images/hard/bonus.jpg';

const images = {
  e01,
  e02,
  e03,
  e04,
  e05,
  e06,
  e07,
  e08,
  e09,
  e10,
  n01,
  n02,
  n03,
  n04,
  n05,
  n06,
  n07,
  n08,
  n09,
  n10,
  h01,
  h02,
  h03,
  h04,
  h05,
  h06,
  h07,
  h08,
  h09,
  h10,
  b_e,
  b_n,
  b_h,
};

const buildQuiz = (questionData) => {
  const quizBody = document.querySelector('.quiz__wrapper');
  const questionBody = document.createElement('div');
  questionBody.classList.add('question');
  questionBody.innerHTML = `
    <h3>${questionData.question}</h3>
    <img src=${images[questionData.id]}>
    <ul class='answersList answersList_${questionData.id}'>
      ${questionData.answers.i
        .map((answer) => `<li class='listItem listItem__${questionData.id}'>${answer}</li>`)
        .join('')}
    </ul>
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
