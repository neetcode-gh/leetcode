class ListNode {
    int val;
    ListNode prev;
    ListNode next;
    public ListNode(int val) {
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

class MyLinkedList {

    ListNode left;
    ListNode right;

    public MyLinkedList() {
        left = new ListNode(0);
        right = new ListNode(0);
        left.next = right;
        right.prev = left;
    }
    
    public int get(int index) {
        ListNode cur = left.next;
        while(cur != null && index > 0) {
            cur = cur.next;
            index -= 1;
        }
        if(cur != null && cur != right && index == 0) {
            return cur.val;
        }
        return -1;
    }
    
    public void addAtHead(int val) {
        ListNode node = new ListNode(val);
        ListNode next = left.next;
        ListNode prev = left;
        prev.next = node;
        next.prev = node;
        node.next = next;
        node.prev = prev;
    }
    
    public void addAtTail(int val) {
        ListNode node = new ListNode(val);
        ListNode next = right;
        ListNode prev = right.prev;
        prev.next = node;
        next.prev = node;
        node.next = next;
        node.prev = prev;
    }
    
    public void addAtIndex(int index, int val) {
        ListNode cur = left.next;
        while(cur != null && index > 0) {
            cur = cur.next;
            index -= 1;
        }
        if(cur != null && index == 0) {
            ListNode node = new ListNode(val);
            ListNode next = cur;
            ListNode prev = cur.prev;
            prev.next = node;
            next.prev = node;
            node.next = next;
            node.prev = prev;
        }
    }
    
    public void deleteAtIndex(int index) {
        ListNode cur = left.next;
        while(cur != null && index > 0) {
            cur = cur.next;
            index -= 1;
        }
        if(cur != null && cur != right && index == 0) {
            ListNode next = cur.next;
            ListNode prev = cur.prev;
            next.prev = prev;
            prev.next = next;
        }
    }
}
