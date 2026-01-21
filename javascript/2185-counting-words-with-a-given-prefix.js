/**
 * Trie
 * Time O(n*m) | Space O(n) | (m is max length of each word)
 * https://leetcode.com/problems/counting-words-with-a-given-prefix
 * @param {string[]} words
 * @param {string} pref
 * @return {number}
 */
var prefixCount = function(words, pref) {
    const trie = createPreFixTrieOfWords(words);
    return getPrefixCount(pref, trie);
};

const getPrefixCount = (pref, trie) => {
    
    const dfs = (idx, node) => {
        if (idx === pref.length) return node.count;
        
        const latter = pref[idx];

        if (!node[latter]) return 0;

        return dfs(idx+1, node[latter]);
    }

    return dfs(0, trie);
}

const createPreFixTrieOfWords = (words) => {

    const trie = {};

    const addWord = (word) => {
        const dfs = (idx, node) => {
            if (idx === word.length) return;

            const letter = word[idx];
            if (node[letter]) {
                node[letter]["count"] += 1;
            } else {
                node[letter] = {};
                node[letter]["count"] = 1;
            }

            dfs(idx+1, node[letter]);
        }

        dfs(0,trie);
    }

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        addWord(word);
    }

    return trie
}

/**
 * BruteForce 
 * Time O(n^2 * m) | Space O(n) | (m is max length of each word)
 * https://leetcode.com/problems/counting-words-with-a-given-prefix
 * @param {string[]} words
 * @param {string} pref
 * @return {number}
 */
var prefixCount0 = function(words, pref) {
    
    let count = 0;
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (isPrefix(pref, word)) count++; 
    }

    return count;
};

const isPrefix = (pref, word) => {

    let i = 0;
    while (i < pref.length) {
        if (pref[i] !==  word[i]) return false;
        i++;
    }

    return true;
}
