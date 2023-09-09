// Time complexity: O(n)
// Space complexity: O(n)

var mergeAlternately = function (word1, word2) {
    const buffer = [];

    for (let i = 0; i < word1.length || i < word2.length; i++) {
        if (i < word1.length) buffer.push(word1[i]);
        if (i < word2.length) buffer.push(word2[i]);
    }

    return buffer.join('');
};
