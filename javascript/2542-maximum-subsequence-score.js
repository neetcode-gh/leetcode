/**
 * MinPriorityQueue | Sorting
 * Time O(n*log(n)) | space O(n)
 * https://leetcode.com/problems/maximum-subsequence-score/
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
var maxScore = function(nums1, nums2, k) {

    const minQ = new MinPriorityQueue({
        compare: (a,b) => {
            return a - b;
        }
    });

    let maxScore = 0;
    let runningTotal = 0;
    let takenElements = 0;

    const nums12 = nums1.map((num, idx) => {
        return [num, nums2[idx]];
    });

    nums12.sort((a,b) => {
        return b[1] - a[1];
    });
    
    for(let i = 0; i < nums12.length; i++) {
        const n1 = nums12[i][0];
        const n2 = nums12[i][1];

        runningTotal += n1;
        minQ.enqueue(n1);

        if(minQ.size() === k) {
            maxScore = Math.max(maxScore, runningTotal * n2);
        }
        if(minQ.size() > k) {
            runningTotal -= minQ.dequeue();
            maxScore = Math.max(maxScore, runningTotal * n2);
        }
    }

    return maxScore;
};
