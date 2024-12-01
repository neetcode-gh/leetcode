class Solution {
    func isUgly(_ n: Int) -> Bool {
        if n <= 0 {
            return false
        }

        var num = n
        for p in [2, 3, 5] {
            while num % p == 0 {
                num /= p
            }
        }
        return num == 1
    }
}