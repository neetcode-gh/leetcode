/**
 * Question Link: https://leetcode.com/problems/sliding-window-maximum/
 */

 class SlidingWindowMaximum {
    func maxSlidingWindow(_ nums: [Int], _ k: Int) -> [Int] {
        var output = [Int]()
        var deque = Deque()
        var l = 0
        var r = 0

        while r < nums.count {
            while !deque.isEmpty && nums[deque.last!] < nums[r] {
                deque.popRight()
            }
            deque.pushRight(r)

            if l > deque.first! {
                deque.popLeft()
            }

            if (r + 1) >= k {
                output.append(nums[deque.first!])
                l += 1
            }

            r += 1
        }

        return output
    }
}

struct Deque {
    private var storage: [Int?]
    private var head: Int
    private var capacity: Int
    private let originalCapacity: Int

    var isEmpty: Bool {
        storage.count - head == 0
    }

    var first: Int? {
        if isEmpty {
            return nil
        } else {
            return storage[head]
        }
    }

    var last: Int? {
        if isEmpty {
            return nil
        } else {
            return storage.last!
        }
    }

    init(capacity: Int = 10) {
        self.capacity = max(capacity, 1)
        self.storage = [Int?](repeating: nil, count: capacity)
        self.originalCapacity = self.capacity
        self.head = capacity
    }

    mutating func pushLeft(_ value: Int) {
        if head == 0 {
            capacity *= 2
            let emptySpace = [Int?](repeating: nil, count: capacity)
            storage.insert(contentsOf: emptySpace, at: 0)
            head = capacity
        }

        head -= 1
        storage[head] = value
    }

    mutating func popLeft() {
        guard
            head < storage.count,
            let value = storage[head]
        else {
            return
        }

        storage[head] = nil
        head += 1

        if capacity >= originalCapacity, head >= capacity * 2 {
            let emptySpace = capacity + capacity / 2
            storage.removeFirst(emptySpace)
            head -= emptySpace
            capacity /= 2
        }
    }

    mutating func pushRight(_ value: Int) {
        storage.append(value)
    }

    mutating func popRight() {
        storage.removeLast()
    }
}