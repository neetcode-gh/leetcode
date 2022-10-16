var isPalindrome = function(head) {
    const listLen = getLength(head);
    
        let listBPointer = head;  
    
        const middle = Math.floor(listLen / 2);
        let count = 0;
        while(count < middle) {
            count++;
            listBPointer = listBPointer.next;
        }
    
    // reverse the listBPointer
    listBPointer = reverseLink(listBPointer);
    while(listBPointer && head) {
        if(listBPointer.val !== head.val) {
            return false;
        }
        listBPointer = listBPointer.next;
        head = head.next;
    }
    
    return true;
};


function reverseLink(node) {
    let pre = null;
    while(node) {
    const temp = node.next;
    node.next = pre;
    pre = node;
    node = temp;
    }
    return pre;
}

function getLength(node) {
    i = 0;
    while(node) {
        i++;
        node = node.next;
    }
    
    return i;
}
