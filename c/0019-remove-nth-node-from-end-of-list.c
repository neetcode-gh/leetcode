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
        struct ListNode* tmp = slow->next;
        slow->next = tmp->next;
        free(tmp);
    }
    else {
        slow->val = slow->next->val;
        struct ListNode* tmp = slow->next;
        slow->next = tmp->next;
        free(tmp);
    }
    
    return head;
}