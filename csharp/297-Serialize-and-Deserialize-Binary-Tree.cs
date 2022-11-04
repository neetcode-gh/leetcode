/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     public int val;
 *     public TreeNode left;
 *     public TreeNode right;
 *     public TreeNode(int x) { val = x; }
 * }
 */

public class Codec
{

    private List<string> encodedList { get; set; }

    // Encodes a tree to a single string.
    public string serialize(TreeNode root)
    {
        encodedList = new List<string>();
        void dfs(TreeNode root)
        {
            if (root == null)
            {
                encodedList.Add("N");
                return;
            }

            encodedList.Add(root.val + "");
            dfs(root.left);
            dfs(root.right);
        }

        dfs(root);
        Console.WriteLine(string.Join(",", encodedList));
        return string.Join(",", encodedList);
    }

    // Decodes your encoded data to tree.
    public TreeNode deserialize(string data)
    {
        var nodesArray = data.Split(",");
        var index = 0;

        TreeNode dfs()
        {
            if (nodesArray[index] == "N")
            {
                index++;
                return null;
            }

            var newNode = new TreeNode(int.Parse(nodesArray[index]));
            index++;
            newNode.left = dfs();
            newNode.right = dfs();
            return newNode;
        }

        return dfs();
    }
}

// Your Codec object will be instantiated and called as such:
// Codec ser = new Codec();
// Codec deser = new Codec();
// TreeNode ans = deser.deserialize(ser.serialize(root));