/**
 * Question Link: https://leetcode.com/problems/design-hashmap/
 */

 class Pair {
    let key: Int
    var val: Int

    init(_ key: Int, _ val: Int) {
        self.key = key
        self.val = val
    }
}

class MyHashMap {
    var size: Int
    var capacity: Int
    var map: [Pair?]

    init() {
        self.size = 0
        self.capacity = 10 * 10 * 10 * 10 * 10
        self.map = [Pair?](repeating: nil, count: capacity)
    }

    func hash(_ key: Int) -> Int {
        return key % capacity
    }

    func rehash() {
        capacity = 2 * capacity
        var newMap = [Pair?](repeating: nil, count: capacity)
        let oldMap = map
        map = newMap
        for pair in oldMap {
            if pair != nil {
                map.append(pair)
            }
        }
    }
    
    func put(_ key: Int, _ value: Int) {
        var index = hash(key)

        while true {
            if map[index] == nil {
                map[index] = Pair(key, value)
                size += 1
                if size >= capacity / 2 {
                    rehash()
                }
                return
            } else if map[index]?.key == key {
                map[index]?.val = value
                return
            }
            index += 1
            index = index % capacity
        }
    }
    
    func get(_ key: Int) -> Int {
        var index = hash(key)

        while map[index] != nil {
            if map[index]!.key == key {
                return map[index]!.val
            }
            index += 1
            index = index % capacity
        }

        return -1
    }
    
    func remove(_ key: Int) {
        if get(key) == -1 {
            return
        }

        var index = hash(key)
        while true {
            if map[index]?.key == key {
                map[index] = nil
                size -= 1
                return
            }
            index += 1
            index = index % capacity
        }
    }
}

/**
 * Your MyHashMap object will be instantiated and called as such:
 * let obj = MyHashMap()
 * obj.put(key, value)
 * let ret_2: Int = obj.get(key)
 * obj.remove(key)
 */