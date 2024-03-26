/**
 * Question Link: https://leetcode.com/problems/longest-turbulent-subarray/
 */

 class Solution {
    func maxTurbulenceSize(_ arr: [Int]) -> Int {
        var l = 0
        var r = 1
        var res = 1
        var prev = ""

        while r < arr.count {
            if arr[r - 1] > arr[r] && prev != ">" {
                res = max(res, r - l + 1)
                r += 1
                prev = ">"
            } else if arr[r - 1] < arr[r] && prev != "<" {
                res = max(res, r - l + 1)
                r += 1
                prev = "<"
            } else {
                r = arr[r - 1] == arr[r] ? r + 1 : r
                l = r - 1
                prev = ""
            }
        }

        return res
    }
}