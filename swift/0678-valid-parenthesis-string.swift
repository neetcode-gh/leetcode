class Solution {
    func checkValidString(_ s: String) -> Bool {
        var leftMin = 0
        var leftMax = 0

        for c in s {
            if c == "(" {
                leftMin += 1
                leftMax += 1
            } else if c == ")" {
                leftMin -= 1
                leftMax -= 1
            } else {
                leftMin -= 1
                leftMax += 1
            }

            if leftMax < 0 {
                return false
            }

            if leftMin < 0 {
                leftMin = 0
            }
        }

        return leftMin == 0
    }
}