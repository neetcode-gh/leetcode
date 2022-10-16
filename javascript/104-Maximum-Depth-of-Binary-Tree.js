/**
 * https://leetcode.com/problems/maximum-depth-of-binary-tree/
 * TIme O(N) | Space O(N)
 * @param {TreeNode} root
 * @return {number}
 */
 var maxDepth = function(root) {
    const isBaseCase = root === null;
    if (isBaseCase) return 0;

    return dfs(root);
};

const dfs = (root) => {
    const left = maxDepth(root.left);
    const right = maxDepth(root.right);

    const height = Math.max(left, right);

    return height + 1;
}

/**
 * https://leetcode.com/problems/maximum-depth-of-binary-tree/
 * TIme O(N) | Space O(N)
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    const isBaseCase = root === null;
    if (isBaseCase) return 0;

    return bfs([[ root, 0 ]]);
}

const bfs = (queue, height = 0) => {
    while (queue.length) {
        for (let i = (queue.length - 1); 0 <= i; i--) {
            const [ root, depth ] = queue.shift();

            height = Math.max(height, (depth + 1));

            if (root.left) queue.push([ root.left, (depth + 1) ]);
            if (root.right) queue.push([  root.right, (depth + 1) ]);
        }
    }

    return height;
}

