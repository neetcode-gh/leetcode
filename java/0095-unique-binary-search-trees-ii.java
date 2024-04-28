class Solution {
    public List<TreeNode> generateTrees(int n) {
        return generate(1, n);
    }

    private List<TreeNode> generate(int left, int right) {
        if (left > right) {
            List<TreeNode> r = new ArrayList<>();
            r.add(null);
            return r;
        }

        List<TreeNode> res = new ArrayList<>();
        for (int val = left; val <= right; val++) {
            for (TreeNode leftSubtree : generate(left, val - 1)) {
                for (TreeNode rightSubtree: generate(val + 1, right)) {
                    TreeNode root = new TreeNode(val);
                    root.left = leftSubtree;
                    root.right = rightSubtree;
                    res.add(root);
                }
            }
        }

        return res;
    }
}
