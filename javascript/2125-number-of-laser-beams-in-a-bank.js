/**
 * Two Pointers | Math | Array
 * Time O(n) | Space O(1)
 * https://leetcode.com/problems/number-of-laser-beams-in-a-bank/
 * @param {string[]} bank
 * @return {number}
 */
var numberOfBeams = function(bank) {

    let totalBeams = 0;

    let left = 0;
    let right = left + 1;

    const countBeam = (beam) => {
        return beam.split("").filter((b) => b === "1").length;
    }

    while (right < bank.length) {
        while (right < bank.length && !countBeam(bank[right])) {
            right++;
        } 

        if (right < bank.length) {
            totalBeams += countBeam(bank[left]) * countBeam(bank[right]);
        }
        left = right;
        right++;
    }
    return totalBeams;
};
