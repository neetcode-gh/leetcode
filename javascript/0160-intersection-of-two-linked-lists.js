var getIntersectionNode = function(headA, headB) {
    const lenA = getLength(headA);
    const lenB = getLength(headB);
    const diff = Math.abs(lenA - lenB);
    if(lenA > lenB) {
        let i = 0;
        while(i < diff) {
            i++;
            headA = headA.next;
        }
    } else {
        let i = 0;
        while(i < diff) {
            i++;
            headB = headB.next;   
        }
    }
    
    // checking the nodes
    while(headA && headB) {
        if(headA == headB) {
            return headA;
        } else {
            headA = headA.next;
            headB = headB.next;
        }
    }
    
    return null;
};


function getLength(node) {
    let count = 0;
    while(node) {
        count++;
        node = node.next;
    }
    return count;
}
