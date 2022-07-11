//////////////////////////////////////////////////////////////////////////////
// Hash Each Word
// Time: O(n*max(w))
// Space: O(n*max(w))
// This solution is faster than sorting each word.
//////////////////////////////////////////////////////////////////////////////

/** @const {!Object<string, number>} */
const CODES = {
    a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9,
    k: 10, l: 11, m: 12, n: 13, o: 14, p: 15, q: 16, r: 17,
    s: 18, t: 19, u: 20, v: 21, w: 22, x: 23, y: 24, z: 25
};

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
        ++hash[CODES[ch]];
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
    const sorted = strs[i].split("").sort().join("");
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
