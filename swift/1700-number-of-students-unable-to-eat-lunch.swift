/**
 * Question Link: https://leetcode.com/problems/number-of-students-unable-to-eat-lunch/
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

    var count: Int = 0

    func enqueue(_ val: Int) {
        let node = ListNode(val)
        if tail != nil {
            tail?.next = node
            tail = tail?.next
        } else {
            head = node
            tail = node
        }
        count += 1
    }

    func dequeue() -> Int? {
        var val: Int?
        if head == nil {
            return nil
        } else {
            val = head?.val
            head = head?.next
        }

        if head == nil {
            tail = nil
        }

        count -= 1
    
        return val
    }
}

class Solution {
    func countStudents(_ students: [Int], _ sandwiches: [Int]) -> Int {
        var queue = Queue()
        for i in 0..<students.count {
            queue.enqueue(students[i])
        }

        var stack: [Int] = sandwiches.reversed()

        var changesCount = 0
        while queue.count > 0 && changesCount != queue.count {
            if queue.head?.val == stack.last {
                stack.removeLast()
                queue.dequeue()
                changesCount = 0
            } else {
                if let val = queue.dequeue() {
                    queue.enqueue(val)
                }
                changesCount += 1
            }
        }

        return queue.count
    }
}