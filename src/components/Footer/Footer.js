const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerWrapper = document.createElement('footer');
  footerWrapper.classList.add('footer');
  footerWrapper.innerHTML = `
    <footer>
      <p>${currentYear} &copy DM</p>
    </footer>
  `;

  document.querySelector('body').appendChild(footerWrapper);
};

export default Footer;
