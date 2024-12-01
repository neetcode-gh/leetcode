/*
    Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.
    
    Time complexity: O(n)
    Space complexity: O(1)
*/
class Solution {
public:
    ListNode* reverseBetween(ListNode* head, int left, int right) {
        ListNode* dummy = new ListNode();
        dummy->next = head;

        int i=0;
        ListNode* leftConnector = dummy,*temp = head;
        while(i<left-1){
            leftConnector = temp;
            temp = temp->next;
            i++;
        }
        ListNode* prev = NULL;
        i=0;
        while(i<right-left+1){
            ListNode* store = temp->next;
            temp->next = prev;
            prev = temp;
            temp = store;
            i++;
        }
        leftConnector->next->next = temp;
        leftConnector->next = prev;

        return dummy->next;
    }
};