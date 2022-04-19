//Definition for a binary tree node.
/*
class TreeNode<T>{
    TreeNode<T> left;
    TreeNode<T> right;
    T data;

    TreeNode(T data){
        this.data = data;
    }
}
*/

public class Solution {
    public boolean isSameTree(TreeNode<Integer> p, TreeNode<Integer> q){
        if(p==null && q==null)
            return true;

        if(p.data == q.data){
            return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
        }

        return false;
    }
}
