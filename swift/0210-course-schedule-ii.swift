class Solution {
    func findOrder(_ numCourses: Int, _ prerequisites: [[Int]]) -> [Int] {
        var preMap: [Int: [Int]] = [:]

        for i in 0..<numCourses {
            preMap[i] = []
        }
        
        for prerequisite in prerequisites {
            guard let course = prerequisite.first,
                  let prereq = prerequisite.last
            else { continue }
            preMap[course]?.append(prereq)
        }
        
        var stack: [Int] = []
        var visited = Set<Int>()
        var cycle = Set<Int>()
        func dfs(course: Int, visited: inout Set<Int>, cycle: inout Set<Int>, stack: inout [Int]) -> Bool {
            guard !cycle.contains(course) else { return false }
            guard !visited.contains(course) else { return true }

            visited.insert(course)
            cycle.insert(course)

            let prereqs = preMap[course] ?? []
            for prereq in prereqs {
                guard dfs(course: prereq, visited: &visited, cycle: &cycle, stack: &stack) else { return false }
            }

            cycle.remove(course)
            stack.append(course)

            return true
        }
        
        for course in preMap.keys {
            guard !visited.contains(course) else { continue }
            guard dfs(course: course, visited: &visited, cycle: &cycle, stack: &stack) else { return [] }
        }

        return stack.count <= numCourses ? stack : []
    }
}
