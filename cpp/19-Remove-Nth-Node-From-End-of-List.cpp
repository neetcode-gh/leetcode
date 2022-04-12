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
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        if(!head) return head;
        ListNode* f,*s,*prev;
        f=head;
        s=head;
        prev=nullptr;
        for(int i=0;i<n;i++)
             f=f->next;
        while(f)
        {
            prev=s;
            s=s->next;
            f=f->next;
        }
        if(prev)
            prev->next=s->next;
        else
            head=head->next;
        delete s;
        return head;
    }
};
