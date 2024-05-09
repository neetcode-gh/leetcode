/**
 * Question Link: https://leetcode.com/problems/ipo/
 */

 class Heap {
    var heap = [[0]]

    var count: Int {
        heap.count - 1
    }

    var first: [Int] {
        heap[1]
    }

    func heapify(_ val: [[Int]]) {
        var val = val
        val.append(val[0])
        heap = val
        var cur = (heap.count - 1) / 2
        while cur > 0 {
            var i = cur
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
            cur -= 1
        }
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
    func findMaximizedCapital(_ k: Int, _ w: Int, _ profits: [Int], _ capital: [Int]) -> Int {
        let maxProfit = Heap()
        let minCapital = Heap()
        var cap = [[Int]]()
        for (c, p) in zip(capital, profits) {
            cap.append([c, p])
        }
        minCapital.heapify(cap)
        var res = w
        for i in 0..<k {
            while minCapital.count > 0 && minCapital.first[0] <= res {
                let cp = minCapital.pop()!
                maxProfit.push([-1 * cp[1]])
            }
            if maxProfit.count <= 0 {
                break
            }
            res += -1 * maxProfit.pop()![0]
        }
        return res
    }
}