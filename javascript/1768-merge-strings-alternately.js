/**
 * https://leetcode.com/problems/merge-strings-alternately/
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function (word1, word2) {
    let indx = 0;
    let str = '';
    while (word1[indx] && word2[indx]) {
        str += word1[indx] + word2[indx];
        indx++;
    }
    if (word1[indx]) str += word1.slice(indx);
    if (word2[indx]) str += word2.slice(indx);
    return str;
};
