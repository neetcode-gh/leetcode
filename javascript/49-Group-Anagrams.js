/**
 * @param {string[]} strs
 * Time O(N * logN) | Space O(N)
 * @return {string[][]}
 */
var groupAnagrams = function(words, map = new Map()) {
    if (!words.length) return [];

    for (const { original, sorted } of words.map(reOrder)) {
        const values = map.get(sorted) || [];

        values.push(original);

        map.set(sorted, values);
    }

    return [ ...map.values() ];
};

const reOrder = (str) => ({
    original: str,
    sorted: str
      .split('')
      .sort((a, b) => a.localeCompare(b))
      .join(''),
});

/**
 * @param {string[]} words
 * Time O(N) | Space O(N)
 * @return {string[][]}
 */
var groupAnagrams = function(words, map = new Map()) {
    if (!words.length) return [];

    for (const word of words) {
        const hash = getHash(word);
        const values = map.get(hash) || [];
        
        values.push(word);
        
        map.set(hash, values);
    }
    
    return [ ...map.values() ]
}

const getHash = (word, frequency = new Array(26).fill(0)) => {
    for (const char of word) {
        const charCode = char.charCodeAt(0) - 'a'.charCodeAt(0);

        frequency[charCode]++;
    }

    return frequency.map((count) => `#${count}`).join('');
}
