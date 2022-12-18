// Time Complexity is O(N).
// Space Complexity is O(1).

class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
      ListNode * fast = head;
      ListNode * slow = head;
      
      while(slow != NULL)
      {
        while(fast != NULL && slow->val == fast->val)
          fast = fast -> next;
        
        slow->next = fast;
        slow = slow -> next;
      }
      
      return head;
        
    }
};
