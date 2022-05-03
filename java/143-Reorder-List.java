class Solution {
    public void reorderList(ListNode head) {
        
        if(head == null || head.next == null) return;
        
        ListNode prev = null;
        ListNode slow = head;
        ListNode fast = head;
        
        while(fast != null && fast.next != null){
            prev = slow;
            slow = slow.next;
            fast = fast.next.next;
        }
        prev.next = null;
        
        ListNode list1 = head;
        ListNode list2 = reverse(slow);
        
        merge(list1, list2);
    }
    
    private ListNode reverse(ListNode head){
        
        ListNode current = head;
        ListNode prev = null;
        
        while(current != null){
            ListNode next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        
        return prev;
    }
    
    private void merge(ListNode list1, ListNode list2){
        while(list1 != null){
            ListNode next1 = list1.next;
            ListNode next2 = list2.next;
            
            list1.next = list2;
            
            if(next1 == null) break;
            list2.next = next1;
            
            list1 = next1;
            list2 = next2;
        }
    }
}
