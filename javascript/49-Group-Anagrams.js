//////////////////////////////////////////////////////////////////////////////
// Hash Each Word
// Time: O(n*max(w))
// Space: O(n*max(w))
// This solution is faster than sorting each word.
//////////////////////////////////////////////////////////////////////////////

/**
 * @param {string[]} words
 * @return {string[][]}
 */
function groupAnagrams(words) {
    const map = Object.create(null);
    for (const word of words) {
        const hash = hashWord(word);
        if (!(hash in map)) {
            map[hash] = [];
        }
        map[hash].push(word);
    }

    const groups = [];
    for (const key in map) {
        groups.push(map[key]);
    }
    return groups;
}

/**
 * @param {string} word
 * @return {string}
 */
function hashWord(word) {
    const hash = new Array(26).fill(0);
    for (const ch of word) {
        ++hash[ch.charCodeAt(0) - 'a'.charCodeAt(0)];
    }
    return hash.toString();
}

//////////////////////////////////////////////////////////////////////////////
// Sort Each Word
// Time: O(n*max(w)*log(max(w)))
// Space: O(n*max(w))
// This solution is slower than hashing each word.
//////////////////////////////////////////////////////////////////////////////

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
const groupAnagrams = (strs) => {
    const result = [];
    const map = new Map();
    for (let i = 0; i < strs.length; i++) {
        const sorted = strs[i].split('').sort().join('');
        //! we are just splitting the string and sorting it and joining it back
        if (map.has(sorted)) {
            map.get(sorted).push(strs[i]); //! if the map has the sorted string, we push the string into the array
        } else {
            map.set(sorted, [strs[i]]); //! we are pushing the string into the map with the sorted string as the key
        }
    }

    for (let [key, value] of map) {
        result.push(value);
    }
    return result;
};
