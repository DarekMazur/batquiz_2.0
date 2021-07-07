export const createButtonList = (options, className) => {
  const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);
  return options
    .map(
      (option) => `
  <button class=${className} name=${option}>${capitalize(option)}</button>
  `,
    )
    .join('');
};
