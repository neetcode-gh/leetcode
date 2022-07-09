/**
 * @param {string[]} strs
 * @return {string[][]}
 */
const groupAnagrams = (strs) => {
  const result = [];
  const map = new Map();
  for (let i = 0; i < strs.length; i++) {

      const hash = new Array(26).fill("\x00");

      for (let c of strs[i]){
          const codeDiff = c.charCodeAt(0) - 'a'.charCodeAt(0);
          hash[codeDiff] = String.fromCharCode(hash[codeDiff].charCodeAt(0) + 1);
      }

      const hashString = hash.join();
      if (map.has(hashString)) {
        map.get(hashString).push(strs[i]);
      } else {
        map.set(hashString, [strs[i]]); 
      }
  }

  for (let [key, value] of map) {
    result.push(value);
  }
  return result;
};