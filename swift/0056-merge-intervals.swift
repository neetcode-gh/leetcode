/**
 * Question Link: https://leetcode.com/problems/merge-intervals/
 */

 class Solution {
    func merge(_ intervals: [[Int]]) -> [[Int]] {
        var intervals = intervals.sorted { $0[0] < $1[0] }
        var res = [intervals[0]]

        for interval in intervals {
            let start = interval[0]
            let end = interval[1]
            let lastEnd = res[res.count - 1][1]

            if start <= lastEnd {
                res[res.count - 1][1] = max(lastEnd, end)
            } else {
                res.append([start, end])
            }
        }

        return res
    }
}