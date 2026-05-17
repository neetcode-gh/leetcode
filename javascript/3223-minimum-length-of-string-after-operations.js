/**
 * Stack | HashSet 
 * Time O(n) | Space O(n)
 * https://leetcode.com/problems/minimum-length-of-string-after-operations
 * @param {string} s
 * @return {number}
 */
var minimumLength = function(s) {

    if (s.length < 3) return s.length;
    
    const rightStack = {};
    const leftStack = {};
    const deleted = new Set();

    for (let i = s.length - 1; i > -1; i--) {

        const char = s[i];

        if (rightStack[char]) {
            rightStack[char].push(i);
        } else {
            rightStack[char] = [i];
        }
    }

    for (let i = 0; i < s.length; i++) {

        const char = s[i];

        if (leftStack[char] && !deleted.has(i)) {

            const rightCharStack = rightStack[char];
            const leftCharStack = leftStack[char];

            while (rightCharStack.length && rightCharStack[rightCharStack.length - 1] <= i) rightCharStack.pop();

            if (rightCharStack.length) {
                deleted.add(rightCharStack.pop());
                deleted.add(leftCharStack.pop());
            }

            leftCharStack.push(i);
            continue;
        }

        leftStack[char] = [i];
    }

    let len = 0;

    for (const key in leftStack) {
        len += leftStack[key].length;
    }

    return len;
};
