//iterative version
class Solution {
    fun preorderTraversal(root: TreeNode?): List<Int> {
        val res = ArrayList<Int>()
        val stack = Stack<TreeNode>()
                
        if (root != null) stack.push(root)
        
        while (!stack.isEmpty()) {
            
            val node = stack.pop()
            res.add(node.`val`)
            
            if (node.right != null) stack.push(node.right)
            if (node.left != null) stack.push(node.left)  
        }
        
        return res
    }
}

//recursion version
class Solution {
    fun preorderTraversal(root: TreeNode?): List<Int> {
        val res = ArrayList<Int>()
        
        fun preOrder(node: TreeNode?) {
            node?: return
            res.add(node.`val`)
            preOrder(node.left)
            preOrder(node.right)
        }
        
        preOrder(root)
        return res
    }
}
