/**
 * HashMap | Couting
 * Time O(n) | Space O(n)
 * https://leetcode.com/problems/word-subsets/
 * @param {string[]} words1
 * @param {string[]} words2
 * @return {string[]}
 */
var wordSubsets = function(words1, words2) {
    
    const maxFreq = {};

    for (let i = 0; i < words2.length; i++) {
        const word = words2[i];
        const wordFreq = {};

        for (let j = 0; j < word.length; j++) {
            const char = word[j];
            wordFreq[char] = (wordFreq[char] && wordFreq[char] + 1) || 1;
        }

        for (const char in wordFreq) {
            if (!maxFreq[char]) {
                maxFreq[char] = wordFreq[char];
            } else {
                maxFreq[char] = Math.max(maxFreq[char], wordFreq[char]);
            }
        }
    }

    const ans = [];

    for (let i = 0; i < words1.length; i++) {
        const word = words1[i];
        if (isSubSet(word, maxFreq)) ans.push(word);
    }

    return ans;
};

const isSubSet = (word, maxFreq) => {

    const wordFreq = {};
    
    for (const char of word) {
        wordFreq[char] = (wordFreq[char] && wordFreq[char] + 1) || 1;
    }

    for (const char in maxFreq) {

        if (!wordFreq[char]) return false;

        if (wordFreq[char] < maxFreq[char]) return false;
    }

    return true;
}
