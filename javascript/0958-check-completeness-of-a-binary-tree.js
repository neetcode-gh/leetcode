/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * Time O(n) | Space O(n)
 * LevelOrder traversal | BFS
 * https://leetcode.com/problems/check-completeness-of-a-binary-tree/
 * @param {TreeNode} root
 * @return {boolean}
 */
var isCompleteTree = function(root) {
    
    // get the depth of the tree
    // bfs until n-1 level of depth

    const getDepth = (node) => {
        if (!node) return 0;
        return 1 + Math.max(getDepth(node.left), getDepth(node.right));
    }
    
    const depth = getDepth(root) - 1;

    const q = new Queue();
    q.enqueue(root);

    const checkLastLevel = (arr) => {
        while (arr[arr.length - 1] === null) arr.pop();

        let i = 0;
        while (i < arr.length) {
            if (arr[i] === null) return false;
            i++;
        }

        return true;
    }

    let i = 0;
    while (i < depth) {

        let size = q.size();

        if (size !== 2**i) return false;

        while (size) {
            const node = q.dequeue();
            if (!node.left && i !== depth - 1) return false;
            if (!node.right && i !== depth - 1) return false;

            if (i !== depth - 1) {
                q.enqueue(node.left);
                q.enqueue(node.right);
            } else {

                if (!node.left) {
                    q.enqueue(null);
                } else {
                    q.enqueue(node.left);
                }

                if (!node.right) {
                    q.enqueue(null);
                } else {
                    q.enqueue(node.right);
                }

            }
            
            size--;
        }

        i++;
    }
    
    return checkLastLevel(q.toArray());
};
