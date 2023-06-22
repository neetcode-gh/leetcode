class Solution {
   public:
    ListNode* swapNodes(ListNode* head, int k) {
        ListNode *fast{head}, *slow{head}, *kthFront = NULL;
        while (--k) {
            fast = fast->next;
        }

        kthFront = fast;

        while (fast->next) {
            fast = fast->next;
            slow = slow->next;
        }
        swap(slow->val, kthFront->val);
        return head;
    }
};
