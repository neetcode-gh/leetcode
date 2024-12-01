class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}

export {};

function minDiffInBST(root: TreeNode | null): number {
    let prev: TreeNode | null = null;
    let res = Number.MAX_VALUE;

    function dfs(node: TreeNode | null): void {
        if (node) {
            dfs(node.left);

            if (prev) {
                res = Math.min(res, node.val - prev.val);
            }
            prev = node;

            dfs(node.right);
        }
    }

    dfs(root);
    return res;
}
