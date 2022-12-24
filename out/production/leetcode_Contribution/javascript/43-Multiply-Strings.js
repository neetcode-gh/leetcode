/**
 * Matrix
 * Time O(N * M) | Space O(N + M)
 * https://leetcode.com/problems/multiply-strings/
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = (num1, num2) => {
    const isZero = ((num1 === '0') || (num2 === '0'));
    if (isZero) return '0';

    const buffer = initBuffer(num1, num2);/*               | Space (N + M) */

    multiplication(num1, num2, buffer)    /* Time O(N * M) */
    removeLeadingZero(buffer);            /* Time O(N + M) | Time O(N + M)*/

    return buffer.join('');               /* Time O(N + M) | Space O(N + M) */
};

var initBuffer = (num1, num2) => {
    const size = (num1.length + num2.length);
    
    return new Array(size).fill(0);/* Space (N + M) */
}

var multiplication = (num1, num2, buffer) => {
    for (let i = (num1.length - 1); (0 <= i); i--) {/* Time O(N) */
        for (let j = (num2.length - 1); (0 <= j); j--) {/* Time O(M) */
            update(num1, i, num2, j, buffer);               /* Space O(N + M) */
        }
    }
}

var removeLeadingZero = (buffer) => {
    const isLeadZero = (buffer[0] === 0);
    if (!isLeadZero) return;

    buffer.shift();/* Time O(N + M) | Time O(N + M) */
}

var update = (num1, i, num2, j, buffer) => {
    const curPos = (i + j);
    const prevPos = curPos + 1;

    const carry = buffer[prevPos];
    const product = getProduct(num1, i, num2, j);
    const sum = (carry + product);

    const remainder = (sum % 10);
    const value = ((sum - remainder) / 10);

    buffer[prevPos] = remainder;/* Space O(N + M) */
    buffer[curPos] += value;    /* Space O(N + M) */
}

var getProduct = (num1, i, num2, j) => {
    const [ iNum, jNum ] = [ Number(num1[i]), Number(num2[j]) ];

    return (iNum * jNum);
}

/**
 * Matrix
 * Time O(N * M) | Space O(N + M)
 * https://leetcode.com/problems/multiply-strings/
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = (num1, num2) => {
    const isZero = ((num1 === '0') || (num2 === '0'));
    if (isZero) return '0';

    const buffer = initBuffer(num1, num2);/*               | Space O(N + M) */

    multiplication(num1, num2, buffer);   /* Time O(N * M) | Space O(N + M) */
    removeLeadingZero(buffer);            /* Time O(N + M) | Space O(N + M) */

    return buffer.join('');               /* Time O(N + M) | Space O(N + M) */
};

var initBuffer = (num1, num2) => new Array(num1.length + num2.length).fill(0);/* Space O(N + M) */

var multiplication = (num1, num2, buffer) => {
    [ num1, num2 ] =      /* Time O(N + M) */
        [ reverse(num1), reverse(num2) ];

    for (var i1 in num1) {/* Time O(N) */
        for (var i2 in num2) {/* Time O(M) */
            update(num1, i1, num2, i2, buffer);/* Space O(N + M) */
        }
    }

    buffer.reverse();/* Time O(N + M) */
}

const reverse = (s) => s
    .split('') /* Time O(K) | Space O (K) */
    .reverse();/* Time O(K) */

var update = (num1, i1, num2, i2, buffer) => {
    const product = num1[i1] * num2[i2];
    const index = Number(i1) + Number(i2);

    buffer[index] += product;                             /* Space O(N + M) */
    buffer[(index + 1)] += Math.floor(buffer[index] / 10);/* Space O(N + M) */
    buffer[index] = (buffer[index] % 10);                 /* Space O(N + M) */
}

var removeLeadingZero = (buffer) => {
    const isZero = (buffer[0] === 0);
    if (!isZero) return;

    buffer.shift();/* Time O(N + M) | Space O(N + M) */
}