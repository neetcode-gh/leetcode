/*
  Given the root of a binary tree, return the average value of the nodes on each level in the form of an array. 
  Answers within 10-5 of the actual answer will be accepted. 

  Ex. Input: root = [3,9,20,null,null,15,7]
      Output: [3.00000,14.50000,11.00000]
      Explanation: The average value of nodes on level 0 is 3, on level 1 is 14.5, and on level 2 is 11.
      Hence return [3, 14.5, 11].

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
    vector<double> averageOfLevels(TreeNode* root) {
        vector <double> v;
        if(root == NULL) 
            return v;
        queue <TreeNode *> q;
        q.push(root);

        while(!q.empty()) {
            double sum = 0, count = 0;
            int siz = q.size();
            for(int i = 0 ; i < siz ; i++) {
                sum += q.front() -> val;
                if(q.front() -> left)
                    q.push(q.front() -> left);
                if(q.front() -> right) 
                    q.push(q.front() -> right);
                ++count;
                q.pop();
            }
            v.push_back(sum / count);
        }
        return v;
    }
};
