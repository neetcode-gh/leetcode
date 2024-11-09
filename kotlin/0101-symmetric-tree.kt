/*
* Recursive solution
*/
class Solution {
    fun isSymmetric(root: TreeNode?): Boolean {

        fun dfs(left: TreeNode?, right: TreeNode?): Boolean {
            if(left == null && right == null)
                return true
            if(left == null || right == null)
                return false

            return left.value == right.value &&
                dfs(left.left, right.right) &&
                dfs(left.right, right.left)
        }

        return dfs(root!!.left, root!!.right)
    }

    val TreeNode.value get()= this.`val`
}

/*
* Iterative solution
*/
class Solution {
    fun isSymmetric(root: TreeNode?): Boolean {
       val q = LinkedList<TreeNode?>()
       q.addFirst(root!!.left)
       q.addFirst(root!!.right)

        while(q.isNotEmpty()) {
            val left = q.removeFirst()
            val right = q.removeFirst()

            if(left == null && right == null)
                continue

            if(left == null || right == null || left.value != right.value)
                return false
            
            q.addFirst(left.left)
            q.addFirst(right.right)
            q.addFirst(left.right)
            q.addFirst(right.left)
        }

        return true
    }   

    val TreeNode.value get()= this.`val`
}
