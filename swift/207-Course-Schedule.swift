class Solution {
    func canFinish(_ numCourses: Int, _ prerequisites: [[Int]]) -> Bool {
        // map each course to prereq List
        var preMap = [Int: [Int]]()
        for num in 0..<numCourses {
            preMap[num] = []
        }
        
        for prerequisitePair in prerequisites {
            let course = prerequisitePair[0]
            let prerequisite = prerequisitePair[1]
            preMap[course, default: []] += [prerequisite]
        }
        
        // visitSet is all courses along the current DFS path
        var visitSet = Set<Int>()

        for crs in 0..<numCourses {
            let canCompleteCourse = dfs(crs, &preMap, &visitSet)
            if !canCompleteCourse {
                return false
            }
        }
        
        return true
    }
    
    func dfs(_ crs: Int, _ preMap: inout [Int: [Int]], _ visitSet: inout Set<Int>) -> Bool {
        guard !visitSet.contains(crs) else {
            return false
        }
        
        if preMap[crs] == [] {
            return true
        }
        
        visitSet.insert(crs)

        if let prerequisites = preMap[crs] {
            for pre in prerequisites {
                let canCompletePrerequisite = dfs(pre, &preMap, &visitSet)
                if !canCompletePrerequisite { 
                    return false 
                }
            }    
        }
        
        visitSet.remove(crs)
        preMap[crs] = []
        
        return true
    }
}


