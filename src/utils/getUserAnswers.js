const getUserAnswers = (answerObj) => {
  const answersList = [];
  answerObj.forEach((ans) => {
    answersList.push({ id: ans.classList[1].slice(-3), answer: ans.innerHTML });
  });
  return answersList;
};

export default getUserAnswers;
