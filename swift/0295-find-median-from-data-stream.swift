/**
 * Question Link: https://leetcode.com/problems/find-median-from-data-stream/
 */

 class Heap {
    var arr = [0]

    var count: Int {
        arr.count - 1
    }

    var first: Int {
        arr[1]
    }

    func push(_ val: Int) {
        arr.append(val)
        var i = arr.count - 1
        while i > 1 && arr[i] < arr[i / 2] {
            var tmp = arr[i]
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
        var res = arr[1]
        arr[1] = arr.removeLast()
        var i = 1
        while 2 * i < arr.count {
            if 2 * i + 1 < arr.count && arr[2 * i + 1] < arr[2 * i] && arr[i] > arr[2 * i + 1] {
                var tmp = arr[i]
                arr[i] = arr[2 * i + 1]
                arr[2 * i + 1] = tmp
                i = 2 * i + 1
            } else if arr[i] > arr[2 * i] {
                var tmp = arr[i]
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

class MedianFinder {
    var small = Heap()
    var large = Heap()

    init() {
        
    }
    
    func addNum(_ num: Int) {
        small.push(-1 * num)
        if small.count > 0 && large.count > 0 && (-1 * small.first) > large.first {
            var val = -1 * small.pop()!
            large.push(val)
        }

        if small.count > large.count + 1 {
            var val = -1 * small.pop()!
            large.push(val)
        }

        if large.count > small.count + 1 {
            var val = large.pop()!
            small.push(-1 * val)
        }
    }
    
    func findMedian() -> Double {
        if small.count > large.count {
            return Double(-1 * small.first)
        } else if large.count > small.count {
            return Double(large.first)
        }
        return (-1.0 * Double(small.first) + Double(large.first)) / 2.0
    }
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * let obj = MedianFinder()
 * obj.addNum(num)
 * let ret_2: Double = obj.findMedian()
 */