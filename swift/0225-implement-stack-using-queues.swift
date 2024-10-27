/**
 * Question Link: https://leetcode.com/problems/implement-stack-using-queues/
 */

 class ListNode {
    var val: Int
    var next: ListNode?

    init(_ val: Int) {
        self.val = val
    }
}

class Queue {
    var head: ListNode?
    var tail: ListNode?
    var size = 0

    func enqueue(_ val: Int) {
        let node = ListNode(val)
        if head == nil {
            head = node
            tail = node
        } else {
            tail?.next = node
            tail = tail?.next
        }
        size += 1
    }

    func dequeue() -> Int {
        if head == nil {
            return -1
        }
        let val = head?.val
        head = head?.next
        if head == nil {
            tail = nil
        }
        size -= 1
        return val ?? -1
    }
}

class MyStack {
    var queue = Queue()

    init() {
        
    }
    
    func push(_ x: Int) {
        queue.enqueue(x)
    }
    
    func pop() -> Int {
        for _ in 0..<queue.size - 1 {
            let val = queue.dequeue()
            queue.enqueue(val)
        }
        return queue.dequeue()
    }
    
    func top() -> Int {
        queue.tail?.val ?? -1
    }
    
    func empty() -> Bool {
        queue.size == 0
    }
}

/**
 * Your MyStack object will be instantiated and called as such:
 * let obj = MyStack()
 * obj.push(x)
 * let ret_2: Int = obj.pop()
 * let ret_3: Int = obj.top()
 * let ret_4: Bool = obj.empty()
 */