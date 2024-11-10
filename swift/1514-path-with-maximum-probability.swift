/**
 * Question Link: https://leetcode.com/problems/path-with-maximum-probability/
 */

 class Heap {
    var heap = [[0.0, 0.0]]

    var count: Int {
        heap.count - 1
    }

    func push(_ val: [Double]) {
        heap.append(val)
        var i = heap.count - 1
        while i > 1 && heap[i][0] > heap[i / 2][0] {
            var tmp = heap[i]
            heap[i] = heap[i / 2]
            heap[i / 2] = tmp
            i = i / 2
        }
    }

    func pop() -> [Double]? {
        if heap.count == 1 {
            return nil
        }
        if heap.count == 2 {
            return heap.popLast()
        }
        var res = heap[1]
        heap[1] = heap.removeLast()
        var i = 1
        while 2 * i < heap.count {
            if 2 * i + 1 < heap.count && heap[2 * i + 1][0] > heap[2 * i][0] && heap[i][0] < heap[2 * i + 1][0] {
                var tmp = heap[i]
                heap[i] = heap[2 * i + 1]
                heap[2 * i + 1] = tmp
                i = 2 * i + 1
            } else if heap[i][0] < heap[2 * i][0] {
                var tmp = heap[i]
                heap[i] = heap[2 * i]
                heap[2 * i] = tmp
                i = 2 * i
            } else {
                break
            }
        }
        return res
    }
}

class Solution {
    func maxProbability(_ n: Int, _ edges: [[Int]], _ succProb: [Double], _ start_node: Int, _ end_node: Int) -> Double {
        var adj = [Double: [[Double]]]()
        for i in 1..<n + 1 {
            adj[Double(i)] = []
        }
        for i in 0..<edges.count {
            let src = Double(edges[i][0])
            let dst = Double(edges[i][1])
            adj[src, default: []].append([dst, succProb[i]])
            adj[dst, default: []].append([src, succProb[i]])
        }
        var pq = Heap()
        pq.push([1.0, Double(start_node)])
        var visit = Set<Double>()
        while pq.count > 0 {
            let val = pq.pop()!
            let prob = val[0]
            let cur = val[1]
            visit.insert(cur)
            if cur == Double(end_node) {
                return prob
            }
            for a in adj[cur]! {
                let nei = a[0]
                let edgeProb = a[1]
                if !visit.contains(nei) {
                    pq.push([prob * edgeProb, nei])
                }
            }
        }
        return 0.0
    }
}