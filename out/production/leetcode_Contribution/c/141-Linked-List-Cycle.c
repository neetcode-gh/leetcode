
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */

bool Traverse(struct ListNode* slow, struct ListNode* fast) {

    if (slow == NULL || slow -> next == NULL) {
        return false;
    }

    if (fast == NULL || fast -> next == NULL) {
        return false;
    }

    if (slow == fast) {
        return true;
    }
    return Traverse(slow -> next, fast -> next -> next);
}


bool hasCycle(struct ListNode *head) {
    
    if (head == NULL) {
        return false;
    }
    
    return Traverse(head, head -> next);

}