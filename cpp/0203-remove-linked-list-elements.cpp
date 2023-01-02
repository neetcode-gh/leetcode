class Solution {
public:
    ListNode* removeElements(ListNode* head, int val) {
        ListNode *dummy = new ListNode(0, head);
        ListNode *prev = dummy, *curr = head;
        
        while(curr) {
            ListNode *nxt = curr->next;
            
            if(curr->val == val)
                prev->next = nxt;
            else
                prev = curr;
            
            curr = nxt;
        }
        return dummy->next;
    }
};
