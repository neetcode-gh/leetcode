/**
 * Array
 * Time O(n) | Space O(n)
 * https://leetcode.com/problems/candy/
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function(ratings) {
    
    const ltr = new Array(ratings.length).fill(1);
    const rtl = new Array(ratings.length).fill(1);

    // go from left to right
    for (let i = 1; i < ratings.length; i++) {
      if (ratings[i] > ratings[i - 1]) {
        ltr[i] = ltr[i - 1] + 1;
      }
    }
    // go from right to left
    for (let i = ratings.length - 2; i > -1; i--) {
      if (ratings[i] > ratings[i + 1]) {
        rtl[i] = rtl[i + 1] + 1;
      }
    }
    // calc minimum 
    let candy = 0;
    for (let i = 0; i < ratings.length; i++) {
      candy += Math.max(ltr[i], rtl[i]);
    }
    return candy;
};
