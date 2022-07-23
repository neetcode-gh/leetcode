//This video helped https://www.youtube.com/watch?v=LgLRTaEMRVc&ab_channel=takeUforward

class Solution {

    public TreeNode buildTree(int[] inorder, int[] postorder) {
        HashMap<Integer, Integer> inMap = new HashMap<>();
        for (int i = 0; i < inorder.length; i++) {
            inMap.put(inorder[i], i);
        }
        return helper(
            inorder,
            0,
            inorder.length - 1,
            postorder,
            0,
            postorder.length - 1,
            inMap
        );
    }

    public TreeNode helper(
        int[] inorder,
        int iStart,
        int iEnd,
        int[] postorder,
        int pStart,
        int pEnd,
        HashMap<Integer, Integer> inMap
    ) {
        if (pStart > pEnd || iStart > iEnd) {
            return null;
        }
        TreeNode root = new TreeNode(postorder[pEnd]);
        int index = inMap.get(postorder[pEnd]);
        int numsLeft = index - iStart;
        root.left =
            helper(
                inorder,
                iStart,
                index - 1,
                postorder,
                pStart,
                pStart + numsLeft - 1,
                inMap
            );
        root.right =
            helper(
                inorder,
                index + 1,
                iEnd,
                postorder,
                pStart + numsLeft,
                pEnd - 1,
                inMap
            );
        return root;
    }
}
