
class TimeMap {
    var store = [String: [(String, Int)]]()
    init() {
        
    }
    
    func set(_ key: String, _ value: String, _ timestamp: Int) {
        store[key, default: []].append((value, timestamp))
    }
    
    func get(_ key: String, _ timestamp: Int) -> String {
        var res = ""
        var values = store[key] ?? []

        var l = 0
        var r = values.count - 1
        while l <= r {
            let m = l + ((r - l) / 2)
            if values[m].1 <= timestamp { 
                res = values[m].0
                l = m + 1
            } else {
                r = m - 1
            }
        }

        return res
    }
}

/**
 * Your TimeMap object will be instantiated and called as such:
 * let obj = TimeMap()
 * obj.set(key, value, timestamp)
 * let ret_2: String = obj.get(key, timestamp)
 */