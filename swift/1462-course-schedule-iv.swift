/**
 * Question Link: https://leetcode.com/problems/course-schedule-iv/
 */

 class Solution {
    func checkIfPrerequisite(_ numCourses: Int, _ prerequisites: [[Int]], _ queries: [[Int]]) -> [Bool] {
        var adj = [Int: [Int]]()

        for i in 0..<numCourses {
            adj[i] = []
        }

        for p in prerequisites {
            let prereq = p[0], crs = p[1]
            adj[crs, default: []].append(prereq)
        }
        
        var prereqMap = [Int: Set<Int>]()

        func dfs(_ crs: Int) -> Set<Int> {
            if prereqMap[crs] == nil {
                prereqMap[crs] = Set<Int>()
                for pre in adj[crs]! {
                    prereqMap[crs]!.formUnion(dfs(pre))
                }
            }
            prereqMap[crs]?.insert(crs)
            return prereqMap[crs]!
        }

        for crs in 0..<numCourses {
            dfs(crs)
        }

        var res = [Bool]()
        for q in queries {
            let u = q[0], v = q[1]
            res.append(prereqMap[v]?.contains(u) ?? false)
        }

        return res
    }
}