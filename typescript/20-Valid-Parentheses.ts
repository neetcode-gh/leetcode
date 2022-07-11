function isValid(s: string): boolean {
  const closingToOpening = {
    '}': '{',
    ']': '[',
    ')': '(',
  };
  const stack: string[] = [];
  const chars = s.split('');

  for (let i = 0; i < chars.length; i++) {
    const element = chars[i];
    if (element in closingToOpening) {
      const pop = stack.pop();

      if (closingToOpening[element] === pop) {
        continue;
      } else {
        return false;
      }
    } else {
      stack.push(element);
    }
  }

  if (stack.length > 0) return false;

  return true;
}
