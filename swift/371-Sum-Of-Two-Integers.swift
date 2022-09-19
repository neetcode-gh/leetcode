class Solution {
    func getSum(_ a: Int, _ b: Int) -> Int {
        var res = a
        var secondInt = b
        
        while secondInt != 0 {
            let temp = (res & secondInt) << 1
            res ^= secondInt
            secondInt = temp
        }
        return res
    }
}