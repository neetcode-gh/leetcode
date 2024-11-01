/*
    Given root of binary tree, return max depth (# nodes along longest path from root to leaf)

    At every node, max depth is the max depth between its left & right children + 1

    Time: O(n)
    Space: O(n)
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
    int maxDepth(TreeNode* root) {
        // return maxDepthRecur(root);          // recursive DFS - preorder - easiest    
        // return maxDepthStkInorder(root);     // iterative DFS - inorder 
        return maxDepthStkPreorder(root);    // iterative DFS - preorder - easier
        // return maxDepthQueueLevelorder(root);   // iterative BFS - levelorder - easy
    }

    int maxDepthQueueLevelorder(TreeNode* root) {
        if (root == NULL) return 0;

        queue<TreeNode*> q;
        int ans = 0, depth = 0;
        q.push(root);

        while (!q.empty()) 
        {            
            int s = q.size();
            for(int i = 0; i < s; i++) 
            {
                root = q.front();
                q.pop();
                
                if (root->left) q.push(root->left);
                if (root->right) q.push(root->right);
            }
            depth += 1;
            ans = max(ans, depth);
        }
        return ans;
    }


    int maxDepthStkPreorder(TreeNode* root) {
        if (root == NULL) return 0;

        stack<pair<TreeNode*, int>> s;
        int ans = 1, depth = 1;
        s.push({root, depth});
        while (!s.empty()) 
        {
            root = s.top().first;
            depth = s.top().second;

            ans = max(ans, depth);
            s.pop();
            if (root->left) s.push({root->left, depth + 1});
            if (root->right) s.push({root->right, depth + 1});
        }
        return ans;
    }

    int maxDepthStkInorder(TreeNode* root) {
        stack<pair<TreeNode*, int>> s;
        int ans = 0, depth = 0;

        while (root || !s.empty())
        {
            while (root != NULL)
            {
                s.push(make_pair(root, ++depth));
                root = root->left;
            }

            root = s.top().first; 
            ans = max(ans, depth);
            
            depth = s.top().second;
            s.pop();
            
            root = root->right;
        }
        return ans;
    }

    int maxDepthRecur(TreeNode* root) {
        // recursive DFS
        if (root == NULL) return 0;

        // we should inc. the depth by 1 here
        // and check for max in left and right subtrees 

        return 1 + max(maxDepthRecur(root->left), maxDepthRecur(root->right));
    }
}
