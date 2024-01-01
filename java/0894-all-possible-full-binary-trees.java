class Solution {
    HashMap<Integer, List<TreeNode>> memo = new HashMap<>();
    public List<TreeNode> allPossibleFBT(int n) {
        if(n == 0)
            return new ArrayList<TreeNode>();
        if(n == 1)
            return new ArrayList<TreeNode>(Arrays.asList(new TreeNode(0)));
        if(memo.containsKey(n))
            return memo.get(n);

        List<TreeNode> res = new ArrayList<>();
        for(int l = 0; l < n; l++){
            int r = n-1-l;
            List<TreeNode> leftTree = allPossibleFBT(l);
            List<TreeNode> rightTree = allPossibleFBT(r);

            for(TreeNode t1 : leftTree){
                for(TreeNode t2 : rightTree){
                    res.add(new TreeNode(0, t1, t2));
                }
            }
        }
        memo.put(n, res);
        return res;            
    }
}
