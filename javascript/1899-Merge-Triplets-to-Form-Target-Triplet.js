/**
 * @param {number[][]} triplets
 * @param {number[]} target
 * @return {boolean}
 */
var mergeTriplets = function (triplets, target) {
    var good = new Set();

    for (var t in triplets) {
        var triplet = triplets[t];
        if (
            triplet[0] > target[0] ||
            triplet[1] > target[1] ||
            triplet[2] > target[2]
        ) {
            continue;
        }

        for (var i = 0; i < triplet.length; i++) {
            if (triplet[i] === target[i]) {
                good.add(i);
            }
        }
    }

    return good.size === 3;
};

/**
 * https://leetcode.com/problems/merge-triplets-to-form-target-triplet/
 * Time O(N) | Space O(1)
 * @param {number[][]} triplets
 * @param {number[]} target
 * @return {boolean}
 */
 var mergeTriplets = function(triplets, target, res = new Array(3).fill(0)) { 
    for (const [ a, b, c ] of triplets) {          /* Time O(N) */
        const [ _a, _b, _c ] = target;

        const isTargetGreater = (a <= _a) && (b <= _b) && (c <= _c);
        if (!isTargetGreater) continue;

        const [ __a, __b, __c ] = res;
        res = [ Math.max(__a, a), Math.max(__b, b), Math.max(__c, c) ];
    }
        
    return res.every((val, i) => val === target[i])/* Time O(N) */
};

/**
 * https://leetcode.com/problems/merge-triplets-to-form-target-triplet/
 * Time O(N) | Space O(1)
 * @param {number[][]} triplets
 * @param {number[]} target
 * @return {boolean}
 */
var mergeTriplets = function(triplets, target, res = new Array(3).fill(false)) { 
    for (const [ a, b, c ] of triplets) {/* Time O(N) */
        const [ _a, _b, _c ] = target;
        
        const isTargetGreater = (a <= _a) && (b <= _b) && (c <= _c);
        if (!isTargetGreater) continue;
        
        res[0] |= (a === _a);
        res[1] |= (b === _b);
        res[2] |= (c === _c);
    }
    
    return res[0] && res[1] && res[2];
}