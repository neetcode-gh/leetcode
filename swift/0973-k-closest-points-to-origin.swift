/**
 * Question Link: https://leetcode.com/problems/k-closest-points-to-origin/
 */

 class Heap {
    var arr = [[Int]]()

    func heapify(_ val: [[Int]]) {
        arr = val
        arr.append(arr[0])
        var cur = (arr.count - 1) / 2

        while cur > 0 {
            var i = cur
            while 2 * i < arr.count {
                if 2 * i + 1 < arr.count && arr[2 * i + 1][0] < arr[2 * i][0] && arr[i][0] > arr[2 * i + 1][0] {
                    let tmp = arr[i]
                    arr[i] = arr[2 * i + 1]
                    arr[2 * i + 1] = tmp
                    i = 2 * i + 1
                } else if arr[i][0] > arr[2 * i][0] {
                    let tmp = arr[i]
                    arr[i] = arr[2 * i]
                    arr[2 * i] = tmp
                    i = 2 * i
                } else {
                    break
                }
            }
            cur -= 1
        }
    }

    func pop() -> [Int]? {
        if arr.count == 1 {
            return nil
        }

        if arr.count == 2 {
            return arr.popLast()
        }

        let res = arr[1]
        arr[1] = arr.removeLast()
        var i = 1

        while 2 * i < arr.count {
            if 2 * i + 1 < arr.count && arr[2 * i + 1][0] < arr[2 * i][0] && arr[i][0] > arr[2 * i + 1][0] {
                let tmp = arr[i]
                arr[i] = arr[2 * i + 1]
                arr[2 * i + 1] = tmp
                i = 2 * i + 1
            } else if arr[i][0] > arr[2 * i][0] {
                let tmp = arr[i]
                arr[i] = arr[2 * i]
                arr[2 * i] = tmp
                i = 2 * i
            } else {
                break
            }
        }

        return res
    }
}

class Solution {
    func kClosest(_ points: [[Int]], _ k: Int) -> [[Int]] {
        let heap = Heap()
        var minHeap = [[Int]]()
        var res = [[Int]]()

        for arr in points {
            let x = arr[0]
            let y = arr[1]
            let dist = x * x + y * y
            minHeap.append([dist, x, y])
        }
        heap.heapify(minHeap)
        print(heap.arr)
        var k = k
        while k > 0 {
            let arr = heap.pop()!
            res.append([arr[1], arr[2]])
            k -= 1
        }
        return res
    }
}