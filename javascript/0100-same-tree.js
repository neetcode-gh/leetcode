/**
 * https://leetcode.com/problems/same-tree/
 * TIme O(N) | Space O(H)
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    const isBaseCase = !(p || q);
    if (isBaseCase) return true;

    const isBalanced = (p && q);
    if (!isBalanced) return false;

    const isSame = p.val === q.val;
    if (!isSame) return false;

    return dfs(p, q);
};

const dfs = (p, q) => {
    const left = isSameTree(p.left, q.left);
    const right = isSameTree(p.right, q.right);

    return left && right;
}

/**
 * https://leetcode.com/problems/same-tree/
 * TIme O(N) | Space O(W)
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    if (isSameNode(p, q)) return true;

    return bfs([[ p, q ]]);
}

const bfs = (queue) => {
    while (queue.length) {
        for (let i = (queue.length - 1); 0 <= i; i--) {
            const [ p, q ] = queue.shift();

            if (!isSame(p, q)) return false;

            if (p.left) queue.push([ p.left, q.left ]);
            if (p.right) queue.push([ p.right, q.right ]);
        }
    }

    return true;
}

const isSameNode = (p, q) => {
    const isBaseCase = !(p || q);
    if (isBaseCase) return true;

    const isBalanced = (p && q);
    if (!isBalanced) return false;

    const isSame = p.val === q.val;
    if (!isSame) return false;

    return true;
}

const isSame = (p, q) => isSameNode(p, q)
    && isSameNode(p.left, q.left)
    && isSameNode(p.right, q.right);
