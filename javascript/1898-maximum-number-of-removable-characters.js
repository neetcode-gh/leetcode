/**
 * https://leetcode.com/problems/maximum-number-of-removable-characters/
 * 
 * Brute force
 * Time O(removable.length * s.length) | Space O(n)
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

  for (let i = 0; i < removable.length; i++) {
    s[removable[i]] = -1;
    if (isSubSet1(s, p)) {
      k++;
      continue;
    } 
    return k;
  }

  return k;
};

// helper function.
function isSubSet1(s, p) {
  let i = 0;
  let j = 0;

  while (i < s.length && j < p.length) {
    if (s[i] === p[j]) {
      i++;
      j++;
    } else {
      i++;
    }
  }

  return j === p.length;
}


/**
 * 
 * Binary Search 
 * n = length of string, k = length of removable
 * Time O(log(k)*n) | Space O(1)
 * @param {string} s
 * @param {string} p
 * @param {number[]} removable
 * @return {number}
 */
var maximumRemovals = function(s, p, removable) {

  let left = 0;
  let right = removable.length - 1;
  let k = 0;

  while (left <= right) {
    const mid = (left + right) >> 1;
    const hash = new Set(removable.slice(0, mid + 1));

    if (isSubSet(hash, s, p)) {
      k = Math.max(k, mid + 1);
      left = mid + 1;
      continue;
    }

    right = mid - 1;
  }

  return k;
};

// helper function.
function isSubSet(hash, s, p) {
  let i = 0;
  let j = 0;

  while (i < s.length && j < p.length) {
    if (s[i] === p[j] && !hash.has(i)) {
      i++;
      j++;
      continue;
    }

    i++;
  }

  return j === p.length;
}
