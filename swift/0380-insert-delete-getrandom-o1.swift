class RandomizedSet {
    var random = Set<Int>()

    init() {
    
    }
    
    func insert(_ val: Int) -> Bool {
        if !random.contains(val){
            random.insert(val)
            return true
        } else {
            return false
        }
    }
    
    func remove(_ val: Int) -> Bool {
        if random.contains(val) {
            random.remove(val)
            return true
        } else {
            return false
        }
    }
    
    func getRandom() -> Int {
        return random.randomElement()!
    }
}

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * let obj = RandomizedSet()
 * let ret_1: Bool = obj.insert(val)
 * let ret_2: Bool = obj.remove(val)
 * let ret_3: Int = obj.getRandom()
 */
