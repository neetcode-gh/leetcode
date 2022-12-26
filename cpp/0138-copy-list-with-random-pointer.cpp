/*
    Given linked list w/ also a random pointer, construct deep copy

    Hash map {old -> new}, O(n) space
    Optimize interweave old and new nodes, O(1) space
    A -> A' -> B -> B' -> C -> C', A'.random = A.random.next

    Time: O(n)
    Space: O(n) -> can optimize to O(1)
*/

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

// class Solution {
// public:
//     Node* copyRandomList(Node* head) {
//         if (head == NULL) {
//             return NULL;
//         }
//         Node* oldNode = head;
//         Node* newNode = new Node(oldNode->val);
//         visited[oldNode] = newNode;
//         while (oldNode != NULL) {
//             newNode->next = getClonedNode(oldNode->next);
//             newNode->random = getClonedNode(oldNode->random);
//             oldNode = oldNode->next;
//             newNode = newNode->next;
//         }
//         return visited[head];
//     }
// private:
//     unordered_map<Node*, Node*> visited;
//     Node* getClonedNode(Node* node) {
//         if (node == NULL) {
//             return NULL;
//         }
//         if (visited.find(node) != visited.end()) {
//             return visited[node];
//         }
//         visited[node] = new Node(node->val);
//         return visited[node];
//     }
// };

class Solution {
public:
    Node* copyRandomList(Node* head) {
        if (head == NULL) {
            return NULL;
        }
        
        Node* ptr = head;
        while (ptr != NULL) {
            Node* newNode = new Node(ptr->val);
            newNode->next = ptr->next;
            ptr->next = newNode;
            ptr = newNode->next;
        }
        ptr = head;
        
        while (ptr != NULL) {
            if (ptr->random == NULL) {
                ptr->next->random == NULL;
            } else {
                ptr->next->random = ptr->random->next;
            }
            ptr = ptr->next->next;
        }
        
        Node* oldPtr = head;
        Node* newPtr = head->next;
        Node* oldHead = head->next;
        
        while (oldPtr != NULL) {
            oldPtr->next = oldPtr->next->next;
            if (newPtr->next == NULL) {
                newPtr->next = NULL;
            } else {
                newPtr->next = newPtr->next->next;
            }
            oldPtr = oldPtr->next;
            newPtr = newPtr->next;
        }
        
        return oldHead;
    }
};
