class Solution {
    fun flipEquiv(r1: TreeNode?, r2: TreeNode?): Boolean {
        if (r1 == null || r2 == null) {
            return if (r1 == null && r2 == null) true else false  
        }
        if (r1.value != r2.value)
            return false
        
        val a = flipEquiv(r1.left, r2.left) && flipEquiv(r1.right, r2.right)
        return a ||flipEquiv(r1.left, r2.right) && flipEquiv(r1.right, r2.left)

    }

    val TreeNode.value
        get()= this.`val`
}
