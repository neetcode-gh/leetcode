class Solution {
    func reverseBits(_ n: Int) -> Int {
        var res = 0
        
        for i in 0...31 {
            let bit = (n >> i) & 1
            res = res | (bit << (31 - i))
        }
        return res
    }
}