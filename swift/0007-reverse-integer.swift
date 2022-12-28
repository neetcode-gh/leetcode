class Solution {
    func reverse(_ x: Int) -> Int {
        let MIN = Int32.min
        let MAX = Int32.max
        
        var res = 0
        var value = x
        while value != 0 {
            let digit = value % 10
            value /= 10
            
            if res > MAX / 10 || (res == MAX / 10 && digit >= MAX % 10) {
                return 0
            }
            if res < MIN / 10 || (res == MIN / 10 && digit <= MIN % 10) {
                return 0
            }
            res = (res * 10) + digit 
        }
        return res
    }
}