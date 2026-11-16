/**
 * Stack | HashSet
 * Time O(n) | Space O(n)
 * https://leetcode.com/problems/clear-digits
 * @param {string} s
 * @return {string}
 */
var clearDigits = function(s) {

    const stack = [];
    const digitSet = new Set();
    s = s.split("");

    for (let i = 0; i < 10; i++) {
        digitSet.add(i.toString());
    }

    for (let i = 0; i < s.length; i++) {
        
        if (digitSet.has(s[i])) {
            
            const nearestNonDigitLeftIdx = stack.pop();
            s[nearestNonDigitLeftIdx] = "#";
            s[i] = "#";
            continue;
        }

        stack.push(i);
    }

    return s.filter((char) => char != "#").join("");

};

/**
 * Priority Queue | HashSet
 * Time O(n*log(n)) | Space O(n)
 * https://leetcode.com/problems/clear-digits
 * @param {string} s
 * @return {string}
 */
var clearDigits1 = function(s) {
    
    const maxQ = new MaxPriorityQueue({
        compare: (a,b) => {
            return b-a;
        }
    });

    const digitSet = new Set();

    for (let i = 0; i < 10; i++) {
        digitSet.add(i.toString());
    }

    s = s.split("");
    
    for (let i = 0; i < s.length; i++) {

        if (digitSet.has(s[i])) {
            const nearestLeftNonDigitIdx = maxQ.dequeue();
            s[nearestLeftNonDigitIdx] = "#";
            s[i] = "#";
            continue;
        }
        
        maxQ.enqueue(i);
    }

    return s.filter((char) => char != "#").join("");
};

/**
 * String | Brute Force
 * Time O(n^2) | Space O(1)
 * https://leetcode.com/problems/clear-digits
 * @param {string} s
 * @return {string}
 */
var clearDigits0 = function(s) {
    
    const digitSet = new Set();

    for (let i = 0; i < 10; i++) {
        digitSet.add(i.toString());
    }

    s = s.split("");

    for (let i = 0; i < s.length; i++) {

        if (digitSet.has(s[i])) {
            let j = i-1;
            while (j > -1) {
                if (!digitSet.has(s[j]) && s[j] != "#") {
                    s[j] = "#";
                    break;
                }
                j--;
            }
            s[i] = "#"
        }
    }

    return s.filter((char) => char != "#").join("");
};
