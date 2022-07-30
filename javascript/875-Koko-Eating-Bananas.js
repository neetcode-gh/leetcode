//////////////////////////////////////////////////////////////////////////////
// Binary Search Of Potential Answers
// Time: O(n*log(m))  Space: O(1)
//////////////////////////////////////////////////////////////////////////////

/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
function minEatingSpeed(piles, h) {
    let l = 0;
    let r = Math.max.apply(Math, piles);

    if (piles.length === h) {
        return r;
    }

    while (l < r) {
        const m = Math.floor((l + r) / 2);
        let hours = 0;
        for (const pile of piles) {
            hours += Math.ceil(pile / m);
        }
        if (hours > h) {
            l = m + 1;
        } else {
            r = m;
        }
    }

    return l;
}
