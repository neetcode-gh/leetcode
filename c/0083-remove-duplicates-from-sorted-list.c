/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */

// Time: O(n)
// Space: O(1)
struct ListNode* deleteDuplicates(struct ListNode* head){
    struct ListNode* cur = head;
    while (cur) {
        while (cur->next && cur->next->val == cur->val) {
            cur->next = cur->next->next;
        }
        cur = cur->next;
    }
    return head;
}