struct ListNode* insertionSortList(struct ListNode* head) {

    if (!head || !head->next) {
        return head;
    }

    struct ListNode* dummy = malloc(sizeof(struct ListNode));
    dummy->next = head;

    struct ListNode* prev = head;
    struct ListNode* cur = head->next;

    while (cur) {
        // already in-order
        if (prev->val <= cur->val) {
            prev = cur;
            cur = cur->next;
        } else {
            struct ListNode* temp = dummy;
            
            while(cur->val > temp->next->val) 
                temp = temp->next;

            // find the stop
            prev->next = cur->next;
            cur->next = temp->next;
            temp->next = cur;

            cur = prev->next;
        }
    }
    return dummy->next;
}

