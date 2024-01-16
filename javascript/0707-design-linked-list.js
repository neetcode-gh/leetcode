class Node {
    constructor(val) {
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

class MyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    get(index) {
        let curr = this.head;
        while (curr && index > 0) {
            curr = curr.next;
            index--;
        }
        return curr ? curr.val : -1;
    }

    addAtHead(val) {
        if (this.head === null) {
            this.head = new Node(val);
            this.tail = this.head;
        } else {
            this.head.prev = new Node(val);
            this.head.prev.next = this.head;
            this.head = this.head.prev;
        }
    }

    addAtTail(val) {
        if (this.head === null) {
            this.head = new Node(val);
            this.tail = this.head;
        } else {
            this.tail.next = new Node(val);
            this.tail.next.prev = this.tail;
            this.tail = this.tail.next;
        }
    }

    addAtIndex(index, val) {
        if (index === 0) this.addAtHead(val);
        else {
            let curr = this.head;
            while (curr && index > 0) {
                curr = curr.next;
                index--;
            }
            if (index === 0) {
                if (!curr) this.addAtTail(val);
                else {
                    const prev = curr.prev;
                    prev.next = new Node(val);
                    prev.next.prev = prev;
                    prev.next.next = curr;
                    curr.prev = prev.next;
                }
            }
        }
    }

    deleteAtIndex(index) {
        if (!this.head) return;
        if (index === 0) {
            this.head = this.head.next;
            if (this.head) this.head.prev = null;
        } else {
            let curr = this.head;
            while (curr && index > 0) {
                curr = curr.next;
                index--;
            }
            if (curr && index === 0) {
                if (!curr.next) {
                    curr.prev.next = null;
                    this.tail = curr.prev;
                } else {
                    curr.prev.next = curr.next;
                    curr.next.prev = curr.prev;
                }
            }
        }
    }
}
