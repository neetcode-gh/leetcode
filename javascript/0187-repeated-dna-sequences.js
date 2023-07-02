/**
 * https://leetcode.com/problems/repeated-dna-sequences/
 * Hashing
 * s = the number of letters in the sequance. In our case it's 10. so the time complexity would be 10*n which boils down to n.
 * Time O(s*n) | Space O(n)
 * @param {string} s
 * @return {string[]}
 */

var findRepeatedDnaSequences = function(s) {

    const sequenceSet = new Set();
    let resultSet = new Set();
  
    for(let i = 0; i < s.length; i++) {
        const subSequance = getSubSequance(s,i,10); 
        if(sequenceSet.has(subSequance)) {
            resultSet.add(subSequance);
        } else {
            sequenceSet.add(subSequance);
        }
    }  
  
    resultSet = [...resultSet];
    return resultSet;
  };
  
  function getSubSequance(s,i,len) {
      return s.slice(i, i + len);
  }
  
