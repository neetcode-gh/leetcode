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
                if 2 * i + 1 < heap.count && heap[2 * i + 1] > heap[2 * i] && heap[i] < heap[2 * i + 1] {
                    let tmp = heap[i]
                    heap[i] = heap[2 * i + 1]
                    heap[2 * i + 1] = tmp
                    i = 2 * i + 1
                } else if heap[i] < heap[2 * i] {
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
        while i > 1 && heap[i] > heap[i / 2] {
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
            if 2 * i + 1 < heap.count && heap[2 * i + 1] > heap[2 * i] && heap[i] < heap[2 * i + 1] {
                let tmp = heap[i]
                heap[i] = heap[2 * i + 1]
                heap[2 * i + 1] = tmp
                i = 2 * i + 1
            } else if heap[i] < heap[2 * i] {
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

class ListNode {
    var val: (Int, Int)
    var next: ListNode?
    
    init(_ val: (Int, Int)) {
        self.val = val
    }
}

class Queue {
    var head: ListNode?
    var tail: ListNode?
    var size = 0

    func enqueue(_ val: (Int, Int)) {
        let node = ListNode(val)
        if head == nil {
            head = node
            tail = node 
        } else {
            tail?.next = node
            tail = tail?.next
        }

        size += 1
    }

    func dequeue() -> (Int, Int)? {
        if head == nil {
            return nil
        }

        let node = head
        head = head?.next
        if head == nil {
            tail = nil
        }
        size -= 1
        return node?.val
    }
}

class Solution {
    func leastInterval(_ tasks: [Character], _ n: Int) -> Int {
        var count = [Character: Int]()
        for t in tasks {
            count[t, default: 0] += 1
        }
        let heap = Heap()
        heap.heapify(Array(count.values))

        var time = 0
        var q = Queue()
        while heap.count > 0 || q.size > 0 {
            time += 1
            if heap.count == 0 {
                time = q.head!.val.1
            } else {
                let cnt = heap.pop()! - 1
                if cnt != 0 {
                    q.enqueue((cnt, time + n))
                }
            }
            if q.size > 0 && q.head!.val.1 == time {
                heap.push(q.dequeue()!.0)
            }
        }

        return time
    }
}