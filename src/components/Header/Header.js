import * as mainStyles from '../../style.scss';
import * as styles from './HeaderStyle.scss';

const Header = () => {
  const headerWrapper = document.createElement('header');
  headerWrapper.classList.add('header');

  const headerTitle = document.createElement('h1');
  headerTitle.classList.add('header__title');
  headerTitle.innerHTML = 'Jak dobrze znasz Zamaskowanego Krzyżowca?';

  document.querySelector('body').appendChild(headerWrapper);
  headerWrapper.appendChild(headerTitle);
};

export default Header;
