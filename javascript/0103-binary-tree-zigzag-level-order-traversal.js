/**
 * BFS
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = (root) => {
    const isEdgeBase = (root === null);
    if (isEdgeBase) return [];
    
    return search(root);/* Time O(N) | Space O(N) */
};

var search = (root, isZigZag = true, order = []) => {
    const queue = new Queue([ root ]);
    
    while (!queue.isEmpty()) {        /* Time O(N) */
        const levels = [];

        bfs(queue, isZigZag, levels); /* Time O(WIDTH) | Space O(WIDTH) */
        order.push(levels);           /*                 Space O(N) */
        isZigZag = !isZigZag;
    }
    
    return order;
}

const bfs = (queue, isZigZag, levels) => {
    for (let level = queue.size(); (0 < level); level--) {/* Time O(WIDTH) */
        const { left, val, right } = queue.dequeue();
    
        if (left) queue.enqueue(left);  /* Space O(WIDTH) */
        if (right) queue.enqueue(right);/* Space O(WIDTH) */
        
        levels.push(val);               /* Space O(N) */
    }

    if (!isZigZag) levels.reverse();
}

