class Solution 
{
    HashMap<String, Integer> map= new HashMap<>();
    ArrayList<TreeNode> res= new ArrayList<>(); 
    
    public List<TreeNode> findDuplicateSubtrees(TreeNode root) 
    {
        Mapper(root);
        return res;
    }
    
    public String Mapper(TreeNode root)
    { 
        if(root == null)
            return "N";
        
        String left= Mapper(root.left);
        String right= Mapper(root.right);
        
        String curr= root.val +" "+left +" "+ right;
        
        map.put(curr, map.getOrDefault(curr, 0)+ 1); 
        
        if(map.get(curr) == 2) 
            res.add(root);
    
        return curr; 
    }
}