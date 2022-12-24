/**
 * Time O(N^2) | Space O(N)
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    
    let pre = strs[0];
    
    for(let word of strs) {
                
        for(let i = pre.length - 1; i >= 0; i--) {
                             
            if(pre[i] !== word[i]) {
                pre = pre.slice(0, i);
            }
        }
    }
    
    return pre;
};
