var isPalindrome = (x: number) => {
  // Creates array from int characters
  // 121 -> [1,2,1]
  let arr = Array.from(String(x), Number);

  // Uses two pointer
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[arr.length - 1 - i]) {
      return false;
    }
  }
  return true;
};
