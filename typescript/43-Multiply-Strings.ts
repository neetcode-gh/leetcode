function multiply(num1: string, num2: string): string {
  if (num1 === '0' || num2 === '0') {
    return '0';
  }

  let maxLength: number = num1.length + num2.length;
  let result: Array<number> = Array(maxLength).fill(0);
  for (let i = num2.length - 1; i >= 0; i--) {
    let idx = maxLength - (num2.length - i);

    for (let j = num1.length - 1; j >= 0; j--) {
      const product =
        result[idx] + parseInt(num1.charAt(j)) * parseInt(num2.charAt(i));
      result[idx] = Math.floor(product % 10);
      result[idx - 1] = Math.floor(product / 10) + result[idx - 1];
      idx--;
    }
  }
  if (result[0] === 0) return result.slice(1).join('');
  else return result.join('');
}
