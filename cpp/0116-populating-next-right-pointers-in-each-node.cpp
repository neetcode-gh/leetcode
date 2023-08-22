/*
  You are given a perfect binary tree where all leaves are on the same level, and every parent has two children. The binary tree has the following definition:
  
  struct Node {
    int val;
    Node *left;
    Node *right;
    Node *next;
  }
  
  Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.
  Initially, all next pointers are set to NULL.

  Ex. Input: root = [1,2,3,4,5,6,7]
      Output: [1,#,2,3,#,4,5,6,7,#]
      Explanation: Given the above perfect binary tree (Figure A), your function should populate each next pointer to point to its next right node,
      just like in Figure B. The serialized output is in level order as connected by the next pointers, with '#' signifying the end of each level.

  Time  : O(N)
  Space : O(N)
*/

/*
// Definition for a Node.
class Node {
public:
    int val;
    Node* left;
    Node* right;
    Node* next;

    Node() : val(0), left(NULL), right(NULL), next(NULL) {}

    Node(int _val) : val(_val), left(NULL), right(NULL), next(NULL) {}

    Node(int _val, Node* _left, Node* _right, Node* _next)
        : val(_val), left(_left), right(_right), next(_next) {}
};
*/

class Solution {
public:
    Node* connect(Node* root) {
        if(root == NULL || (root -> right == NULL && root -> left == NULL))
            return root;
        queue <Node*>q;
        q.push(root);

        while(!q.empty()) {
            int size = q.size();
            Node* temp = NULL;

            for(int i = 0 ; i < size ; i++) {
                Node* front = q.front();

                if(temp != NULL)
                    temp -> next = front;
                temp = front;

                if(front -> left) {
                    q.push(front -> left);
                    q.push(front -> right);
                }
                q.pop();
            }
        }
        return root;
    }
};
