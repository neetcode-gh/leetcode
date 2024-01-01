// iterative solution
class Solution {
    fun postorderTraversal(root: TreeNode?): List<Int> {
        val res = ArrayList<Int>()
        val stack = Stack<TreeNode>()
                
        if (root != null) stack.push(root)
        while (!stack.isEmpty()) {
            val node = stack.pop()
            res.add(0, node.`val`)
            if (node.left != null) stack.push(node.left)
            if (node.right != null) stack.push(node.right)
        }
        
        return res
    }
}

//iterative solution, doing preorder traversal BUT adding left before right, and at end reversing the result list to get correct order
class Solution {
    fun postorderTraversal(root: TreeNode?): List<Int> {
        val res = ArrayList<Int>()
        val stack = Stack<TreeNode>()
                
        if (root != null) stack.push(root)
        while (!stack.isEmpty()) {
            
            val node = stack.pop()
            res.add(node.`val`)
            
            if(node.left != null) stack.push(node.left)
            if(node.right != null) stack.push(node.right)
        }
        
        res.reverse()
        return res
    }
}

//recursion version
class Solution {
    fun postorderTraversal(root: TreeNode?): List<Int> {
        val res = ArrayList<Int>()
        
        fun postOrder(node: TreeNode?) {
            node?: return
            postOrder(node.left)
            postOrder(node.right)
            res.add(node.`val`)
        }
        
        postOrder(root)
        return res
    }
}
