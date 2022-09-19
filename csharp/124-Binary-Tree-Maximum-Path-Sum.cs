public class Solution {
 
int maxPathSum = Int32.MinValue;

        public int MaxPathSum(TreeNode root)
        {
            DfsMaxPathSum(root);
            return maxPathSum;
        }

        private int DfsMaxPathSum(TreeNode root)
        {
            if (root == null)
                return 0;

            int leftMax = DfsMaxPathSum(root.left),
                rightMax = DfsMaxPathSum(root.right),
                currentMax = 0;

            currentMax = Math.Max(currentMax, Math.Max(leftMax + root.val, rightMax + root.val));
            maxPathSum = Math.Max(maxPathSum, leftMax + root.val + rightMax);

            return currentMax;
        }
}
