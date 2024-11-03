/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

/*
 * Encodes a tree to a single string.
 */
function serialize(root: TreeNode | null): string {
    const box = [];

    function cereal(root: TreeNode | null) {
        if (root === null) return box.push(null);
        box.push(root.val);
        cereal(root.left);
        cereal(root.right);
    }
    cereal(root);

    return box.join(',');
};

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
    const box: string[] = data.split(',');

    function decereal(): TreeNode | null {
        const val = box.shift();
        if (val === '') return null;
        const node = new TreeNode(Number(val));
        node.left = decereal();
        node.right = decereal();
        return node;
    }

    return decereal();
};


/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */