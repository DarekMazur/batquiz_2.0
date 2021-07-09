export const handleClickAnswer = (e) => {
  // console.log(e.target);
  if (e.target.parentElement.querySelector('.listItem--active')) {
    e.target.parentElement.querySelector('.listItem--active').classList.remove('listItem--active');
  }

  e.target.classList.add('listItem--active');
};
