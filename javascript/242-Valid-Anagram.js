/**
 * @param {string} s
 * @param {string} t
 * Time O(N * logN) | Space O(N)
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;
    
    const reOrder = (str) => str
      .split('')
      .sort((a, b) => a.localeCompare(b))
      .join(''); 
      
    return reOrder(s) === reOrder(t)
};

/**
 * @param {string} s
 * @param {string} t
 * Time O(N) | Space O(N)
 * @return {boolean}
 */
var isAnagram = function(s, t, map = new Map()) {
    if (s.length !== t.length) return false;
    
    addCharFrequency(s, map);
    return subtractCharFrequency(t, map)
    
};

const addCharFrequency = (str, map) => {
    for (const char of str) {
        map.set(char, (map.get(char) || 0) + 1);
    }
}

const subtractCharFrequency = (str, map) => {
    for (const char of str) {
        if (!map.has(char)) {
            return false;
        }
        
        map.set(char, (map.get(char) - 1));
    }
    
    return true;
}




