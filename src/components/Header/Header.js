const Header = () => {
  const headerWrapper = document.createElement('header');
  headerWrapper.classList.add('header');

  const headerTitle = document.createElement('h1');
  headerTitle.classList.add('title');
  headerTitle.innerHTML = 'Lorem Ipsum';

  document.querySelector('body').appendChild(headerWrapper);
  headerWrapper.appendChild(headerTitle);
};

export default Header;
