/**
 * 2D-DP
 * Time O(n^2) | Space O(n^2)
 * https://leetcode.com/problems/freedom-trail/
 * @param {string} ring
 * @param {string} key
 * @return {number}
 */
var findRotateSteps = function(ring, key) {
    
    const cache = {};

    const dfs = (ringIdx, keyIdx) => {

        const hash = `${ringIdx}-${keyIdx}`;
        if (keyIdx === key.length) return 0;
        if (cache[hash]) return cache[hash];

        let min = Infinity;
        for (let i = 0; i < ring.length; i++) {
            if (ring[i] === key[keyIdx]) {
                const clockOrAntiClockStep = Math.abs(i - ringIdx);
                const complementOfClockOrAntiClockStep = ring.length - clockOrAntiClockStep;

                min = Math.min(min, 
                1 + clockOrAntiClockStep + dfs(i, keyIdx+1),
                1 + complementOfClockOrAntiClockStep + dfs(i, keyIdx+1)
                );
            }
        }

        cache[hash] = min;
        return min;
    }

    return dfs(0,0);
};
