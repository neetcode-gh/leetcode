/**
 * Question Link: https://leetcode.com/problems/rotting-oranges/
 */

 class ListNode {
    let val: [Int]
    var next: ListNode?

    init(_ val: [Int]) {
        self.val = val
    }
}

class Deque {
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

    func dequeue() -> [Int]? {
        if head == nil {
            return nil
        }
        let node = head
        head = head?.next
        if head == nil {
            tail = nil
        }
        size -= 1
        return node?.val
    }
}

class Solution {
    func orangesRotting(_ grid: [[Int]]) -> Int {
        let rows = grid.count
        let cols = grid[0].count
        var deque = Deque()
        var visit = Set<[Int]>()
        var fresh = 0
        var minutes = 0

        for r in 0..<rows {
            for c in 0..<cols {
                if grid[r][c] == 1 {
                    fresh += 1
                }
                if grid[r][c] == 2 {
                    deque.enqueue([r, c])
                }
            }
        }

        while deque.size > 0 && fresh > 0 {
            for i in 0..<deque.size {
                let val = deque.dequeue()!
                let r = val[0]
                let c = val[1]

                let directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]
                for (dr, dc) in directions {
                    if r + dr < 0 || c + dc < 0 || r + dr == rows || c + dc == cols || grid[r + dr][c + dc] != 1 || visit.contains([r + dr, c + dc]) {
                        continue
                    }
                    deque.enqueue([r + dr, c + dc])
                    visit.insert([r + dr, c + dc])
                    fresh -= 1
                }
            }
            minutes += 1
        }

        return fresh == 0 ? minutes : -1
    }
}