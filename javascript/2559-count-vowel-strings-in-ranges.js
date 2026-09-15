/**
 * PrefixSum
 * Time O(n) | Space O(n)
 * https://leetcode.com/problems/count-vowel-strings-in-ranges
 * @param {string[]} words
 * @param {number[][]} queries
 * @return {number[]}
 */
var vowelStrings = function(words, queries) {

    const preFixSum = [];

    let currCount = 0;
    for (let i = 0; i < words.length; i++) {
        if (isValid(words[i])) currCount++;
        preFixSum.push(currCount);
    }
    
    const ans = [];
    for (let i = 0; i < queries.length; i++) {
        const [start, end] = queries[i];
        let currResult = preFixSum[end] - preFixSum[start];
        if (isValid(words[start])) currResult++;
        ans.push(currResult);
    }

    return ans;
};

const isValid = (word) => {

    const vowels = new Set(["a","e","i","o","u"]);
    if (vowels.has(word[0]) && vowels.has(word[word.length - 1])) return true;
    return false;
}
