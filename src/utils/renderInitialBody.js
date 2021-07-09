import getHeader from './getHeader';

export const renderInitialBody = () => {
  getHeader(document.querySelector('.quiz__title'), 'onInit');
  document.querySelector('.quiz__wrapper').innerHTML = `
    <div class='buttonWrapper'>
      <button class='selectDifficulty' name='easy'>Easy</button>
      <button class='selectDifficulty' name='normal'>Normal</button>
      <button class='selectDifficulty' name='hard'>Hard</button>
    </div>
    <input class='nameForm_playerName' name='name' />
    <label for='name'>Your nickname</label>
    <p class='alertMessage'>
    </p>
  `;

  const renderinitialNavigation = async () =>
    (document.querySelector('.quiz__navigation').innerHTML = `
    <button name='submit'>Start</button>
    <button name='reset'>Reset</button>
  `);

  renderinitialNavigation();
};
