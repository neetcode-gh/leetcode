/**
 * Question Link: https://leetcode.com/problems/sliding-window-median/
 */

 class Heap {
    var heap = [0]

    var count: Int {
        heap.count - 1
    }

    var first: Int {
        heap[1]
    }

    func push(_ val: Int) {
        heap.append(val)
        var i = heap.count - 1
        while i > 1 && heap[i] < heap[i / 2] {
            var tmp = heap[i]
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
            return heap.removeLast()
        }
        var res = heap[1]
        heap[1] = heap.removeLast()
        var i = 1 
        while 2 * i < heap.count {
            if 2 * i + 1 < heap.count && heap[2 * i + 1] < heap[2 * i] && heap[i] > heap[2 * i + 1] {
                var tmp = heap[i]
                heap[i] = heap[2 * i + 1]
                heap[2 * i + 1] = tmp
                i = 2 * i + 1
            } else if heap[i] > heap[2 * i] {
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
    func medianSlidingWindow(_ nums: [Int], _ k: Int) -> [Double] {
        let small = Heap()
        let large = Heap()

        var medians = [Double]()
        var hashtable = [Int: Int]()

        var i = 0
        while i < k {
            small.push(-1 * nums[i])
            i += 1
        }
        for j in 0..<(k / 2) { // maybe wrong range
            large.push(-1 * small.first)
            _ = small.pop()
        }

        while true {
            if k & 1 == 1 { // maybe should use 0
                medians.append(Double(-1 * small.first))
            } else {
                medians.append((-1.0 * Double(small.first) + Double(large.first)) * 0.5)
            }
            if i >= nums.count {
                break
            }

            let outNum = nums[i - k]
            let inNum = nums[i]
            var balance = 0
            
            if outNum <= -1 * small.first {
                balance += -1
            } else {
                balance += 1
            }
            hashtable[outNum, default: 0] += 1

            if small.count > 0 && inNum <= -1 * small.first {
                balance += 1
                small.push(-1 * inNum)
            } else {
                balance -= 1
                large.push(inNum)
            }
            i += 1

            if balance < 0 {
                small.push(-1 * large.first)
                large.pop()
                balance += 1
            }
            if balance > 0 {
                large.push(-1 * small.first)
                small.pop()
                balance -= 1
            }

            while hashtable[-1 * small.first] != nil && hashtable[-1 * small.first]! > 0 {
                hashtable[-1 * small.first, default: 0] -= 1
                small.pop()
            }
            while large.count > 0 && hashtable[large.first] != nil && hashtable[large.first]! > 0 {
                hashtable[large.first, default: 0] -= 1
                large.pop()
            }
        }

        return medians
    }
}