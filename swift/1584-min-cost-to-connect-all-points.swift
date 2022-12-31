class DisjointSet {
    var roots: [Int]
    var ranks: [Int]
    
    init(n: Int) {
        roots = [Int](repeating: 0, count: n)
        ranks = [Int](repeating: 0, count: n)
        
        for i in 0..<n {
            roots[i] = i
            ranks[i] = 1
        }
    }
    
    public func find(_ u: Int) -> Int {
        guard u != roots[u] else { return u }
        roots[u] = find(roots[u])
        return roots[u]
    }
    
    public func union(_ x: Int, _ y: Int) {
        let rootX = roots[x]
        let rootY = roots[y]
        guard rootX != rootY else { return }
        
        // assign to the bigger one
        if ranks[rootX] > ranks[rootY] {
            roots[rootY] = rootX
        } else if ranks[rootY] > ranks[rootX] {
            roots[rootX] = rootY
        } else {
            // default: assign to root X
            roots[rootY] = rootX
            ranks[rootX] += 1
        }
    }
    
    public func areDisjoint(u: Int, v: Int) -> Bool {
        find(u) != find(v)
    }
}

struct Edge {
    let source: Int
    let destination: Int
    let weight: Int
    
    init(u: Int, v: Int, w: Int) {
        source = u
        destination = v
        weight = w
    }
}

class Solution {
    func minCostConnectPoints(_ points: [[Int]]) -> Int {
        let edges: [Edge] = getEdges(from: points)
        // images.sorted(by: { $0.fileID > $1.fileID })
        // sort by ascending order
        let sortedEdges = edges.sorted { $0.weight < $1.weight }
        var disjointSet = DisjointSet(n: points.count)
        var total = 0
        
        sortedEdges.forEach { edge in
            let u = edge.source
            let v = edge.destination
            let w = edge.weight
           
            guard disjointSet.areDisjoint(u: u, v: v) else { return }
            disjointSet.union(u, v)
            total += w
        }
        
        return total
    }
}

private extension Solution {
    func distance(from point1: [Int], to point2: [Int]) -> Int {
        abs(point1[0] - point2[0]) + abs(point1[1] - point2[1])
    }
    
    func getEdges(from points: [[Int]]) -> [Edge] {
        var edges: [Edge] = []
        let n = points.count
        for i in 0..<n {
            for j in i+1..<n {
                let weight = distance(from: points[i], to: points[j])
                let edge = Edge(u: i, v: j, w: weight)
                edges.append(edge)
            }
        }
        return edges
    }
}