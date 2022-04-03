var containsDuplicate = function(nums) {
    return (new Set(nums)).size !== nums.length;
};
