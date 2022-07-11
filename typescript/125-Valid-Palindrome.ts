function isPalindrome(s: string): boolean {
  const array = s
    .toLowerCase()
    .replace(/[^A-Za-z0-9]/g, '')
    .replace(/\s/g, '')
    .split('');

  for (let i = 0; i < array.length; i++) {
    const first = array[i];
    const second = array[array.length - 1 - i];

    if (first !== second) {
      return false;
    }
  }
  return true;
}
