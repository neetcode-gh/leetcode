var sortedArrayToBST = function(nums) {
      return traverse(nums, 0, nums.length - 1);
};

function traverse(nums, start, end) {

  if (start > end) {
    return null
  }

  let mid = Math.floor((start + end) / 2);

  const root = new TreeNode(nums[mid]);
  root.left = traverse(nums, start, mid - 1);
  root.right = traverse(nums, mid + 1, end);


  return root;
}
