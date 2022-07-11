/**
 * @param {number[]} nums
 * @return {number}
 */
 var rob = function(nums) {
	const n = nums.length;
	if (n == 1) return nums[0];

	function houseRobber(start, end) {
		let first = 0;
		let second = nums[start];
		for (let i = start +1; i < end; i++) {
			let temp = Math.max(first + nums[i], second);
			first = second;
			second = temp;
		};
		return second;
	};

	return Math.max(houseRobber(0, n-1), houseRobber(1, n));
};