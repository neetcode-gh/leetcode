/*
  Given a binary tree

  struct Node {
    int val;
    Node *left;
    Node *right;
    Node *next;
  }
  
  Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.
  
  Initially, all next pointers are set to NULL.

  Ex. Input: root = [1,2,3,4,5,null,7]
      Output: [1,#,2,3,#,4,5,7,#]
      Explanation: Given the above binary tree (Figure A), your function should populate each next pointer to point to its next right node,
      just like in Figure B. The serialized output is in level order as connected by the next pointers, with '#' signifying the end of each level.

  Time  : O(N)
  Space : O(1)
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
        if(root == NULL)
            return NULL;
        Node* parent = root;

        while(parent) {
            Node* newNode = new Node;
            Node* temp = newNode;

            while(parent) {
                if(parent -> left) {
                    temp -> next = parent -> left;
                    temp = temp -> next;
                }
                if(parent -> right) {
                    temp -> next = parent -> right;
                    temp = temp -> next;
                }
                parent = parent -> next;
            }
            parent = newNode -> next;
        }
        return root;
    }
};
