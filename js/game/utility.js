function Utility() {}

Utility.CheckNumber = function(arg) {
  const number = Number(arg);
  if (isNaN(number) || typeof number !== 'number') {
    throw new Error('Incorrect argument, not a number!');
  return 0;
  }
  return number;
};