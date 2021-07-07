export const createButtonList = (options) => {
  const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);
  return options
    .map(
      (option) => `
  <button class='selectDifficulty' name=${option}>${capitalize(option)}</button>
  `,
    )
    .join('');
};
