class Solution {
    func insert(_ intervals: [[Int]], _ newInterval: [Int]) -> [[Int]] {
        var res : [[Int]] = []
        var i = 0
        let n = intervals.count
        
        // parameters are immutable in Swift
        var currInterval = newInterval
        
        while i < n && intervals[i][1] < newInterval[0] {
            res.append(intervals[i])
            i += 1
        }
        
        while i < n && intervals[i][0] <= currInterval[1] {
            currInterval[0] = min(currInterval[0], intervals[i][0])
            currInterval[1] = max(currInterval[1], intervals[i][1])
            i += 1
        }
        res.append(currInterval)
        
        while i < n {
            res.append(intervals[i])
            i += 1
        }
        return res
    }
}