import noobImg from 'url:/src/assets/images/ranks/noob.jpg';
import amateurImg from 'url:/src/assets/images/ranks/amateur.jpg';
import normalImg from 'url:/src/assets/images/ranks/normal.jpg';
import advancedImg from 'url:/src/assets/images/ranks/advanced.jpg';
import perfectImg from 'url:/src/assets/images/ranks/perfect.jpg';
import wayneImg from 'url:/src/assets/images/ranks/wayne.jpg';

export const buildResutsView = (count, maxCount) => {
  const result = count / maxCount;

  let rank = '';
  let rankImg = null;

  if (result <= 0) {
    rank = 'noob';
    rankImg = noobImg;
  } else if (result < 0.25) {
    rank = 'amateur';
    rankImg = amateurImg;
  } else if (result < 0.6) {
    rank = 'normal';
    rankImg = normalImg;
  } else if (result < 0.8) {
    rank = 'advanced';
    rankImg = advancedImg;
  } else if (result < 1) {
    rank = 'perfect';
    rankImg = perfectImg;
  } else {
    rank = 'wayne';
    rankImg = wayneImg;
  }

  const resultContent = {
    noob: 'Przepadnij w mrokach Arkham, heretyku!!!',
    amateur: 'Wiesz, że coś takiego, jak Batman jest. I nic ponad to.',
    normal: 'Tragedii nie ma, ale mogło być lepiej. Znasz Gacka, ale fanem to Ty nie jesteś...',
    advanced: 'Niemal perfekcyjnie! Gratuluję, do pełnego sukcesu zabrakło naprawdę niewiele.',
    perfect: 'Miło poznać prawdziwego fana! Jaskinia Nietoperza niemal nie ma przed Tobą tajemnic!',
    wayne: 'W czym mogę służyć, Paniczu Bruce?',
  };

  const handleQuit = () => {
    location.reload();
  };

  const renderResults = async () => {
    document.querySelector('.quiz__title').innerHTML = resultContent[rank];
    document.querySelector('.quiz__wrapper').innerHTML = `
      <img src=${rankImg} alt=${rank}>
      <p>You get ${count} points (${result < 0 ? 0 : (result * 100).toFixed(0)}%).</p>
    `;
    document.querySelector(`.quiz__navigation`).innerHTML = `
      <button name='quit'>Close</button>
    `;
  };

  renderResults().then(
    document.querySelector(`button[name='quit']`).addEventListener('click', handleQuit),
  );
};
