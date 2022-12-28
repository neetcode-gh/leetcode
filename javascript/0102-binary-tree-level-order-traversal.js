/**
 * https://leetcode.com/problems/binary-tree-level-order-traversal/
 * Time O(N) | Space O(W)
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    const isBaseCase = root === null;
    if (isBaseCase) return [];

    return bfs([ root ]);
};

const bfs = (queue, levels = []) => {
    while (queue.length) {
        const level = [];

        for (let i = (queue.length - 1); 0 <= i; i--) {
            const node = queue.shift();

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);

            level.push(node.val);
        }

        levels.push(level.slice());
    }

    return levels;
}

/**
 * https://leetcode.com/problems/binary-tree-level-order-traversal/
 * Time O(N) | Space O(H)
 * @param {TreeNode} root
 * @return {number[]}
 */
 var levelOrder = function(root, level = 0, levels = []) {
    const isBaseCase = root === null;
    if (isBaseCase) return levels;

    const isLastNode = level === levels.length;
    if (isLastNode) levels.push([]);

    levels[level].push(root.val);

    return dfs(root, level, levels);
}

const dfs = (root, level, levels) => {
    if (root.left) levelOrder(root.left, (level + 1), levels);
    if (root.right) levelOrder(root.right, (level + 1), levels);

    return levels;
}
