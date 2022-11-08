// problem link https://leetcode.com/problems/swap-nodes-in-pairs/
//  time complexity O(n).

var swapPairs = function(head) {
    
    if(!head) return null;
    const dummy = new ListNode(null, head);
    let pre = dummy;
    let current = head;
   
    while(current && current.next) {
        const temp = current.next.next;
        const temp1 = current.next;
        
        temp1.next = current;
        current.next = temp;
        pre.next = temp1; // why do that find out
        
        pre = current;
        current = temp;
    }
    
    return dummy.next;
};
