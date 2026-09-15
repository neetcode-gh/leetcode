/**
 * BackTracking | Recursion
 * Time O(n!) | Space O(n)
 * https://leetcode.com/problems/letter-tile-possibilities
 * @param {string} tiles
 * @return {number}
 */
var numTilePossibilities = function(tiles) {
    
    const freq = {};

    for (let i = 0; i < tiles.length; i++) {
        const char = tiles[i];
        freq[char] = (freq[char] && freq[char] + 1) || 1;
    }

    const dfs = (len, target) => {
        if (len === target) {
            return 1;
        }

        let total = 0;
        for (const key in freq) {
            if (!freq[key]) continue;
            freq[key] -= 1;
            total += dfs(len+1, target);
            freq[key] += 1;
        }

        return total;
    }

    let total = 0;

    for (let i = 1; i < tiles.length + 1; i++) {
        total += dfs(0, i);
    }

    return total;
};
