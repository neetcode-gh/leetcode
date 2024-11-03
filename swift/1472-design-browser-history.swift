/**
 * Question Link: https://leetcode.com/problems/design-browser-history/
 */

 // Linked List Implementation

 class ListNode {
    var val: String
    var next: ListNode?
    var prev: ListNode?

    init(_ val: String) {
        self.val = val
    }
}

class BrowserHistory {
    var current: ListNode?

    init(_ homepage: String) {
        current = ListNode(homepage)
    }
    
    // O(1)
    func visit(_ url: String) {
        let node = ListNode(url)
        current?.next = node
        node.prev = current
        current = current?.next
    }
    
    // O(n)
    func back(_ steps: Int) -> String {
        var steps = steps
        while current?.prev != nil && steps > 0 {
            current = current?.prev
            steps -= 1
        }
        return current!.val
    }
    
    // O(n)
    func forward(_ steps: Int) -> String {
        var steps = steps
        while current?.next != nil && steps > 0 {
            current = current?.next
            steps -= 1
        }
        return current!.val
    }
}

// Array Implementation


class BrowserHistory {
    var array: [String]
    var count: Int
    var current: Int

    init(_ homepage: String) {
        array = [homepage]
        count = 1
        current = 0
    }
    
    // O(1)
    func visit(_ url: String) {
        if array.count < current + 2 {
            array.append(url)
        } else {
            array[current + 1] = url
        }
        current += 1
        count = current + 1
    }
    
    // O(1)
    func back(_ steps: Int) -> String {
        current = max(current - steps, 0)
        return array[current]
    }
    
    // O(1)
    func forward(_ steps: Int) -> String {
        current = min(current + steps, count - 1)
        return array[current]
    }
}