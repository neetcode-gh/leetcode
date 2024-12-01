/**
 * @param {string[]} words
 * @return {string[]}
 */
var findAllConcatenatedWordsInADict = function (words) {
    let wordSet = new Set(words);
    let res = [];

    for (let w of words) {
        if (dfs(w)) {
            res.push(w);
        }
    }

    return res;

    /**
     *
     * @param {string} word
     * @returns {boolean}
     */
    function dfs(word) {
        for (let i = 1; i < word.length; i++) {
            let prefix = word.slice(0, i);
            let suffix = word.slice(i, word.length);

            if (
                (wordSet.has(prefix) && wordSet.has(suffix)) ||
                (wordSet.has(prefix) && dfs(suffix))
            ) {
                return true;
            }
        }
        return false;
    }
};
