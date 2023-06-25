const validatePassword = (password) => {
  const pwd = password.split('');
  const length = password.length;

  let letters = 'qwertyuioplkjhgfdsazxcvbnm';
  let small_letter_collection = letters.split('');
  let capital_letter_collection = letters.toUpperCase().split('');
  let numbers_collection = '0123456789'.split('');
  let special_characters_collection = '!@#$%^&*()_?></=+='.split('');

  const small_letter = pwd.filter((element) =>
    small_letter_collection.includes(element)
  );

  const capital_letter = pwd.filter((element) =>
    capital_letter_collection.includes(element)
  );

  const special_characters = pwd.filter((element) =>
    special_characters_collection.includes(element)
  );

  const numbers = pwd.filter((element) => numbers_collection.includes(element));

  if (
    length >= 8 &&
    capital_letter.length > 0 &&
    small_letter.length > 0 &&
    numbers.length > 0 &&
    special_characters.length > 0
  ) {
    return true;
  } else {
    return false;
  }
};

export default validatePassword;
