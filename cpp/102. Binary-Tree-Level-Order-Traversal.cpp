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
    vector<vector<int>> levelOrder(TreeNode* root) {
      queue< TreeNode* > q;
        q.push(root);
        vector<vector<int>> v;
         vector<int> k;
         TreeNode* c;
        int j;
      while(!q.empty() )
      {
          k.clear();
          j=q.size();
          for(int i=0;i<j;i++)
          {
              c=q.front();
             q.pop();
              if(c)
              {
                  k.push_back(c->val);
                  q.push(c->left);
                  q.push(c->right);
              }
          }
          if(!k.empty())
          v.push_back(k);
          
      }
    return v;
        
    }
};
