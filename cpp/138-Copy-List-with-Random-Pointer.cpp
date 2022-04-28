/*
// Definition for a Node.
class Node {
public:
    int val;
    Node* next;
    Node* random;
    
    Node(int _val) {
        val = _val;
        next = NULL;
        random = NULL;
    }
};
*/

class Solution {
public:
    Node* copyRandomList(Node* head) {
        unordered_map<Node *, Node *> originToCopy = { {nullptr, nullptr} };

        Node *current = head;
        while (current) {
            originToCopy[current] = new Node(current->val);
            current = current->next;
        }

        current = head;
        while (current) {
            Node *copy = originToCopy[current];
            copy->next = originToCopy[current->next];
            copy->random = originToCopy[current->random];
            current = current->next;
        }

        return originToCopy[head];
    }
};

