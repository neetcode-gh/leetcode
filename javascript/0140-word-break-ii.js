/**
 * Backtracking | Recursion
 * Time O(n^k) | Space O(n) | n = number of words in dict, k is length of the string.
 * https://leetcode.com/problems/word-break-ii
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function(s, wordDict) {
     
    wordDict = new Set(wordDict);

    const allSentences = [];

    const dfs = (startIdx, sentence) => {
        if (startIdx >= s.length) {
            if (sentence.length) {
                allSentences.push(sentence.slice());
            }
            return;
        }

        for (let i = startIdx; i < s.length; i++) {
            const currWord = s.slice(startIdx, i+1);
            if (wordDict.has(currWord)) {
                sentence.push(currWord);
                dfs(i+1, sentence);
                sentence.pop();
            }
        }
    }

    dfs(0, []);
    for (let i = 0; i < allSentences.length; i++) {
        allSentences[i] = allSentences[i].join(" ");
    }
    return allSentences;
};
