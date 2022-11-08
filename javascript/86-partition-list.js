// problem link https://leetcode.com/problems/partition-list
// time complexity O(n)

var partition = function(head, x) {

 if(!head) return null;
    
 let lesserHead = new ListNode();
 let greaterHead = new ListNode();
 let lesserHeadRef = lesserHead;
 let greaterHeadRef = greaterHead;
    while(head) {
        if(head.val < x) {
            lesserHead.next = head;
            lesserHead = lesserHead.next;
        } else {
            greaterHead.next = head;
            greaterHead = greaterHead.next;
        }
        head = head.next;
    }
    greaterHead.next = null;
    lesserHead.next = greaterHeadRef.next;
    
    return lesserHeadRef.next;
    
};
