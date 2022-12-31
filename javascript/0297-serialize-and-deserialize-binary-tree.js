/**
 * Encodes a tree to a single string.
 * https://leetcode.com/problems/serialize-and-deserialize-binary-tree/solution/
 * Time O(N) | Space O(H)
 * @param {TreeNode} root
 * @return {string}
 */
 var serialize = function(root, result = []) {
    serial(root, result);

    return result;
};

const serial = (root, result) => {
    const isBase = root === null;
    if (isBase) return result.push(null);

    dfsSerialize(root, result);
}

const dfsSerialize = (node, result) => {
    result.push(node.val);
    serial(node.left, result);
    serial(node.right, result);
};

/**
 * Encodes a tree to a single string.
 * https://leetcode.com/problems/serialize-and-deserialize-binary-tree/solution/
 * Time O(N) | Space O(H)
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    const isBaseCase = root === null;
    if (isBaseCase) return [ null ];

    return dfsSerializeIterative([ root ]);
};

const dfsSerializeIterative = (stack, result = []) => {
    while (stack.length) {
        const curr = stack.pop();

        const isNull = curr === null;
        if (isNull) {
            result.push(null);
            continue;
        }

        result.push(curr.val);
        stack.push(curr.right);
        stack.push(curr.left);
    }

    return result;
}

/**
* Decodes your encoded data to tree.
* https://leetcode.com/problems/serialize-and-deserialize-binary-tree/solution/
* Time O(N) | Space O(H)
* @param {string} data
* @return {TreeNode}
*/
var deserialize = function(data) {
    const isBaseCase = !data.length;
    if (isBaseCase) return null;

    const val = data.shift();

    const isNull = val === null;
    if (isNull) return null;

    return dfsDeserialize(val, data)
};

const dfsDeserialize = (val, data) => {
    const node = new TreeNode(val);

    node.left = deserialize(data);
    node.right = deserialize(data);

    return node;
}
