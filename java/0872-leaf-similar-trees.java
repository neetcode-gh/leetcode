class Solution {
    public boolean leafSimilar(TreeNode root1, TreeNode root2) {
        ArrayList<Integer> ls1 = new ArrayList<>();
        ArrayList<Integer> ls2 = new ArrayList<>();
        tree(root1, ls1);
        tree(root2, ls2);
        return ls1.equals(ls2);
    }
    private void tree(TreeNode root, List<Integer> ls){
        if(root == null)
            return;
        if(root.left == null && root.right == null)
            ls.add(root.val);
        tree(root.left, ls);
        tree(root.right, ls);        
    }
}
