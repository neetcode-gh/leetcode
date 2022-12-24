/**
 * Brut Force - Check All Substrings
 * Time O(N^3) | Space O(1)
 * https://leetcode.com/problems/palindromic-substrings/
 * @param {string} s
 * @return {number}
 */
var countSubstrings = (s, count = 0) => {
    for (let left = 0; (left < s.length); left++) {      /* Time O(N) */
        for (let right = left; (right < s.length); right++) {/* Time O(N) */
            count += Number(isPalindrome(s, left, right));      /* Time O(N) */
        }
    }

    return count;
}

const isPalindrome = (s, left, right) => {
    while (left < right) {/* Time O(N) */
        const isEqual = (s[left] === s[right]);
        if (!isEqual) return false;

        left++; right--;
    }

    return true;
}

/**
 * DP - Bottom Up
 * Matrix - Tabulation
 * 2 Pointer - Slide Window
 * Time O(N^2) | Space O(N^2)
 * https://leetcode.com/problems/palindromic-substrings/
 * @param {string} s
 * @return {number}
 */
var countSubstrings = (s, count = 0) => {
    const tabu = initTabu(s);       /* Time O(N * N)  | Space O(N *  N) */

    count += singleLetters(s, tabu);/* Time O(N)      | Space O(N *  N) */
    count += doubleLetters(s, tabu);/* Time O(N)      | Space O(N *  N) */
    count += multiLetters(s, tabu); /* Time O(N *  N) | Space O(N *  N) */

    return count;
};

const initTabu = (s) => new Array(s.length).fill()/* Space O(N) */
    .map(() => new Array(s.length).fill(false));      /* Space O(N) */

const singleLetters = (s, tabu, count = 0) => {
    for (let index = 0; (index < s.length); index++) {/* Time O(N) */
        tabu[index][index] = true;                        /* Space O(N * N) */

        count += Number(tabu[index][index]);
    }

    return count;
}

const doubleLetters = (s, tabu, count = 0) => {
    for (let curr = 0; curr < (s.length - 1); curr++) {/* Time O(N) */
        const next = (curr + 1);
        const isEqual = (s[curr] === s[next]);

        tabu[curr][next] = isEqual;                        /* Space O(N * N) */
        count += Number(tabu[curr][next]);
    }

    return count;
}

const multiLetters = (s, tabu, count = 0) => {
    for (let window = 3; (window <= s.length); window++) {/* Time O(N) */
        count += slideWindow(s, tabu, window);              /* Time O(N) | Space O(N * N) */
    }

    return count;
}

const slideWindow = (s, tabu, window, count = 0) => {
    let [ left, right ] = [ 0, (window - 1) ];

    while (right < s.length) {/* Time O(N) */
        const isTrue = tabu[(left + 1)][(right - 1)];
        const isEqual = (s[left] === s[right]);

        tabu[left][right] = (isTrue && isEqual);/* Space O(N * N) */
        count += Number(tabu[left][right]);

        left++; right++;
    }

    return count;
}

/**
 * 2 Pointer - Expand Around Center
 * Time O(N^2) | Space O(1)
 * https://leetcode.com/problems/palindromic-substrings/
 * @param {string} s
 * @return {number}
 */
var countSubstrings = (s, count = 0) => {
    for (let i = 0; (i < s.length); i++) {/* Time O(N) */
        const [ odd, even ] = [ i, (i + 1) ];
        /* odd-length: single character center */
        count += isPalindromeFromCenter(s, i, odd); /* Time O(N) */
        /* even-length: consecutive characters center */
        count += isPalindromeFromCenter(s, i, even);/* Time O(N) */
    }

    return count;
}

const isPalindromeFromCenter = (s, left, right, count = 0) => {
    const isInBounds = () => ((0 <= left) && (right < s.length));
    while (isInBounds()) {/* Time O(N) */
        const isEqual = (s[left] === s[right]);
        if (!isEqual) break;

        count++;

        left--; right++;
    }

    return count;
}