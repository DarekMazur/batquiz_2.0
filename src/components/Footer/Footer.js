import * as style from './FooterStyle.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerWrapper = document.createElement('footer');
  footerWrapper.classList.add('footer');
  footerWrapper.innerHTML = `
    <p>Postać <span class='bat'>Batmana</span> stworzył Bob Kane</p>
    <p>${currentYear} &copy DM</p>
  `;

  document.querySelector('body').appendChild(footerWrapper);
};

export default Footer;
