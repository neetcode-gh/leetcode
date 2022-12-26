let inDepth = (node, stack) => {
    if (node === null) return;

    inDepth(node.left, stack);

    stack.push(node.val);

    inDepth(node.right, stack);
};

function kthSmallest(root: TreeNode | null, k: number): number {
    let stack = [];

    inDepth(root, stack);

    return stack[k - 1];
}
