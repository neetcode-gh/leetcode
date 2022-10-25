/**
 * Time O(N) | Space O(N)
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
    
    let sArr = s.split(" ");
    
    for(let i = 0; i < sArr.length; i++) {
        if(sArr[i] === '') {
            sArr.splice(i, 1);     
            i--;
        }
    }
        
    return sArr[sArr.length - 1].length;
};
