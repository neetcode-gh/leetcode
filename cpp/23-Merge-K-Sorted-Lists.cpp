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

class compare{
    public:
        bool operator()(ListNode* a,ListNode* b){
            return a->val>b->val;
        }
};

class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        
        priority_queue<ListNode*,vector<ListNode*>,compare> pq;
        
        for(int i=0;i<lists.size();i++){
            if(lists[i]!=NULL){
                pq.push(lists[i]);
            }
        }
        
        if(pq.empty()){
            return NULL;
        }
        
        ListNode* dummy=new ListNode;
        ListNode* last=dummy;
        
        while(!pq.empty()){
            ListNode* curr=pq.top();
            pq.pop();
            
            last->next=curr;
            last=last->next;
            
            if(curr->next!=NULL){
                pq.push(curr->next);
            }
        }
        return dummy->next;
    }
};