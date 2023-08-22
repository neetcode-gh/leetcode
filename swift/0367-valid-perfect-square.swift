// Time: O(log n)
// Space: O(1)
class Solution {
    func isPerfectSquare(_ num: Int) -> Bool {
        var left = 1, right = num
        while left <= right {
            let mid = (left + right) / 2
            if mid * mid > num {
                right = mid - 1
            }
            else if mid * mid < num {
                left = mid + 1
            }
            else {
                return true
            }
        }
        return false
    }
}