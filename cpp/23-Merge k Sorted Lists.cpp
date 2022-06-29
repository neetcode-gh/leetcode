class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        
      // return null pointer for empty input
      if (lists.size()==0 || (lists.size()==1 && lists[0] == nullptr))
          return nullptr;
            
      return mergeLists(lists, 0, lists.size()-1);
    }
    
    ListNode* mergeLists(vector<ListNode*>& lists, int lo, int hi){
        
        if (lo >= hi)
            return lists[lo];
        
        int mid = lo + (hi-lo)/2;
        
        auto list1 = mergeLists(lists, lo, mid);
        auto list2 = mergeLists(lists, mid+1, hi);
        
        // merge two lists...
        return mergeTwoLists(list1, list2);
    }
    
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2){
        
        ListNode head;  // dummy node
        auto ptr1 = list1;
        auto ptr2 = list2;
        auto outptr = &head;
        
        while (ptr1 && ptr2){
            
            if (ptr1->val <= ptr2->val){
                outptr->next = ptr1;
                ptr1 = ptr1->next;
            }
            else{
                outptr->next = ptr2;
                ptr2 = ptr2->next;
            }
            
            outptr = outptr->next;
        }
        
        if (ptr1)
            outptr->next = ptr1;
        
        if (ptr2)
            outptr->next = ptr2;
            
        return head.next;  // remvoe dummy node    
    }
    
};
