const generateRandomNumber = function() {
  let result= ''
  let char = '0123456789';
  for (let i = 0; i < 8; i++) {
    result += char[Math.round(Math.random() * (char.length - 1))];
  }
  return parseInt(result);
};


exports.generateRandomNumber = generateRandomNumber
