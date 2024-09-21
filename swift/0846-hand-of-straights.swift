class Heap {
    var heap = [0]

    var count: Int {
        heap.count - 1
    }

    var first: Int {
        heap[1]
    }

    func heapify(_ arr: [Int]) {
        heap = arr
        heap.append(arr[0])
        var cur = (heap.count - 1) / 2
        while cur > 0 {
            var i = cur
            while 2 * i < heap.count {
                if 2 * i + 1 < heap.count && heap[2 * i + 1] < heap[2 * i] && heap[i] > heap[2 * i + 1] {
                    let tmp = heap[i]
                    heap[i] = heap[2 * i + 1]
                    heap[2 * i + 1] = tmp
                    i = 2 * i + 1
                } else if heap[i] > heap[2 * i] {
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

    func push(_ val: Int) {
        heap.append(val)
        var i = heap.count - 1
        while i > 1 && heap[i] < heap[i / 2] {
            let tmp = heap[i]
            heap[i] = heap[i / 2]
            heap[i / 2] = tmp
            i = i / 2
        }
    }

    func pop() -> Int? {
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
            if 2 * i + 1 < heap.count && heap[2 * i + 1] < heap[2 * i] && heap[i] > heap[2 * i + 1] {
                let tmp = heap[i]
                heap[i] = heap[2 * i + 1]
                heap[2 * i + 1] = tmp
                i = 2 * i + 1
            } else if heap[i] > heap[2 * i] {
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
    func isNStraightHand(_ hand: [Int], _ groupSize: Int) -> Bool {
        var count = [Int: Int]()
        for n in hand {
            count[n, default: 0] += 1
        }

        let minHeap = Heap()
        minHeap.heapify(Array(count.keys))

        while minHeap.count > 0 {
            for i in minHeap.first..<(minHeap.first + groupSize) {
                if count[i] == nil {
                    return false
                }

                count[i, default: 0] -= 1
                if count[i] == 0 {
                    if i != minHeap.first {
                        return false
                    }
                    minHeap.pop()
                }
            }
        }

        return true
    }
}