var lengthOfLongestSubstring = function (str) {
  const hash = {};
  let start = 0;
  let max = 0;

  for (let i = 0; i < str.length; i++) {
    let rightChar = str[i];

    if (!(rightChar in hash)) hash[rightChar] = 0;
    hash[rightChar] += 1;

    while (hash[rightChar] > 1) {
      let leftChar = str[start];
      start += 1;

      if (leftChar in hash) hash[leftChar] -= 1;
      if (hash[leftChar] === 0) delete hash[leftChar];
    }
    max = Math.max(max, i - start + 1);
  }
  return max;
};


/**
 * @param {string} str
 * @return {number}
 */
 var lengthOfLongestSubstring = function(str) {

  let set = new Set()
  let max = 0;
  
  let firstLetterTracker = 0
  for(let i = 0; i < str.length; i++) {
      const letter = str[i]
      
      while(set.has(letter)){
        const firstLetter = str[firstLetterTracker]
        set.delete(firstLetter)
        firstLetterTracker++
      }

      set.add(letter)

      max = Math.max(max,i - firstLetterTracker + 1)   
  }
  
  return max;
};


/**
 * @param {string} str
 * @return {number}
 */
var lengthOfLongestSubstring = function(str) {
  let windowStart = 0, maxLength = 0, charIndexMap = {};

  for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
    const rightChar = str[windowEnd];

    if (rightChar in charIndexMap) {
      windowStart = Math.max(windowStart, charIndexMap[rightChar] + 1);
    }

    charIndexMap[rightChar] = windowEnd;
    maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
  }

  return maxLength;
}