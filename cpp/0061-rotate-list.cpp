/*
    Given the head of a linked list, rotate the list to the right by k places.
    Example: list = [1,2,3,4,5] and k = 2
    Output: [4,5,1,2,3]
    
    Time complexity: O(n)
    Space complexity: O(1)
*/

class Solution {
private:
    int findLen(ListNode* head){
        int len = 0;
        while(head!=NULL){
            len++;
            head = head->next;
        }
        return len;
    }
    ListNode* findNewHead(ListNode* head,int k){
        int i=0;
        while(i+1<k){
            i++;
            head = head->next;
        }
        ListNode* ret = head->next;
        head->next = NULL;
        return ret;
    }
    ListNode* findLast(ListNode* head){
        while(head->next!=NULL) head = head->next;
        return head;
    }
public:
    ListNode* rotateRight(ListNode* head, int k) {
        int len = findLen(head); // Finds the length of the Linked List
        if(len==0) return head;
        k = k%len;
        if(k==0) return head;
        ListNode* newHead = findNewHead(head,len-k); // Finds the node that is the new head
        ListNode* last = findLast(newHead); // Finds the last node from the new head and connects it to the previous head
        last->next = head;
        return newHead;
    }
};