/**
 * Question Link: https://leetcode.com/problems/network-delay-time/
 */

 class Heap {
    var heap = [[0, 0]]

    var count: Int {
        heap.count - 1
    }

    func push(_ val: [Int]) {
        heap.append(val)
        var i = heap.count - 1

        while i > 1 && heap[i][0] < heap[i / 2][0] {
            var tmp = heap[i]
            heap[i] = heap[i / 2]
            heap[i / 2] = tmp
            i = i / 2
        }
    }

    func pop() -> [Int]? {
        if heap.count == 1 {
            return nil
        }
        if heap.count == 2 {
            return heap.removeLast()
        }
        var res = heap[1]
        heap[1] = heap.removeLast()
        var i = 1
        while 2 * i < heap.count {
            if 2 * i + 1 < heap.count && heap[2 * i + 1][0] < heap[2 * i][0] && heap[i][0] > heap[2 * i + 1][0] {
                var tmp = heap[i]
                heap[i] = heap[2 * i + 1]
                heap[2 * i + 1] = tmp
                i = 2 * i + 1
            } else if heap[i][0] > heap[2 * i][0] {
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
    func networkDelayTime(_ times: [[Int]], _ n: Int, _ k: Int) -> Int {
        var edges = [Int: [[Int]]]()
        for i in 1..<n + 1 {
            edges[i] = []
        }
        for t in times {
            let u = t[0]
            let v = t[1]
            let w = t[2]
            edges[u, default: []].append([v, w])
        }
        var visit = Set<Int>()
        var res = 0
        var minHeap = Heap()
        minHeap.push([0, k])
        while minHeap.count > 0 {
            let val = minHeap.pop()!
            let w1 = val[0]
            let n1 = val[1]
            if visit.contains(n1) {
                continue
            }
            visit.insert(n1)
            res = w1
            for e in edges[n1]! {
                let n2 = e[0]
                let w2 = e[1]
                if !visit.contains(n2) {
                    minHeap.push([w1 + w2, n2])
                }
            }
        }
        return visit.count == n ? res : -1
    }
}