export const pluralize = (number, words) => {
  const resultForm = number % 10 === 1 &&
    number % 100 !== 11 ? words[0] : (number % 10 >= 2 && number % 10 <= 4 &&
    (number % 100 < 10 || number % 100 >= 20) ? words[1] : words[2]);

  return resultForm;
};
