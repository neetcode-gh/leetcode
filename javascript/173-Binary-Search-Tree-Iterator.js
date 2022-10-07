/**
 * https://leetcode.com/problems/binary-search-tree-iterator/
 * Time Average O(1) | Space O(H)
 * @return {number}
 */

/**
 * @param {TreeNode} root
 */
var BSTIterator = function(root) {
    this.stack = []
    this.insert = function(root) {
        while(root) {
            this.stack.push(root)
            root = root.left
        }
    }
    this.insert(root)
};

/**
 * Time Average O(1) | Space O(H)
 * @return {number}
 */
BSTIterator.prototype.next = function() {
    let popped = this.stack.pop()
    this.insert(popped.right)
    return popped.val
};

/**
 * Time O(1)
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function() {
    return this.stack.length != 0
};
