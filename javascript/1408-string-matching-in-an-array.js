/**
 *  Time O(n^2 * m*m) | Space O(n) | (m is max length of word in words)
 *  BruteForce | Array | String
 *  https://leetcode.com/problems/string-matching-in-an-array/
 * @param {string[]} words
 * @return {string[]}
 */
var stringMatching = function(words) {
    
    const ans = new Set();

    for (let i = 0; i < words.length; i++) {
        for (let j = 0; j < words.length; j++) {
            if (j === i) continue;
            if (isSubString(words[i], words[j])) ans.add(words[j]);
        }
    }

    return [...ans];
};

const isSubString = (parentWord, word) => {
    return parentWord.includes(word);
}
