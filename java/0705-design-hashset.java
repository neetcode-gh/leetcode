class ListNode{
    int key;
    ListNode next;
    ListNode(int key){
        this.key = key;
        next = null;
    }
}

class MyHashSet {
    ListNode[] set;
    public MyHashSet() {
        int n = (int)Math.pow(10, 4);
        set = new ListNode[n];

        for (int i = 0; i < n; i++) {
            set[i] = new ListNode(0);
        }
    }

    public void add(int key) {
        ListNode cur = set[key % set.length];
        while(cur.next != null){
            if(cur.next.key == key){
                return;
            }
            cur = cur.next;
        }
        cur.next = new ListNode(key);
    }

    public void remove(int key) {
        ListNode cur = set[key % set.length];
        while(cur.next != null){
            if(cur.next.key == key){
                cur.next = cur.next.next;
                return;
            }
            cur = cur.next;
        }
    }

    public boolean contains(int key) {
        ListNode cur = set[key % set.length];
        while(cur.next != null){
            if(cur.next.key == key){
                return true;
            }
            cur = cur.next;
        }
        return false;
    }
}
