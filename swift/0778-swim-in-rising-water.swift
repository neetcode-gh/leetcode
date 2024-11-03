/**
 * Question Link: https://leetcode.com/problems/swim-in-rising-water/
 */

 class Heap {
    var heap = [[0, 0, 0]]

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
            return heap.popLast()
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
    func swimInWater(_ grid: [[Int]]) -> Int {
        let n = grid.count
        var visit = Set<[Int]>()
        var minH = Heap()
        minH.push([grid[0][0], 0, 0])
        let directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
        visit.insert([0, 0])
        while minH.count > 0 {
            let val = minH.pop()!
            let t = val[0]
            let r = val[1]
            let c = val[2]
            if r == n - 1 && c == n - 1 {
                return t
            }
            for d in directions {
                let dr = d[0]
                let dc = d[1]
                var neiR = r + dr
                var neiC = c + dc
                if neiR < 0 || neiC < 0 || neiR == n || neiC == n || visit.contains([neiR, neiC]) {
                    continue
                }
                visit.insert([neiR, neiC])
                minH.push([max(t, grid[neiR][neiC]), neiR, neiC])
            }
        }
        return -1
    }
}