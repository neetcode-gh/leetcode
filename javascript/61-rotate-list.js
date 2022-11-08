// problem link https://leetcode.com/problems/rotate-list/
// time complexity O(n)

var rotateRight = function(head, k) {
    
    if(!head) return null;
    // if(k === 0) return head;
    
    const listLen = getLength(head);
    let diff;
    const remainder = k % listLen;
    //listLen % k;
    if(remainder == 0) {
        return head;
    } else {
        diff = listLen - remainder;
    } 

    let count = 1;
    let current = head;
    let firstNodeRef = head;
    while(count < diff) {
        current = current.next;
        count++;
    }
    
    const temp = current.next;
    current.next = null;
    head = temp;
    current = temp;
    
    while(current && current.next) {
        current = current.next;
    }
    if(current) {
    current.next = firstNodeRef;        
    }
    
    return head;
    
};

function getLength(node) {
    let count = 0;
    while(node) {
        node = node.next;
        count++;
    }
    
    return count;
}
