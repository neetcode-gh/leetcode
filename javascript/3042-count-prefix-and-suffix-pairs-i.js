/**
 * BruteForce | String | Array
 * Time O(n^2 * m) | Space O(1) (m is the max len of a word in words)
 * https://leetcode.com/problems/count-prefix-and-suffix-pairs-i/
 * @param {string[]} words
 * @return {number}
 */
var countPrefixSuffixPairs = function(words) {
    
    let count = 0;
    for (let i = 0; i < words.length; i++) {
        for (let j = i+1; j < words.length; j++) {
            if (isPrefixAndSuffix(words[i], words[j])) count++;
        }
    }

    return count;
};

const isPrefixAndSuffix = (word, parentWord) => {

    let i = 0;

    while (i < word.length) {
        if (word[i] !== parentWord[i]) return false;
        i++;
    }

    i = parentWord.length - 1;
    let j = word.length - 1;

    while (j > -1) {
        if (word[j] !== parentWord[i]) return false;
        i--;
        j--;
    }

    return true;
}
