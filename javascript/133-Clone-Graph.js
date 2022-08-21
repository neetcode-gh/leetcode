/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function (node) {
    let visited = {};

    let dfs = (node) => {
        if (!node) {
            return node;
        }

        if (visited[node.val]) {
            return visited[node.val];
        }

        let copy = new Node(node.val);

        visited[node.val] = copy;

        node.neighbors.forEach((n) => {
            copy.neighbors.push(dfs(n));
        });

        return copy;
    };

    return dfs(node);
};
