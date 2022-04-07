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
    bool hasCycle(ListNode *head) {
        if(!head) return 0;
       unordered_set<ListNode*> s;
        s.insert(head);
         ListNode * ptr=head->next;
        while(ptr)
        {
            if(s.find(ptr)==s.end())
        {
            s.insert(ptr);
                ptr=ptr->next;
        }
            else
                return 1;
        }
        return 0;
        
    }
};
