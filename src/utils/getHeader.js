const getHeader = (headerLocation, state, playerName, difficulty) => {
  const escapeHtml = (usafeInput) => {
    var text = document.createTextNode(usafeInput);
    var p = document.createElement('p');
    p.appendChild(text);
    return p.innerHTML;
  };

  headerContent = {
    onInit: 'Zmierz się z Batmanem!',
    onQuiz: `Witaj, <span class='user'>${escapeHtml(playerName)}</span>!
    <p>Grasz na poziomie <span class=${difficulty}>${difficulty}</span></p>`,
    onBonus: `Great job <span class='user'>${escapeHtml(
      playerName,
    )}</span> Get more points with bonus ${difficulty} question!`,
  };

  try {
    return (headerLocation.innerHTML = headerContent[state]);
  } catch {}
};

export default getHeader;
