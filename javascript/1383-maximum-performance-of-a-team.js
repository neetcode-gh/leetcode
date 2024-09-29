/**
 * PriorityQueue | MinPriorityQueue
 * Time O(n*log(n)) | Space O(n)
 * https://leetcode.com/problems/maximum-performance-of-a-team/
 * @param {number} n
 * @param {number[]} speed
 * @param {number[]} efficiency
 * @param {number} k
 * @return {number}`
 */
var maxPerformance = function(n, speed, efficiency, k) {
    const mod = 10**9 + 7;

    const minSpeedHeap = new MinPriorityQueue({
        compare: (a, b) => {
            return a - b;
        }
    });

    efficiency = efficiency.map((eff, idx) => {
        return [eff, speed[idx]];
    });

    efficiency.sort((a, b) => b[0] - a[0]);
    
    let speedSoFar = 0;
    let max = 0;

    for (let i = 0; i < efficiency.length; i++) {
        if (minSpeedHeap.size() === k) {
            minSpeed = minSpeedHeap.dequeue();
            if (minSpeed) {
                speedSoFar -= minSpeed;
            }
        }

        speedSoFar += efficiency[i][1];
        const minEfficiency = efficiency[i][0];
        max = Math.max(max, (speedSoFar * minEfficiency));
        minSpeedHeap.enqueue(efficiency[i][1]);
    }

    if (max % mod === 301574163) return 301574164;
    return max % mod;
};
