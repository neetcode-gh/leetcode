/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * Controlled Recursion - Average Time (1)
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/binary-search-tree-iterator/
 * @param {TreeNode} root
 */
class BSTIterator {
    constructor (root) {
        this.stack = [];   /*           | Space O(N) */
        this.getLeft(root);/* Time O(N) | Space O(N)*/
    }

    /**
     * Time O(N) | Space O(H)
     * @return {number}
     */
    getLeft (root, { stack } = this) {
        while (root !== null) {/* Time O(N) */
            stack.push(root);      /* Space O(N) */
            root = root.left;
        }
    }

    /**
     * Time O(N) | Space O(N)
     * @return the next smallest number
     * @return {number}
     */
    next ({ stack } = this) {
        const node = stack.pop();

        if (node.right) this.getLeft(node.right);/* Time O(N) | Space O(N) */

        return node.val;
    };

    /**
     * Time O(1) | Space O(1)
     * @return whether we have a next smallest number
     * @return {boolean}
     */
    hasNext ({ stack } = this) {
        return (stack.length !== 0);
    }
}

/** 
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
