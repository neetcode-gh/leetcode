/**
 * Write an algorithm to determine if a number n is happy.

A happy number is a number defined by the following process:

Starting with any positive integer, replace the number by the sum of the squares of its digits.
Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
Those numbers for which this process ends in 1 are happy.
Return true if n is a happy number, and false if not.

 

Example 1:

Input: n = 19
Output: true
Explanation:
12 + 92 = 82
82 + 22 = 68
62 + 82 = 100
12 + 02 + 02 = 1
Example 2:

Input: n = 2
Output: false
 

Constraints:

1 <= n <= 231 - 1
 */

/**
 * @param {number} n
 * @return {boolean}
 */
var isHappyNumber = function (n) {
  if (n == 1 || n == -1) {
    return true;
  }

  const happySet = new Set();

  while (!happySet.has(n)) {
    happySet.add(n);

    n = sumOfSquare(n);

    if (n == 1) return true;
  }

  return false;
};

function sumOfSquare(n) {
  let output = 0;

  while (n !== 0) {
    let digit = n % 10;
    digit = digit * digit;
    output += parseInt(digit);
    n = parseInt(n / 10);
  }

  return output;
}

console.log(isHappyNumber(2));
