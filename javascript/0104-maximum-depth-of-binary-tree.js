/**
 * https://leetcode.com/problems/maximum-depth-of-binary-tree/
 * Time O(N) | Space O(N)
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
};

/**
 * https://leetcode.com/problems/maximum-depth-of-binary-tree/
 * Time O(N) | Space O(N)
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    const isBaseCase = root === null;
    if (isBaseCase) return 0;

    return iterativeDfs([[root, 1]]);
};

const iterativeDfs = (stack, height = 0) => {
    while (stack.length) {
        const [root, depth] = stack.pop();

        height = Math.max(height, depth);

        if (root.right) stack.push([root.right, depth + 1]);
        if (root.left) stack.push([root.left, depth + 1]);
    }

    return height;
};

/**
 * https://leetcode.com/problems/maximum-depth-of-binary-tree/
 * Time O(N) | Space O(N)
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    const isBaseCase = root === null;
    if (isBaseCase) return 0;

    return bfs([[ root, 0 ]]);
};

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
};
