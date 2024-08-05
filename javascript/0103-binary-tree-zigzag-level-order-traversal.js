/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * BFS | LevelOrderTraversal
 * Time O(n) | Space O(n)
 * https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
    
    const q = new Queue();

    if(root) q.enqueue(root);

    let isLeft = true;

    const zigzagOrder = [];

    while(!q.isEmpty()) {

        let size = q.size();
        const row = [];

        while(size) {
            const node = q.dequeue();
            row.push(node.val);
            if(node.left) q.enqueue(node.left);
            if(node.right) q.enqueue(node.right);
            size--;
        }
        
        if(!isLeft) {
            zigzagOrder.push(row.reverse());
        }
        if(isLeft) {
            zigzagOrder.push(row);
        }
        isLeft = !isLeft;
    }

    return zigzagOrder;
};
