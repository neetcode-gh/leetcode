/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* swapNodes(ListNode* head, int k)
    {
        ListNode *ptr1 = head, *iter = head, *ptr2 = head;

        while(--k)
            ptr1 = ptr1->next;

        iter = ptr1->next;
        
        while(iter)
        {
            iter = iter->next;
            ptr2 = ptr2->next;
        }

        swap(ptr1->val, ptr2->val);

        return head;
    }
};