//iterative version
class Solution {
    fun inorderTraversal(root: TreeNode?): List<Int> {
        val res = ArrayList<Int>()
        val stack = Stack<TreeNode>()
                
        var node = root
        while(node != null || !stack.isEmpty()){
            while(node != null){
                stack.push(node)
                node = node.left
            }
            node = stack.pop()
            res.add(node.`val`)
            node = node.right
        }
    
        return res
    }
}

//recursion version
class Solution {
    fun inorderTraversal(root: TreeNode?): List<Int> {
        val res = ArrayList<Int>()
        
        fun inOrder(node: TreeNode?) {
            node?: return
            inOrder(node.left)
            res.add(node.`val`)
            inOrder(node.right)
        }
        
        inOrder(root)
        return res
    }
}
