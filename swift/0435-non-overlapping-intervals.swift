class Solution {
    func eraseOverlapIntervals(_ intervals: [[Int]]) -> Int {
        var intervals = intervals.sorted(by: { $0[0] < $1[0] })
        var res = 0
        var lastEnd = intervals[0][1]
        for i in 1..<intervals.count {
            let start = intervals[i][0]
            let end = intervals[i][1]
            if start >= lastEnd {
                lastEnd = end
            } else {
                res += 1
                lastEnd = min(lastEnd, end)
            }
        }
        return res
    }
}