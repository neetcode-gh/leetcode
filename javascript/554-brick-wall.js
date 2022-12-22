// link to the problem https://leetcode.com/problems/brick-wall
// time coplexity O(n^2) or the number of bricks we have in our input.
// space complexity: whatever the length of the rows happend to be.

var leastBricks = function(wall) {
 
 const myHash = new Map();

 const width = wall[0].reduce((pre, brick) => {
     return brick + pre;
 }, 0);

 for(let i = 0; i < wall.length; i++) {
     let currentWidth = 0;
     for(let j = 0; j < wall[i].length; j++) {
         currentWidth += wall[i][j];
        myHash.has(currentWidth) ? myHash.set(currentWidth,myHash.get(currentWidth)+1) : myHash.set(currentWidth, 1);
     }
 }

// deleteing total width as this will be the rightmost gap which will always give us false positive.
myHash.delete(width);

maxGap = 0;
 for([key, value] of myHash) {
     maxGap = Math.max(maxGap, value);
 }

 return wall.length - maxGap;
};
