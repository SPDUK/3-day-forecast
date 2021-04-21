export const onlyLettersAndSpacesRegex = /[^a-zA-Z ]/g;

export const capitalizeEachWord = (str) =>
  str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
