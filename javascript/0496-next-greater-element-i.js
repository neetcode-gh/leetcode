/**
 * HashMap and Stack
 * Time O(N + M) | Space O(N)
 * https://leetcode.com/problems/next-greater-element-i
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */

var nextGreaterElement = function (nums1, nums2) {
	const subsetMap = new Map(nums1.map((val, i) => [val, i]));
	const res = new Array(nums1.length).fill(-1);

	let stack = [];

	for (let num of nums2) {
		while (stack.length && num > stack.at(-1)) {
			const val = stack.pop();
			const idx = subsetMap.get(val);
			res[idx] = num;
		}

		if (subsetMap.has(num)) stack.push(num);
	}

	return res;
};
