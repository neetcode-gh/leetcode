/**
 * https://leetcode.com/problems/subtree-of-another-tree/
 * @param {TreeNode} root
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function(root, subRoot) {
    if (root === null) {
            return false;
        }
        if (subRoot === null) {
            return true;
        }
        if (isSame(root, subRoot)) {
            return true;
        }
        return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);   
};

var isSame = function (p, q) {
    if (p === null || q === null) {
            return p === q;
        }
        return p.val === q.val && isSame(p.left, q.left) && isSame(p.right, q.right);
}
