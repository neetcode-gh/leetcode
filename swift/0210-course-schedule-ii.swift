/**
 * Question Link: https://leetcode.com/problems/course-schedule-ii/
 */

 class Solution {
    func findOrder(_ numCourses: Int, _ prerequisites: [[Int]]) -> [Int] {
        var prereq = [Int: [Int]]()
        for i in 0..<numCourses {
            prereq[i] = []
        }
        for p in prerequisites {
            let crs = p[0], pre = p[1]
            prereq[crs, default: []].append(pre)
        }
        var output = [Int]()
        var visit = Set<Int>()
        var cycle = Set<Int>()

        func dfs(_ crs: Int) -> Bool {
            if cycle.contains(crs) {
                return false
            }
            if visit.contains(crs) {
                return true
            }
            cycle.insert(crs)
            for pre in prereq[crs]! {
                if !dfs(pre) {
                    return false
                }
            }
            cycle.remove(crs)
            visit.insert(crs)
            output.append(crs)
            return true
        }

        for i in 0..<numCourses {
            if !dfs(i) {
                return []
            }
        }
        return output
    }
}