/**
 * Check if both nodes are null (end of a branch in both trees)
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
    // Check if both nodes are null (end of a branch in both trees)
    const areBothNodesNull = p == null && q == null;
    if (areBothNodesNull) return true;

    // Check if only one node is null (mismatch in tree structure)
    const isOnlyOneNodeNull = p == null || q == null;
    if (isOnlyOneNodeNull) return false;

    // Check if node values are equal (mismatch in node values)
    const doNodesHaveEqualValue = p.val == q.val;
    if (!doNodesHaveEqualValue) return false;

    // Recursively check left and right subtrees
    return dfs(p, q);
};

/**
 * * https://leetcode.com/problems/same-tree/
 * * Time complexity is O(N), where N is the total number of nodes in the tree.
   * This is because in the worst-case scenario, we need to visit every node once.

 * * Space complexity is O(H), where H is the height of the tree.
   * This is because in the worst-case scenario (a skewed tree), the maximum
   * amount of space is consumed by the recursive stack. 
 * @param {*} p 
 * @param {*} q 
 * @returns 
 */
const dfs = (p, q) => {
    const left = isSameTree(p.left, q.left);
    const right = isSameTree(p.right, q.right);

    return left && right;
};

/**
 * https://leetcode.com/problems/same-tree/
 * TIme O(N) | Space O(W)
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
    if (isSameNode(p, q)) return true;

    return bfs([[p, q]]);
};

const bfs = (queue) => {
    while (queue.length) {
        for (let i = queue.length - 1; 0 <= i; i--) {
            const [p, q] = queue.shift();

            if (!isSame(p, q)) return false;

            if (p.left) queue.push([p.left, q.left]);
            if (p.right) queue.push([p.right, q.right]);
        }
    }

    return true;
};

const isSameNode = (p, q) => {
    const isBaseCase = !(p || q);
    if (isBaseCase) return true;

    const isBalanced = p && q;
    if (!isBalanced) return false;

    const isSame = p.val === q.val;
    if (!isSame) return false;

    return true;
};

const isSame = (p, q) =>
    isSameNode(p, q) &&
    isSameNode(p.left, q.left) &&
    isSameNode(p.right, q.right);
