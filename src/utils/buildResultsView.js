import getHeader from './getHeader';

export const buildResutsView = (count, maxCount) => {
  const result = count / maxCount;

  let rank = '';

  if (result <= 0) {
    rank = 'noob';
  } else if (result < 0.25) {
    rank = 'amateur';
  } else if (result < 0.6) {
    rank = 'normal';
  } else if (result < 0.8) {
    rank = 'advanced';
  } else if (result <= 1) {
    rank = 'perfect';
  } else {
    rank = 'wayne';
  }

  const resultContent = {
    noob: 'Przepadnij w mrokach Arkham, heretyku!!!',
    amateur: 'Wiesz, że coś takiego, jak Batman jest. I nic ponad to.',
    normal: 'Tragedii nie ma, ale mogło być lepiej. Znasz Gacka, ale fanem to Ty nie jesteś...',
    advanced: 'Niemal perfekcyjnie! Gratuluję, do pełnego sukcesu zabrakło naprawdę niewiele.',
    perfect: 'Miło poznać prawdziwego fana! Jaskinia Nietoperza niemal nie ma przed Tobą tajemnic!',
    wayne: 'W czym mogę służyć, Paniczu Bruce?',
  };

  document.querySelector('.quiz__title').innerHTML = resultContent[rank];
  document.querySelector('.quiz__wrapper').innerHTML = `
  <p>You get ${count} points.</p>
  `;
};
