/**
 * Brute Force - Multiply
 * Time O(N) | Space O(1)
 * https://leetcode.com/problems/powx-n/
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
 var myPow = (x, n) => {
    if (n < 0) {
        x = (1 / x);
        n = (-n);
    }

    return getPow(x, n);/* Time O(N) */
}

var getPow = (x, n, pow = 1) => {
    for (let i = 0; i < n; i++) {/* Time O(N) */
        pow = pow * x;
    }

    return pow;
}

/**
 * DFS 
 * Time (log(N)) | Space O(log(N))
 * https://leetcode.com/problems/powx-n/
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = (x, n) => {
    const isBaseCase1 = ((x === 1.0) || (n === 0));
    if (isBaseCase1) return 1;

    const isBaseCase2 = (n === 1);
    if (isBaseCase2) return x;

    const isEven = ((n % 2) === 0);
    if (isEven) return myPow((x * x), (n / 2));/* Time O(log(N)) | Space O(log(N)) */

    const isOdd = ((n % 2) === 1);
    if (isOdd) return (x * myPow(x, (n - 1)));/* Time O(log(N)) | Space O(log(N)) */

    return (1 / myPow(x, -n));
};

/**
 * DFS
 * Time (log(N)) | Space O(log(N))
 * https://leetcode.com/problems/powx-n/
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = (x, n) => {
    const isBaseCase = (n === 0);
    if (isBaseCase) return 1;

    const abs = Math.abs(n);
    const isEven = ((abs % 2) === 0);

    const power = isEven
        ? myPow((x * x), (abs / 2))             /* Time O(log(N)) | Space O(log(N)) */
        : (myPow((x * x), ((abs - 1) / 2)) * x);/* Time O(log(N)) | Space O(log(N)) */

    const isNegative = (n < 0);

    return isNegative
        ? (1 / power)
        : power;
};

/**
 * Fast Power - Recursive 
 * Time O(log(N)) | Space O(log(N))
 * https://leetcode.com/problems/powx-n/
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
 var myPow = (x, n) => {
    if (n < 0) {
        x = 1 / x;
        n = -n;
    }

    return fastPow(x, n);/* Time O(log(N)) | Space O(log(N)) */
}

var fastPow = (x, n) => {
    const isBaseCase = n === 0;
    if (isBaseCase) return 1.0;

    const half = fastPow(x, n / 2);/* Time O(log(N)) | Space O(log(N)) */

    const isEven = ((n % 2) === 0);
    if (isEven) return (half * half);

    const isOdd = ((n % 2) === 1);
    if (isOdd) return ((half * half) * x);
}

/**
 * Fast Power - Iterative
 * Time O(log(N)) | Space O(1)
 * https://leetcode.com/problems/powx-n/
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
 var myPow = (x, n) => {
    if (n < 0) {
        x = (1 / x);
        n = (-n);
    }

    let [ pow, product ] = [ 1, x ];

    for (let i = n; (0 < i); i = (i >> 1)) {/* Time O(log(N)) */
        const isOdd = ((i % 2) === 1);
        if (isOdd) pow = (pow * product);

        product = (product * product);
    }

    return pow;
}
 
 /**
 * Number - Math
 * Time O(1) | Space O(1)
 * https://leetcode.com/problems/powx-n/
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
 var myPow = (x, n) => {
    return Math.pow(x,n).toFixed(5);
}