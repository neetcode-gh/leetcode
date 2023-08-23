/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */

class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        ListNode *trevA = headA, *trevB = headB;

        while (trevA != trevB) {
            trevA = (trevA != NULL) ? trevA->next : headA;
            trevB = (trevB != NULL) ? trevB->next : headB;
        }
        return trevA;
    }
};
