class Solution {
    func canAttendMeetings(_ intervals: [[Int]]) -> Bool {
        if intervals.isEmpty {
            return true
        }

        var intervals = intervals.sorted(by: { $0[0] < $1[0] })
        var lastEnd = intervals[0][1]

        for i in 1..<intervals.count {
            let start = intervals[i][0]
            let end = intervals[i][1]
            
            if start >= lastEnd { 
                lastEnd = intervals[i][1]
                continue
            } else {
                return false
            }
        }

        return true
    }
}