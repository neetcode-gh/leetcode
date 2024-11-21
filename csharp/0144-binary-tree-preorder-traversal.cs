public class Solution {
    public IList<int> PreorderTraversal(TreeNode root)
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

        output.Add(root.val);
        Traverse(output, root.left);
        Traverse(output, root.right);
    }
}