/**
 * https://leetcode.com/problems/binary-tree-right-side-view/
 * Time O(N) | Space O(W)
 * @param {TreeNode} root
 * @return {number[]}
 */
 var rightSideView = function(root) {
    const isBaseCase = root === null;
    if (isBaseCase) return [];

    return bfs([ root ]);
};

const bfs = (queue, rightSide = []) => {
    while (queue.length) {
        let prev = null;

        for (let i = (queue.length - 1); 0 <= i; i--) {
            const node = queue.shift();

            prev = node;

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        rightSide.push(prev.val);
    }

    return rightSide;
}

/**
 * https://leetcode.com/problems/binary-tree-right-side-view/
 * Time O(N) | Space O(H)
 * @param {TreeNode} root
 * @return {number[]}
 */
 var rightSideView = function(root, level = 0, rightSide = []) {
    const isBaseCase = root === null;
    if (isBaseCase) return rightSide;

    const isLastNode = level === rightSide.length
    if (isLastNode) rightSide.push(root.val);

    return dfs(root, level, rightSide)
}

const dfs = (root, level, rightSide) => {
    if (root.right) rightSideView(root.right, (level + 1), rightSide);
    if (root.left) rightSideView(root.left, (level + 1), rightSide);

    return rightSide
}

