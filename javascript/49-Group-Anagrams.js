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
    console.log(sorted);
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
