/**
 * Question Link: https://leetcode.com/problems/last-stone-weight/
 */

 class Heap {
    private var arr = [Int]()

    var count: Int {
        arr.count - 1
    }

    var first: Int {
        arr[1]
    }

    func heapify(_ array: [Int]) {
        arr = array
        arr.append(arr[0])
        var cur = (arr.count - 1) / 2
        while cur > 0 {
            var i = cur
            while 2 * i < arr.count {
                if 2 * i + 1 < arr.count && arr[2 * i + 1] > arr[2 * i] && arr[i] < arr[2 * i + 1] {
                    let tmp = arr[i]
                    arr[i] = arr[2 * i + 1]
                    arr[2 * i + 1] = tmp
                    i = 2 * i + 1
                } else if arr[i] < arr[2 * i] {
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

    func push(_ val: Int) {
        arr.append(val)
        var i = arr.count - 1
        while i > 1 && arr[i] > arr[i / 2] {
            let tmp = arr[i]
            arr[i] = arr[i / 2]
            arr[i / 2] = tmp
            i = i / 2
        }
    }

    func pop() -> Int? {
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
            if 2 * i + 1 < arr.count && arr[2 * i + 1] > arr[2 * i] && arr[i] < arr[2 * i + 1] {
                let tmp = arr[i]
                arr[i] = arr[2 * i + 1]
                arr[2 * i + 1] = tmp
                i = 2 * i + 1
            } else if arr[i] < arr[2 * i] {
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
    func lastStoneWeight(_ stones: [Int]) -> Int {
        let heap = Heap()
        heap.heapify(stones)
        while heap.count > 1 {
            let first = heap.pop()!
            let second = heap.pop()!
            if first > second {
                heap.push(first - second)
            }
        }
        heap.push(0)
        return heap.first
    }
}