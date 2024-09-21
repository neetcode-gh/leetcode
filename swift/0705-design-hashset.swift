/**
 * Question Link: https://leetcode.com/problems/design-hashset/
 */


class MyHashSet {
    var map: [Int?]
    var size: Int
    var capacity: Int

    init() {
        self.map = [Int?](repeating: nil, count: 10 * 10 * 10 * 10 * 10)
        self.size = 0
        self.capacity = 10 * 10 * 10 * 10 * 10
    }

    func hash(_ key: Int) -> Int {
        return key % capacity
    }

    func rehash() {
        capacity = 2 * capacity
        let oldMap = map
        var newMap = [Int?]()
        for i in 0..<capacity {
            newMap.append(nil)
        }
        map = newMap
        size = 0
        for i in 0..<oldMap.count {
            if oldMap[i] != nil {
                add(oldMap[i]!)
            }
        }
    }
    
    func add(_ key: Int) {
        var index = hash(key)
        while true {
            if map[index] == nil {
                map[index] = key
                size += 1
                if size >= capacity / 2 {
                    rehash()
                }
                return
            } else if map[index] == key {
                return
            }

            index += 1
            index = index % capacity
        }
    }
    
    func remove(_ key: Int) {
        if !contains(key) {
            return
        }

        var index = hash(key)
        while true {
            if map[index] == key {
                map[index] = nil
                size -= 1
                return
            }
            index += 1
            index = index % capacity
        }
    }
    
    func contains(_ key: Int) -> Bool {
        var index = hash(key)
        while map[index] != nil {
            if map[index] == key {
                return true
            }
            index += 1
            index = index % capacity
        }
        return false
    }
}

/**
 * Your MyHashSet object will be instantiated and called as such:
 * let obj = MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * let ret_3: Bool = obj.contains(key)
 */