var isPalindrome = function(x) {
    
 let stringNumber = x.toString();

  let startIndex = 0;
  let endIndex = stringNumber.length - 1;

  while (startIndex < endIndex) {

    if (stringNumber[startIndex] !== stringNumber[endIndex]) {
      return false;
    }

    startIndex++;
    endIndex--;
  }

  return true;
    
};
