class DisjointSet {
    private var ranks: [Int]
    private var roots: [Int]
    
    init(numVertices: Int) {
        ranks = [Int](repeating: 0, count: numVertices)
        roots = [Int](repeating: 0, count: numVertices)
        
        for i in 0..<numVertices {
            roots[i] = i
            ranks[i] = 1
        }
    }
    
    public func union(v1 x: Int, v2 y: Int) {
        let rootX = find(of: x)
        let rootY = find(of: y)
        
        guard rootX != rootY else { return }
        
        let rankX = ranks[rootX]
        let rankY = ranks[rootY]
        
        if rankX > rankY { // go into X
            roots[rootY] = rootX
        } else if rankY > rankX {   // go into Y
            roots[rootX] = rootY
        } else {    // go into X by default
            roots[rootY] = rootX
            ranks[rootX] += 1
        }
    }
    
    private func find(of x: Int) -> Int {
        if roots[x] == x { return x }
        roots[x] = find(of: roots[x])
        return roots[x]
    }
    
    public func areConnected(v1: Int, v2: Int) -> Bool {
        find(of: v1) == find(of: v2)
    }
    
    public func areDisjoint(v1: Int, v2: Int) -> Bool {
        !areConnected(v1: v1, v2: v2)
    }
    
    private func isRoot(_ x: Int) -> Bool {
        return find(of: x) == x
    }
    
    public var numConnectedComponents: Int {
        Array(0..<roots.count).filter{isRoot($0)}.count
    }
}

class Solution {
    func countComponents(_ n: Int, _ edges: [[Int]]) -> Int {
        let ds = DisjointSet(numVertices: n)
        
        edges.forEach { edge in
            ds.union(v1: edge[0], v2: edge[1])
        }
        
        return ds.numConnectedComponents
    }
}
