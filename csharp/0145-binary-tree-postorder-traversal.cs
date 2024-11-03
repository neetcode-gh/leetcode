public class Solution {
    public IList<int> PostorderTraversal(TreeNode root)
    {
        var output = new List<int>();
        Traverse(output, root);
        return output;
    }

    private void Traverse(List<int> output, TreeNode root) 
    {
        if (root is null)
        {
            return;
        }

        Traverse(output, root.left);
        Traverse(output, root.right);
        output.Add(root.val);
    }
}