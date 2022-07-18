/**
 * https://leetcode.com/problems/balanced-binary-tree/
 * TIme O(N) | Space O(H)
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
    const isBaseCase = root === null;
    if (isBaseCase) return true;
    if (!isAcceptableHeight(root)) return false;
    if (!isChildBalanced(root)) return false;

    return true;
}

const isChildBalanced = (root) => {
    const left = isBalanced(root.left);
    const right = isBalanced(root.right);

    return left && right
}

const isAcceptableHeight = (root) => {
    const left = getHeight(root.left);
    const right = getHeight(root.right);

    const difference = Math.abs(left - right);

    return difference <= 1;
}

const getHeight = (root) => {
    const isBaseCase = root === null;
    if (isBaseCase) return 0;

    return dfs(root);
}

var dfs = (root) => {
    const left = getHeight(root.left)
    const right = getHeight(root.right);

    const height = Math.max(left, right);

    return height + 1;
}

/**
 * https://leetcode.com/problems/balanced-binary-tree/
 * TIme O(N) | Space O(H)
 * @param {TreeNode} root
 * @return {boolean}
 */
 var isBalanced = function (root) {
    const [ _height, _isBalanced ] = isRootBalanced(root);

    return _isBalanced;
};

var isRootBalanced = (root) => {
    const isBaseCase = root === null
    if (isBaseCase) return [ -1, true ];

    return dfs(root)
}

var dfs = (root) => {
    const [ left, isLeftBalanced ] = isRootBalanced(root.left);
    const [ right, isRightBalanced ] = isRootBalanced(root.right);
    const [ height, difference ]  = [ Math.max(left, right), Math.abs(left - right) ];

    const isAcceptableHeight = difference <= 1;
    const _isBalanced = isLeftBalanced && isRightBalanced;

    const _isRootBalanced = _isBalanced && isAcceptableHeight;

    return [ (height + 1), _isRootBalanced ];
}
