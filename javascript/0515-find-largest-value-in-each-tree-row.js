/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * BFS | Level order traversal
 * Time O(n) | Space O(n) 
 * https://leetcode.com/problems/find-largest-value-in-each-tree-row/
 * @param {TreeNode} root
 * @return {number[]}
 */
var largestValues = function(root) {
    
    if (!root) return [];
    const result = [];

    const bfs = (root) => {
        const queue = new Queue();
        queue.enqueue(root);

        while (!queue.isEmpty()) {
            let nodesCount = queue.size();
            let max = -Infinity;
            while (nodesCount) {
                const node = queue.dequeue();
                max = Math.max(max, node.val);
                if (node.left) queue.enqueue(node.left);
                if (node.right) queue.enqueue(node.right);
                nodesCount--;
            }
            result.push(max);
        }
    }

    bfs(root);
    return result;
};
