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

// Need a long long int alias because of the constraints of TreeNode.val
#define ll long long int

class Solution {
public:
    bool isValidBST(TreeNode* root) {
        return dfs(root, (ll) INT_MIN - 1, (ll) INT_MAX + 1);
    }
    
private:
    /**
    * Need long long int versions of standard max and min functions
    */
    ll max(ll a, ll b) {
        return (a > b) ? a : b;
    }
    
    ll min(ll a, ll b) {
        return (a < b) ? a : b;
    }
    
    /**
    * DFS through the tree.
    * 
    * Algorithm:
    * 
    * 1. Return true if root is NULL, since it's a balanced binary search tree.
    * 2. Checking if root->val is strictly between low and high.
    * 3. Updating high value if going to left sub-tree.
    * 4. Updating low value if going through right sub-tree.
    *
    * Time Complexity: O(n) [ Visiting every node exactly once ]
    * Space Complexity: O(n) [ Since in worst case, tree is a linked list, so n function calls in call-stack ]
    */
    bool dfs(TreeNode* root, ll low, ll high) {
                
        if(root == NULL) {
            return true;
        }
        
        if(root->val > low && root->val < high) {
            return dfs(root->left, low, min(high, (ll) root->val))
                && dfs(root->right, max(low, (ll) root->val), high);
        } else {
            return false;
        }
        
    }
};
