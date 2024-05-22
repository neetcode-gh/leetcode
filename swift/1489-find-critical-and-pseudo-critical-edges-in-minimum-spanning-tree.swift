/**
 * Question Link: https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/
 */

 class UnionFind {
    var par: [Int] = []
    var rank: [Int] = []

    init(_ n: Int) {
        par = [Int](0..<n)
        rank = [Int](repeating: 1, count: n)
    }

    func find(_ v1: Int) -> Int {
        var v1 = v1
        while v1 != par[v1] {
            par[v1] = par[par[v1]]
            v1 = par[v1]
        }
        return v1
    }

    func union(_ v1: Int, _ v2: Int) -> Bool {
        var p1 = find(v1)
        var p2 = find(v2)
        if p1 == p2 {
            return false
        }
        if rank[p1] > rank[p2] {
            par[p2] = p1
            rank[p1] += rank[p2]
        } else {
            par[p1] = p2
            rank[p2] += rank[p1]
        }
        return true
    }
}

class Solution {
    func findCriticalAndPseudoCriticalEdges(_ n: Int, _ edges: [[Int]]) -> [[Int]] {
        var edges = edges
        for i in 0..<edges.count {
            edges[i].append(i)
        }
        edges.sort { $0[2] < $1[2] }
        var mstWeight = 0
        var uf = UnionFind(n)
        for e in edges {
            let v1 = e[0], v2 = e[1], w = e[2]
            if uf.union(v1, v2) {
                mstWeight += w
            }
        }

        var critical = [Int]()
        var pseudo = [Int]()
        for e in edges {
            let n1 = e[0], n2 = e[1], eWeight = e[2], i = e[3]
            var weight = 0
            var uf = UnionFind(n)
            for ed in edges {
                let v1 = ed[0], v2 = ed[1], w = ed[2], j = ed[3]
                if i != j && uf.union(v1, v2) {
                    weight += w
                }
            }
            if uf.rank.max() != n || weight > mstWeight {
                critical.append(i)
                continue
            }

            let uf2 = UnionFind(n)
            uf2.union(n1, n2)
            weight = eWeight
            for ed in edges {
                let v1 = ed[0], v2 = ed[1], w = ed[2]
                if uf2.union(v1, v2) {
                    weight += w
                }
            }
            if weight == mstWeight {
                pseudo.append(i)
            }
        }
        return [critical, pseudo]
    }
}