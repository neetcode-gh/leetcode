/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        return build(Arrays.stream(preorder).boxed().toList(), Arrays.stream(inorder).boxed().toList());
    }

    private TreeNode build(List<Integer> preorder, List<Integer> inorder) {
        if (preorder.isEmpty()) {
            return null;
        }

        final TreeNode root = new TreeNode(preorder.get(0));
        final int mid = inorder.indexOf(preorder.get(0));
        root.left = build(preorder.subList(1, mid + 1), inorder.subList(0, mid));
        root.right = build(preorder.subList(mid + 1, preorder.size()), inorder.subList(mid + 1, inorder.size()));

        return root; 
    }
}

// Solution without using lists.
class Solution {

    Map<Integer, Integer> inorderPositions = new HashMap<>();

    public TreeNode buildTree(int[] preorder, int[] inorder) {
        if (preorder.length < 1 || inorder.length < 1) return null;

        for (int i = 0; i < inorder.length; i++) {
            inorderPositions.put(inorder[i], i);
        }

        return builder(preorder, 0, 0, inorder.length - 1);
    }

    public TreeNode builder(
        int[] preorder,
        int preorderIndex,
        int inorderLow,
        int inorderHigh
    ) {
        if (
            preorderIndex > preorder.length - 1 || inorderLow > inorderHigh
        ) return null;

        int currentVal = preorder[preorderIndex];
        TreeNode n = new TreeNode(currentVal);
        int mid = inorderPositions.get(currentVal);

        n.left = builder(preorder, preorderIndex + 1, inorderLow, mid - 1);
        n.right =
            builder(
                preorder,
                preorderIndex + (mid - inorderLow) + 1,
                mid + 1,
                inorderHigh
            );

        return n;
    }
}
