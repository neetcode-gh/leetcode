
// link to the problem https://leetcode.com/problems/pascals-triangle/
// the time complexity will basically be the number of elements in pascale tringle. roughly height of tringle * number of honeycomb in each row.
// O(n^2);

var generate = function(num) {
    
    const outerArray = [];
    // adding first two rows of pascals triangle
    if (num >= 2) {
      outerArray.push([1]);
      outerArray.push([1, 1]);
    } else {
      outerArray.push([1]);
    }
  
    // will  only run if we had number greater than 2
    if (num > 2) {
      for (let i = 2; i < num; i++) {
        let subArray = [];
         subArray.push(1);
        for (let j = 0; j < outerArray[i - 1].length - 1; j++) {
          subArray.push(outerArray[i - 1][j] + outerArray[i - 1][j + 1]);
        }
        subArray.push(1);
        outerArray.push(subArray);
      }
    }
  
    return outerArray;
 };
