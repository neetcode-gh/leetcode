/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * Recursion | Tree
 * Time O(n) | Space O(n)
 * https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
    

    let globleIdx = inorder.length - 1;

    const dfs = (start, end) => {
        if(start === end) {
            globleIdx--;
            return new TreeNode(inorder[start]);
        }

        if(start > end) return null;

        let i = start;

        while(i < end + 1){
            if(inorder[i] === postorder[globleIdx]) break;
            i++;
        }

        globleIdx--;
        const currRoot = new TreeNode(inorder[i]);

        currRoot.right = dfs(i + 1, end);
        currRoot.left = dfs(start, i - 1);

        return currRoot;
    }

    return dfs(0, globleIdx);
};
