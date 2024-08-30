/**
 * Question Link: https://leetcode.com/problems/first-bad-version/
 */

 /**
 * The knows API is defined in the parent class VersionControl.
 *     func isBadVersion(_ version: Int) -> Bool{}
 */

class Solution : VersionControl {
    func firstBadVersion(_ n: Int) -> Int {
        var l = 0
        var r = n

        while l <= r {
            let mid = l + (r - l) / 2
            if isBadVersion(mid) {
                r = mid - 1
            } else {
                l = mid + 1
            }
        }

        return l + (r - l) / 2
    }
}