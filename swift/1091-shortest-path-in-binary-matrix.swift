/**
 * Question Link: https://leetcode.com/problems/shortest-path-in-binary-matrix/
 */

 class ListNode {
    let val: [Int]
    var next: ListNode?

    init(_ val: [Int]) {
        self.val = val
    }
}

class Dequeue {
    var head: ListNode?
    var tail: ListNode?
    var size = 0

    func enqueue(_ val: [Int]) {
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

    func deque() -> [Int]? {
        if head == nil {
            return nil
        }

        let node = head
        head = head?.next
        if head == nil {
            tail = nil
        }

        size -= 1
        return node!.val
    }
}

class Solution {
    func shortestPathBinaryMatrix(_ grid: [[Int]]) -> Int {
        let rows = grid.count
        let cols = grid[0].count
        var visit = Set<[Int]>()
        var deque = Dequeue()
        visit.insert([0, 0])
        deque.enqueue([0, 0, 1])

        while deque.size > 0 {
            let val = deque.deque()!
            let r = val[0]
            let c = val[1]
            let len = val[2]

            if r < 0 || c < 0 || r == rows || c == cols || grid[r][c] == 1 {
                continue
            }
            
            if r == rows - 1 && c == cols - 1 {
                return len
            }

            let directions = [(0, 1), (0, -1), (1, 0), (-1, 0), (-1, -1), (1, 1), (-1, 1), (1, -1)]
            for (dr, dc) in directions {
                if !visit.contains([r + dr, c + dc]) {
                    deque.enqueue([r + dr, c + dc, len + 1])
                    visit.insert([r + dr, c + dc])
                }
            }
        }

        return -1
    }
}