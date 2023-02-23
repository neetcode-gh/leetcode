class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        return generateTree(nums, 0, nums.length - 1);
    }

    public TreeNode generateTree(int[] nums, int low, int high) {
        if (low > high) {
            return null;
        }

        int mid = low + ((high - low) / 2);
        TreeNode node = new TreeNode(nums[mid]);

        node.left = generateTree(nums, low, mid - 1);
        node.right = generateTree(nums, mid + 1, high);

        return node;
    }
}