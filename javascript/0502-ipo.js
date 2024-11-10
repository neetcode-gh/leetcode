/**
 * MaxPriorityQueue | Sorting 
 * Time O(n*log(n)) | Space O(n)
 * https://leetcode.com/problems/ipo/description/
 * @param {number} k
 * @param {number} w
 * @param {number[]} profits
 * @param {number[]} capital
 * @return {number}
 */
var findMaximizedCapital = function(k, w, profits, capital) {
   
   const maxQueue = new MaxPriorityQueue({
    compare: (a, b) => {
        return b[0] - a[0];
    }
   });

   const minQueue = new MinPriorityQueue({
    compare: (a, b) => {
        return a[0] - b[0];
    }
   });

   const pc = profits.map((profit, idx) => {
    return [profit, capital[idx]];
   });

   for (let i = 0; i < pc.length; i++) {
    minQueue.enqueue([pc[i][1], pc[i][0]]);
   }

   let cc = w;
   while (k && (!maxQueue.isEmpty() || !minQueue.isEmpty())) {

    // add all the project that we can take to maxQ
    while (!minQueue.isEmpty() && cc >= minQueue.front()[0]) {
        const curr = minQueue.dequeue();
        maxQueue.enqueue([curr[1], curr[0]]);
    }

    if (!maxQueue.isEmpty()) {
        cc += maxQueue.dequeue()[0];
    }

    k--;
   }

   return cc;
};

