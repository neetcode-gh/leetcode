function isHappy(n: number): boolean {
  const visit = new Set();

  while (!visit.has(n)) {
    visit.add(n);
    n = sumOfSquares(n);

    if (n == 1) return true;
  }

  return false;
}

function sumOfSquares(n: number): number {
  let output = 0;

  while (n) {
    let digit = n % 10;
    digit = digit ** 2;
    output += digit;
    n = Math.floor(n / 10);
  }

  return output;
}
