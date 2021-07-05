const Footer = () => {
  const footerWrapper = document.createElement('footer');
  footerWrapper.classList.add('footer');
  footerWrapper.innerHTML = '<h3>Lorem Ipsum</h3>';

  document.querySelector('body').appendChild(footerWrapper);
};

export default Footer;
