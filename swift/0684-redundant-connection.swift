/**
 * Question Link: https://leetcode.com/problems/redundant-connection/
 */

 class UnionFind {
    var parents = [Int: Int]()
    var ranks = [Int: Int]()

    init(n: Int) {
        for i in 1..<n + 1 {
            parents[i] = i
            ranks[i] = 0
        }
    }

    func find(n: Int) -> Int {
        var p = parents[n]!
        while p != parents[p]! {
            parents[p] = parents[parents[p]!]
            p = parents[p]!
        }
        return p
    }

    func union(n1: Int, n2: Int) -> Bool {
        let p1 = find(n: n1)
        let p2 = find(n: n2)
        if p1 == p2 {
            return false
        }

        if ranks[p1]! > ranks[p2]! {
            parents[p2] = p1
        } else if ranks[p1]! < ranks[p2]! {
            parents[p1] = p2
        } else {
            parents[p1] = p2
            ranks[p2, default: 0] += 1
        }
        return true
    }
}

class Solution {
    func findRedundantConnection(_ edges: [[Int]]) -> [Int] {
        let unionFind = UnionFind(n: edges.count)
        for edge in edges {
            if !unionFind.union(n1: edge[0], n2: edge[1]) {
                return [edge[0], edge[1]]
            }
        }
        return []
    }
}