/*
  Given a binary tree, find its minimum depth.

  The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

  Note: A leaf is a node with no children.

  Ex. Input: root = [3,9,20,null,null,15,7]
      Output: 2

  Time  : O(N)
  Space : O(N)
*/

/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int minDepth(TreeNode* root) {
        if(!root) 
            return 0;
        int count = 1;
        queue <TreeNode*> q;
        q.push(root);
        while(!q.empty()) {
            int size = q.size();
            for(int i = 0 ; i < size ; i++) {
                TreeNode* front = q.front();
                if(!front -> left && !front -> right)
                    return count;
                if(front -> left)
                    q.push(front -> left);
                if(front -> right)
                    q.push(front -> right);

                q.pop();
            }
            count++;
        }
        return count;
    }
};
