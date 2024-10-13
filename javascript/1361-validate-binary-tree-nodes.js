/**
 * DFS
 * Time O(n) | Space O(n)
 * https://leetcode.com/problems/validate-binary-tree-nodes/
 * 
 * @param {number} n
 * @param {number[]} leftChild
 * @param {number[]} rightChild
 * @return {boolean}
 */
var validateBinaryTreeNodes = function(n, leftChild, rightChild) {
    
    const visited = new Set();

    const findRoot = () => {
      
      const childrenSet = new Set();
      for (let i = 0; i < n; i++) {
        childrenSet.add(i);
      }
      
      for (let i = 0; i < n; i++) {
        childrenSet.delete(leftChild[i]);
        childrenSet.delete(rightChild[i]);
      }

      return [...childrenSet][0];
    }

    const dfs = (i) => {

      if (i === -1) return true;
      if (visited.has(i)) return false;

      const left = leftChild[i];
      const right = rightChild[i];
      visited.add(i);
      return dfs(left) && dfs(right);
    }

    const root = findRoot();
    return dfs(root) && visited.size === n;
};
