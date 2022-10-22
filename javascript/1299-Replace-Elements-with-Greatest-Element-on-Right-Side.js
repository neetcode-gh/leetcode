/**
 * Reverse - Space O(1)
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side/
 * @param {number[]} arr
 * @return {number[]}
 */
var replaceElements = (arr, max = -1, ans = [ -1 ]) => {    
    arr = arr.reverse();                          /* Time O(N) */
    
    for (let i = 0; (i < (arr.length - 1)); i++) {/* Time O(N) */
        max = Math.max(max, arr[i]);
        ans[(i + 1)] = max;                           /* Space O(N) */
    }
    
    return ans.reverse();                         /* Time O(N) */
};

/**
 * Backward - In-Place
 * Time O(N) | Space O(1)
 * https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side/
 * @param {number[]} arr
 * @return {number[]}
 */
var replaceElements = (arr, max = -1) => {  
     for (let i = (arr.length - 1); (0 <= i); i--) {/* Time O(N) */
         const num = arr[i];

         arr[i] = max;
         max = Math.max(max, num);
     }

     return arr;
};
