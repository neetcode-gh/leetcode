/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * Level Order Traversal | BFS
 * Time O(n) | Space O(n)
 * https://leetcode.com/problems/even-odd-tree
 * @param {TreeNode} root
 * @return {boolean}
 */
var isEvenOddTree = function(root) {

    // helper function
    const isStricklyIncreasingAndOdd = (arr) => {

        for (let i = 0; i < arr.length; i++) {
            const currElement = arr[i];
            const nextElement = (arr[i + 1] !== undefined && arr[i + 1]) || Infinity;
            if (currElement >= nextElement || currElement % 2 === 0) return false;
        }

        return true;
    }
    
    // helper function
    const isStricklyDecreasingAndEven = (arr) => {

        for (let i = 0; i < arr.length; i++) {
            const currElement = arr[i];
            const nextElement = (arr[i + 1] !== undefined && arr[i + 1]) || -Infinity;
            if (currElement <= nextElement || currElement % 2 === 1) return false;
        }

        return true;
    }

    const q = new Queue();
    q.enqueue([root, 0]);

    while (!q.isEmpty()) {
        const size = q.size();

        const levelArr = [];
        const level = q.front()[1];

        for (let i = 0; i < size; i++) {

            const element = q.dequeue();
            const node = element[0];
            levelArr.push(node.val);

            node.left && q.enqueue([node.left, level + 1]);
            node.right && q.enqueue([node.right, level + 1]);
        }

        if (level % 2 === 0 && !isStricklyIncreasingAndOdd(levelArr)) return false;
        if (level % 2 === 1 && !isStricklyDecreasingAndEven(levelArr)) return false;
    }

    return true;
};
