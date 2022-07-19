/**
 * https://leetcode.com/problems/letter-combinations-of-a-phone-number/
 * Time O(N * 4^N) | Space O(N)
 * @param {string} digits
 * @return {string[]}
 */
 var letterCombinations = function(digits, combination = [], combinations = []) {
    const isBaseCase = !digits
    if (isBaseCase) {
        if (combination.length) combinations.push(combination.join(''))

        return combinations;
    }

    const letters = phoneButtons[ digits[0] ];

    for (const char of letters) {
        backTrack(digits, char, combination, combinations);
    }

    return combinations;
};

const backTrack = (digits, char, combination, combinations) => {
    combination.push(char)
        letterCombinations(digits.slice(1), combination, combinations)
    combination.pop()
}

const phoneButtons = ({
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z'],
})
