/**
 * BFS
 * Time O(n) | Space O(1)
 * 
 * https://leetcode.com/problems/populating-next-right-pointers-in-each-node/
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */

var connect = function(root) {

    let currentNode = root;
    let nextLevelNode = root && root.left;

    while(currentNode && nextLevelNode) {
        currentNode.left.next = currentNode.right;
        if(currentNode.next) {
            currentNode.right.next = currentNode.next.left;
        }
        currentNode = currentNode.next;
        if(!currentNode) {
            currentNode = nextLevelNode;
            nextLevelNode = currentNode.left;
        }
    }

    return root;
};
