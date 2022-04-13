/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var subsetsWithDup = function(nums) {
  nums.sort();
	const result = [];
	function backtrack(i, curr) {
		if (i == nums.length) {
      result.push([...curr]);
      return;
    };

		curr.push(nums[i]);
		backtrack(i+1, curr);
		curr.pop();
    
    while (i+1 < nums.length && nums[i] == nums[i+1]) i++;
		backtrack(i+1, curr);
	};
	backtrack(0,[]);
	return result;
};