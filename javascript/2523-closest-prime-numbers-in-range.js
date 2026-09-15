/**
 * Sieve Algorithm
 * Time O(n*log(log(n))) |  Space O(n)
 * https://leetcode.com/problems/closest-prime-numbers-in-range
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
var closestPrimes = function(left, right) {

    const isNotPrime = {
        1: true // 1 is not prime number. 
    };

    for (let i = 2; i < right+1; i++) {
        if (!isNotPrime[i]) {
            let factor = 2;
            while (i*factor <= right) {
                isNotPrime[i*factor] = true;
                factor++;
            }
        }
    }

    const primesInOrder = [];

    while (left < right+1) {
        if (!isNotPrime[left]) {
            primesInOrder.push(left);
        }
        left++;
    }    

    let minDistance = Infinity;
    const ans = [];

    for (let i = 1; i < primesInOrder.length; i++) {
        
        const prime1 = primesInOrder[i];
        const prime0 = primesInOrder[i-1];

        if (prime1 - prime0 < minDistance) {
            minDistance = prime1-prime0;
            ans[0] = prime0;
            ans[1] = prime1;
        }
    }

    if (!ans.length) return [-1, -1];
    return ans;
};
