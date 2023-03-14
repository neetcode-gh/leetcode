// Time: O(n)
// Space: O(1)
class Solution {
    func isPalindrome(_ x: Int) -> Bool {
        if x < 0 {
            return false
        }

        var div = 1
        while x >= 10 * div {
            div *= 10
        }
        
        var val = x
        while val > 0 {
            let right = val % 10
            let left = val / div

            if left != right {
                return false
            }

            val = (val % div) / 10
            div /= 100
        }
        return true
    }
}