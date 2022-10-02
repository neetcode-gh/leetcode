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
}

class Solution {
    func validTree(_ n: Int, _ edges: [[Int]]) -> Bool {
        // Check if n-1 edges
        let numEdges = edges.count
        guard numEdges == (n - 1) else { return false }
        
        // Check if connected => Can use DisjointSet/UnionFind
        let ds = DisjointSet(numVertices: n)
        for edge in edges {
            let v1 = edge[0]; let v2 = edge[1]
            guard ds.areDisjoint(v1: v1, v2: v2) else { 
                return false 
            }
            ds.union(v1: v1, v2: v2)
        }
        
        return true;
    }
}


