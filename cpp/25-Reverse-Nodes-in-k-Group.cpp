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
    ListNode* reverseKGroup(ListNode* head, int k) {
        
        if(head==NULL || head->next==NULL){
            return head;
        }
        
        ListNode* res=new ListNode(0);
        res->next=head;
        ListNode* start=res;
        stack<ListNode*> st;
        ListNode* prev=NULL;
        while(head!=NULL){
            ListNode* temp=head;
            while(st.size()<k && head!=NULL){
                st.push(head);
                head=head->next;
            }
            if(st.size()==k){
                while(!st.empty()){
                    prev=st.top();
                    prev->next=NULL;
                    st.pop();
                    start->next=prev;
                    start=start->next;
                }
            }
            else{
                start->next=temp;
                return res->next;
            }
        }
        prev->next=NULL;
        return res->next;
    }
};