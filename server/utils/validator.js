//SECTION - validate Email addrees
const emilRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validateEmail = (email) => {
  return emilRegex.test(email);
}
const customDateValidator = (value) => {
  // Regex to match DD/MM/YYYY format
  const regex = /^(?:\d{1,2}\/\d{2}\/\d{4}|\d{2}\/\d{1,2}\/\d{4}|\d{2}\/\d{2}\/\d{4})$/;

  return regex.test(value);
};
//NOTE - 
function containsSpace(str) {
  return /\s/.test(str);
}

module.exports={validateEmail,customDateValidator,containsSpace}