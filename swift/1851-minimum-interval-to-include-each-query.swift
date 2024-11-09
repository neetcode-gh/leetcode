class Heap {
    var heap = [[0]]

    var count: Int {
        heap.count - 1
    }

    var first: [Int] {
        heap[1]
    }

    func heapify(_ arr: [[Int]]) {
        heap = arr
        heap.append(arr[0])
        var cur = (heap.count - 1) / 2
        while cur > 0 {
            var i = cur
            while 2 * i < heap.count {
                if 2 * i + 1 < heap.count && heap[2 * i + 1][0] < heap[2 * i][0] && heap[i][0] > heap[2 * i + 1][0] {
                    let tmp = heap[i]
                    heap[i] = heap[2 * i + 1]
                    heap[2 * i + 1] = tmp
                    i = 2 * i + 1
                } else if heap[i][0] > heap[2 * i][0] {
                    let tmp = heap[i]
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
            let tmp = heap[i]
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
        let res = heap[1]
        heap[1] = heap.removeLast()
        var i = 1
        while 2 * i < heap.count {
            if 2 * i + 1 < heap.count && heap[2 * i + 1][0] < heap[2 * i][0] && heap[i][0] > heap[2 * i + 1][0] {
                let tmp = heap[i]
                heap[i] = heap[2 * i + 1]
                heap[2 * i + 1] = tmp
                i = 2 * i + 1
            } else if heap[i][0] > heap[2 * i][0] {
                let tmp = heap[i]
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
    func minInterval(_ intervals: [[Int]], _ queries: [Int]) -> [Int] {
        var intervals = intervals.sorted(by: { $0[0] < $1[0] })
        let minHeap = Heap()
        var res = [Int: Int]()
        var i = 0
        for q in queries.sorted() {
            while i < intervals.count && intervals[i][0] <= q {
                let l = intervals[i][0]
                let r = intervals[i][1]
                minHeap.push([r - l + 1, r])
                i += 1
            }

            while minHeap.count > 0 && minHeap.first[1] < q {
                minHeap.pop()
            }

            res[q] = minHeap.count > 0 ? minHeap.first[0] : -1
        }

        return queries.map { res[$0] ?? -1 }
    }
}