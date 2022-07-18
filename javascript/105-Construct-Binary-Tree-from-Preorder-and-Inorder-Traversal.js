/**
 * https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
 * Time O(N^2) | Space(H)
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
 var buildTree = function(preorder, inorder) {
    const isBaseCase = !preorder.length || !inorder.length;
    if (isBaseCase) return null;

    return dfs(preorder, inorder);
}

var dfs = (preorder, inorder) => {
    const { leftInorder, mid, rightInorder } = getPointers(preorder, inorder);
    const root = new TreeNode(inorder[mid]);

    root.left = buildTree(preorder, leftInorder);
    root.right = buildTree(preorder, rightInorder);

    return root;
}

const getPointers = (preorder, inorder) => {
    const next = preorder.shift();
    const mid = inorder.indexOf(next);
    const leftInorder = inorder.slice(0, mid);
    const rightInorder = inorder.slice(mid + 1);

    return { leftInorder, mid, rightInorder };
}

/**
 * https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
 * Time O(N) | Space(H)
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
 var buildTree = function(preorder, inorder, max = -Infinity, indices = { preorder: 0, inorder: 0 }) {
    const isBaseCase = preorder.length <= indices.inorder;
    if (isBaseCase) return null;

    const isAtEnd = inorder[indices.inorder] === max;
    if (isAtEnd) {
        indices.inorder++;
        return null;
    }

    return dfs(preorder, inorder, max, indices);
}

var dfs = (preorder, inorder, max, indices) => {
    const val = preorder[indices.preorder++]
    const root = new TreeNode(val);

    root.left = buildTree(preorder, inorder, root.val, indices);
    root.right = buildTree(preorder, inorder, max, indices);

    return root;
}
