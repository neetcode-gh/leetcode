/**
 * Question Link: https://leetcode.com/problems/lru-cache/
 */

 class ListNode {
    var prev: ListNode?
    var next: ListNode?
    var key: Int
    var val: Int

    init(key: Int, val: Int) {
        self.key = key
        self.val = val
    }
}

class LRUCache {
    let capacity: Int
    var hashmap: [Int: ListNode]
    var lru: ListNode
    var mru: ListNode

    init(_ capacity: Int) {
        self.capacity = capacity
        self.hashmap = [:]
        self.lru = ListNode(key: 0, val: 0)
        self.mru = ListNode(key: 0, val: 0)
        self.lru.next = self.mru
        self.mru.prev = self.lru
    }
    
    func get(_ key: Int) -> Int {
        if let node = hashmap[key] {
            remove(node: node)
            insert(node: node)
            return node.val
        } else {
            return -1
        }
    }
    
    func put(_ key: Int, _ value: Int) {
        if let node = hashmap[key] {
            remove(node: node)
        }
        hashmap[key] = ListNode(key: key, val: value)
        insert(node: hashmap[key]!)

        if hashmap.values.count > capacity {
            let lru = self.lru.next
            remove(node: lru!)
            hashmap.removeValue(forKey: lru!.key)
        }
    }

    func insert(node: ListNode) {
        let prev = mru.prev!
        let next = mru
        prev.next = node
        next.prev = node
        node.next = next
        node.prev = prev
    }

    func remove(node: ListNode) {
        let prev = node.prev!
        let next = node.next!
        prev.next = next
        next.prev = prev
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * let obj = LRUCache(capacity)
 * let ret_1: Int = obj.get(key)
 * obj.put(key, value)
 */