/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */


struct ListNode* removeNthFromEnd(struct ListNode* head, int n){
    if (head->next == NULL) {
        return head->next;
    }
    
    struct ListNode* slow = head;
    struct ListNode* fast = head;
    
    while (n--) {
        fast = fast->next;
    }
    
    if (fast != NULL) {
        while (fast->next != NULL) {
            slow = slow->next;
            fast = fast->next;
        }
        slow->next = slow->next->next;
    }
    else {
        slow->val = slow->next->val;
        slow->next = slow->next->next;
    }
    
    return head;
}