/**
 * https://leetcode.com/problems/kth-smallest-element-in-a-bst/
 * Time O(N + K) | Space O(H)
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
 var kthSmallest = function(root, k, inOrder = []) {
    if (!root) return inOrder

    return dfs(root, k, inOrder);
};

const dfs = (root, k, inOrder) => {
    if (root.left) kthSmallest(root.left, k, inOrder);

    inOrder.push(root.val);

    if (root.right) kthSmallest(root.right, k, inOrder);

    return inOrder[(k - 1)];
}

/**
 * https://leetcode.com/problems/kth-smallest-element-in-a-bst/
 * Time O(N + K) | Space O(H)
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
 var kthSmallest = function(root, k, stack = []) {
    while (k--) {
        root = moveLeft(root, stack);

        const isSmallest = k === 0;
        if (isSmallest) return root.val;

        root = root.right;
    }
}

const moveLeft = (root, stack) => {
    while (root !== null) {
        stack.push(root);
        root = root.left;
    }

    return stack.pop();
}
