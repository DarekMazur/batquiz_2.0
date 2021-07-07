const GetHeader = (headerLocation, state, playerName, difficulty) => {
  headerContent = {
    onInit: 'Welcome to BatQuiz! Please select game level and set your nickname.',
    onQuiz: `Nice to see you ${playerName}, let's face with ${difficulty} quiz!`,
    onBonus: `Great job ${playerName}! Get more points with bonus question!`,
    onResults: '',
  };

  try {
    return (headerLocation.innerText = headerContent[state]);
  } catch {}
};

export default GetHeader;
