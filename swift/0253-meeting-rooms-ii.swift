class Solution {
    func minMeetingRooms(_ intervals: [[Int]]) -> Int {
        var start = intervals.map({ $0[0] }).sorted()
        var end = intervals.map({ $0[1] }).sorted()
        var res = 0
        var count = 0
        var s = 0
        var e = 0

        while s < intervals.count {
            if start[s] < end[e] {
                s += 1
                count += 1
            } else {
                e += 1
                count -= 1
            }
            res = max(res, count)
        }

        return res
    }
}