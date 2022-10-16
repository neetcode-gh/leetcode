/**
 * Hash Set - seen dynamic
 * Time O(log(N)) | Space O(log(N))
 * https://leetcode.com/problems/happy-number/
 * @param {number} n
 * @return {boolean}
 */
 var isHappy = (n, seen = new Set()) => {
    const hasCycle = () => ((n === 1) || (seen.has(n)));
    while (!hasCycle()) {/* Time O(log(N)) */
        seen.add(n);         /* Space O(log(N)) */
        n = getNext(n);  /* Time O(log(N)) */
    }

    return (n === 1);
};

var getNext = (n, sum = 0) => {
    while (0 < n) {/* Time O(log(N)) */
        const remainder = (n % 10);

        n = Math.floor((n / 10));
        sum += (remainder * remainder);
    }

    return sum;
}

/**
 * Hash Set - seen static
 * Time O(log(N)) | Space O(1)
 * https://leetcode.com/problems/happy-number/
 * @param {number} n
 * @return {boolean}
 */
var isHappy = (n) => {
    const cycles = [ 4, 16, 37, 58, 89, 145, 42, 20 ];
    const seen = new Set(cycles);/* Time O(1)      | Space O(1) */

    const hasCycle = () => ((n === 1) || (seen.has(n)));
    while (!hasCycle()) {        /* Time O(log(N)) | Space O(1) */
        n = getNext(n);
    }

    return n === 1;
}

var getNext = (n, sum = 0) => {
    while (0 < n) {/* Time O(log(N)) */
        const remainder = (n % 10);

        n = Math.floor((n / 10));
        sum += (remainder * remainder);
    }

    return sum;
}

/**
 * Pointer - n === 1 || n === 4
 * Time O(log(N)) | Space O(1)
 * https://leetcode.com/problems/happy-number/
 * @param {number} n
 * @return {boolean}
 */
var isHappy = (n) => {
    const hasCycle = () => ((n === 1) || (n === 4));
    while (!hasCycle()) {/* Time O(log(N)) */
        n = getNext(n);  /* Time O(log(N)) */
    }

    return n === 1;
}

var getNext = (n, sum = 0) => {
    while (0 < n) {/* Time O(log(N)) */
        const remainder = (n % 10);
        
        n = Math.floor((n / 10));
        sum += (remainder * remainder);
    }

    return sum;
}

/**
 * Slow Fast
 * Time O(log(N)) | Space O(1)
 * https://leetcode.com/problems/happy-number/
 * @param {number} n
 * @return {boolean}
 */
var isHappy = (n) => {
    let [ slow, fast ] = [ n, getNext(n) ];
    
    const hasCyle = () => ((fast === 1) || (slow === fast));
    while (!hasCyle()) {              /* Time O(log(N)) */
        slow = getNext(slow);         /* Time O(log(N)) */
        fast = getNext(getNext(fast));/* Time O(log(N)) */
    }

    return (fast === 1);
}

var getNext = (n, sum = 0) => {
    while (0 < n) {/* Time O(log(N)) */
        const remainder = (n % 10);

        n = Math.floor((n / 10));
        sum += (remainder * remainder);
    }

    return sum;
}