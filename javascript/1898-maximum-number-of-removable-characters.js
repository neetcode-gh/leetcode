/**
 * https://leetcode.com/problems/maximum-number-of-removable-characters/
 * 
 * Brute force
 * Time O(removable.length * s.length) | Space O(1)
 * @param {string} s
 * @param {string} p
 * @param {number[]} removable
 * @return {number}
 */
var maximumRemovals1 = function(s, p, removable) {

    let k = 0;
    // removable.reverse();
    s = s.split('');
    p = p.split('');
    for(let i = 0; i < removable.length; i++) {
        s[removable[i]] = -1;
        if(isSubSet()) {
            k++;
        } else {
            return k;
        }
    }

  function isSubSet() {
      let i = 0;
      let j = 0;

      while(i < s.length && j < p.length) {
          if(s[i] === p[j]) {
              i++;
              j++;
          } else {
              i++;
          }
      }
      return j === p.length
  }

  return k;  
};


/**
 * 
 * Binary Search 
 * n = length of string, k = length of removable
 * Time O(log(k)*n) | Space O(k)
 * @param {string} s
 * @param {string} p
 * @param {number[]} removable
 * @return {number}
 */
var maximumRemovals = function(s, p, removable) {

    s = s.split('');
    p = p.split('');
    let left = 0;
    let right = removable.length - 1;
    let k = 0;
    while(left <= right) {
        const mid = Math.floor((left+right)/2);
        const hash = new Set(removable.slice(0, mid + 1));
        if(isSubSet(hash))  {
            k = Math.max(k, mid + 1);
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

  function isSubSet(hash) {
      let i = 0;
      let j = 0;

      while(i < s.length && j < p.length) {
          if(s[i] === p[j] && !hash.has(i)) {
              i++;
              j++;
          } else {
              i++;
          }
      }
      return j === p.length
  }

  return k;  
};
