/**
 * Question Link: https://leetcode.com/problems/sort-items-by-groups-respecting-dependencies/
 */

 class Solution {
    func sortItems(_ n: Int, _ m: Int, _ group: [Int], _ beforeItems: [[Int]]) -> [Int] {
        var group = group
        var groupID = m
        for i in 0..<n {
            if group[i] == -1 {
                group[i] = groupID
                groupID += 1
            }
        }

        var itemGraph = [[Int]](repeating: [], count: n)
        var itemIndegree = [Int](repeating: 0, count: n)

        var groupGraph = [[Int]](repeating: [], count: groupID)
        var groupIndegree = [Int](repeating: 0, count: groupID)

        for cur in 0..<n {
            for prev in beforeItems[cur] {
                itemGraph[prev].append(cur)
                itemIndegree[cur] += 1

                if group[cur] != group[prev] {
                    groupGraph[group[prev]].append(group[cur])
                    groupIndegree[group[cur]] += 1
                }
            }
        }

        func dfs(_ graph: [[Int]], _ indegree: [Int]) -> [Int] {
            var indegree = indegree
            var visited = [Int]()
            var stack = [Int]()
            for i in 0..<graph.count {
                if indegree[i] == 0 {
                    stack.append(i)
                }
            }
            while !stack.isEmpty {
                var cur = stack.removeLast()
                visited.append(cur)
                for neib in graph[cur] {
                    indegree[neib] -= 1
                    if indegree[neib] == 0 {
                        stack.append(neib)
                    }
                }
            }
            return visited.count == graph.count ? visited : []
        }

        var itemOrder = dfs(itemGraph, itemIndegree)
        var groupOrder = dfs(groupGraph, groupIndegree)

        if itemOrder.isEmpty || groupOrder.isEmpty {
            return []
        }

        var orderedGroups = [Int: [Int]]()
        for item in itemOrder {
            orderedGroups[group[item], default: []].append(item)
        }

        var res = [Int]()
        for groupIndex in groupOrder {
            res += orderedGroups[groupIndex] ?? []
        }
        return res
    }
}