var deleteDuplicates = function(head) {
    if(!head) return null;
    const firstPoint = head;
    
    while(head && head.next) {
        if(head.val === head.next.val) {
        let dummy = head.next; 
        head.next = dummy.next;   
        dummy = null;                
        }  else {
        head = head.next;
        }
    }
    
    return firstPoint;
};
