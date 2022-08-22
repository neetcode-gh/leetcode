
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */


struct ListNode* reverseList(struct ListNode* head){
    
    if (head == NULL) {
        return NULL;
    } else if (head -> next == NULL) {
        return head;
    }
    
    struct ListNode* lastNode = reverseList(head -> next);
    head -> next -> next = head;
    head -> next = NULL;
    return lastNode;
    
}