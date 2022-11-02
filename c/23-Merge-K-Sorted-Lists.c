/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */

/**
 * Time: O(n.log(k))
 * Space: O(1)
 */

typedef struct ListNode ListNode;

ListNode* mergeLists(ListNode* l1, ListNode* l2)
{
    ListNode dummy;
    dummy.next = NULL;
    ListNode* tail = &dummy;
    
    while(l1 && l2)
    {
        if(l1->val < l2->val)
        {
            tail->next = l1;
            l1 = l1->next;
        }
        else
        {
            tail->next = l2;
            l2 = l2->next;
        }

        tail = tail->next;
    }

    if(l1)
    {
        tail->next = l1;
    }
    else if(l2)
    {
        tail->next = l2;
    }
    
    return dummy.next;
}

struct ListNode* mergeKLists(struct ListNode** lists, int listsSize){

    if(listsSize == 0)
    {
        return NULL;
    }

    while(listsSize > 1)
    {
        ListNode** mergedLists;
        size_t mergedListsIndex = 0;

        for(size_t i = 0; i < listsSize; i += 2)
        {
            ListNode* l1 = lists[i];
            ListNode* l2 = (i + 1) < listsSize ? lists[i + 1] : NULL;

            mergedLists[mergedListsIndex++] = mergeLists(l1, l2);
        }

        lists = mergedLists;
        listsSize = (listsSize + 1) / 2;
    }

    return lists[0];
}
