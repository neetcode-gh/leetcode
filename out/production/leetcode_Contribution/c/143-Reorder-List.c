/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */

struct ListNode* reverse(struct ListNode* head) {
    struct ListNode* prev = NULL;
    struct ListNode* curr = head;
    struct ListNode* next = curr->next;
    
    while (curr != NULL) {
        next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    
    return prev;
}

void merge(struct ListNode* l1, struct ListNode* l2) {
    while (l1 != NULL) {
        struct ListNode* p1 = l1->next;
        struct ListNode* p2 = l2->next;
        
        l1->next = l2;
        if (p1 == NULL) {
            break;
        }
        l2->next = p1;
        
        l1 = p1;
        l2 = p2;
    }
}

void reorderList(struct ListNode* head){
    if (head->next == NULL) {
        return;
    }
    
    struct ListNode* prev = NULL;
    struct ListNode* slow = head;
    struct ListNode* fast = head;
    
    while (fast != NULL && fast->next != NULL) {
        prev = slow;
        slow = slow->next;
        fast = fast->next->next;
    }
    
    prev->next = NULL;
    
    struct ListNode* l1 = head;
    struct ListNode* l2 = reverse(slow);
    
    merge(l1, l2);
}