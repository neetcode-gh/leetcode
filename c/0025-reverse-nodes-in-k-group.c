/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */

typedef struct ListNode ListNode;

ListNode* getKth(ListNode* curr, int k)
{
    while(curr && k > 0)
    {
        curr = curr->next;
        k--;
    }

    return curr;
}

struct ListNode* reverseKGroup(struct ListNode* head, int k){
    ListNode dummy = { 0, head };
    ListNode* prevGroupTail = &dummy;

    while(true)
    {
        ListNode* kth = getKth(prevGroupTail, k);

        if(!kth)
        {
            break;
        }

        ListNode* nextGroupHead = kth->next;


        // Reverse group
        ListNode* prev = nextGroupHead;
        ListNode* curr = prevGroupTail->next;
        while(curr != nextGroupHead)
        {
            ListNode* temp = curr->next;
            curr->next = prev;
            // Increment the pointers
            prev = curr;
            curr = temp;
        }


        ListNode* lastNodeInCurrentGroup = prevGroupTail->next;
        // Connect the previous group to the current group
        prevGroupTail->next = kth;  // kth is now the first node in the group
        // Update prevGroupTail for the next iteration of the loop
        prevGroupTail = lastNodeInCurrentGroup;

    }

    return dummy.next;
}
