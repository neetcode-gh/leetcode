class MyHashSet {
    final int mod = 10000;
    ListNode[] set;

    class ListNode {
        int val;
        ListNode next;
        private ListNode(int val) {
            this.val = val;
            this.next = null;
        }
    }

    public MyHashSet() {
        this.set = new ListNode[mod];
        for (int i = 0; i < set.length; i++) {
            set[i] = new ListNode(0);
        }
    }
    
    public void add(int key) {
        ListNode head = set[key % mod];
        while (head.next != null) {
            if (head.next.val == key) return;
            head = head.next;
        }
        head.next = new ListNode(key);
    }
    
    public void remove(int key) {
        ListNode head = set[key % mod];
        while (head.next != null) {
            if (head.next.val == key) {
                head.next = head.next.next;
                return;
            }
            head = head.next;
        }
    }
    
    public boolean contains(int key) {
        ListNode head = set[key % mod];
        while (head.next != null) {
            if (head.next.val == key) return true;
            head = head.next;
        }
        return false;
    }
}

/**
 * Your MyHashSet object will be instantiated and called as such:
 * MyHashSet obj = new MyHashSet();
 * obj.add(key);
 * obj.remove(key);
 * boolean param_3 = obj.contains(key);
 */