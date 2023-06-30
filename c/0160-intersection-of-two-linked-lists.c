/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode *getIntersectionNode(struct ListNode *headA, struct ListNode *headB) {
        struct ListNode *currA = headA;
        struct ListNode *currB = headB;

        while (currA && currB){
            if (currA == currB){
                return currA;
            }
            currA = currA->next;
            currB = currB->next;

            if (!currA && currB){
                currA = headB;
            }
            if (!currB && currA){
                currB = headA;
            }
        }
    return NULL;
}
