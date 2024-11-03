/**
 * Loop Solution
 * Time O(N) | Space O(1)
 * https://leetcode.com/problems/can-place-flowers
 * @param {number[]} fb
 * @param {number} n
 * @return {boolean}
 */

var canPlaceFlowers = function (fb, n) {
	if (n === 0) return true;

	for (let i = 0; i < fb.length; i++) {
		if (fb[i] === 0) {
			fb[i - 1] !== 1 && fb[i + 1] !== 1 && n-- && i++;
		} else {
			i++;
		}
		if (n === 0) return true;
	}

	return false;
};
