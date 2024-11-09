/**
 * Question Link: https://leetcode.com/problems/design-linked-list/
 */

class ListNode {
    var val: Int
    var next: ListNode?
    var prev: ListNode?

    init(_ val: Int) {
        self.val = val
    }
}

class MyLinkedList {
    var left: ListNode
    var right: ListNode

    init() {
        self.left = ListNode(-1)
        self.right = ListNode(-1)
        left.next = right
        right.prev = left
    }
    
    func get(_ index: Int) -> Int {
        var cur = left.next
        var index = index
        while cur != nil && index > 0 {
            cur = cur?.next
            index -= 1
        }

        if cur != nil && cur !== right && index == 0 {
            return cur!.val
        } else {
            return -1
        }
    }
    
    func addAtHead(_ val: Int) {
        let node = ListNode(val)
        let next = left.next
        let prev = left
        prev.next = node
        next?.prev = node
        node.next = next
        node.prev = prev
    }
    
    func addAtTail(_ val: Int) {
        let node = ListNode(val)
        let next = right
        let prev = right.prev
        prev?.next = node
        next.prev = node
        node.next = next
        node.prev = prev
    }
    
    func addAtIndex(_ index: Int, _ val: Int) {
        var cur = left.next
        var index = index
        while cur != nil && index > 0 {
            cur = cur?.next
            index -= 1
        }

        if cur != nil && index == 0 {
            let node = ListNode(val)
            let next = cur
            let prev = cur?.prev
            prev?.next = node
            next?.prev = node
            node.next = next
            node.prev = prev
        }
    }
    
    func deleteAtIndex(_ index: Int) {
        var cur = left.next
        var index = index
        while cur != nil && index > 0 {
            cur = cur?.next
            index -= 1
        }

        if cur != nil && cur !== right && index == 0 {
            let next = cur?.next
            let prev = cur?.prev
            prev?.next = next
            next?.prev = prev
        }
    }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * let obj = MyLinkedList()
 * let ret_1: Int = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index, val)
 * obj.deleteAtIndex(index)
 */