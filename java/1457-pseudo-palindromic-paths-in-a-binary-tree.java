class Solution {
    Map<Integer, Integer> count = new HashMap<>();
    int odd = 0;

    public int pseudoPalindromicPaths(TreeNode root) {
        return dfs(root);
    }

    private int dfs(TreeNode curr) {
        if (curr == null) {
            return 0;
        }

        count.put(curr.val, count.getOrDefault(curr.val, 0) + 1);
        int oddChange = count.get(curr.val) % 2 == 1 ? 1 : -1;
        odd += oddChange;

        int res = 0;
        if (curr.left == null && curr.right == null) {
            res = (odd <= 1) ? 1 : 0;
        } else {
           res = dfs(curr.left) + dfs(curr.right);
        }

        odd -= oddChange;
        count.put(curr.val, count.get(curr.val) - 1);
        return res;
    }
}
