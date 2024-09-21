/**
 * Question Link: https://leetcode.com/problems/range-sum-query-mutable/
 */

 class SegmentTree {
    var sum: Int
    var left: SegmentTree!
    var right: SegmentTree!
    var l: Int
    var r: Int

    init(_ total: Int, _ l: Int, _ r: Int) {
        self.sum = total
        self.l = l
        self.r = r
    }

    static func build(_ nums: [Int], _ l: Int, _ r: Int) -> SegmentTree {
        if l == r {
            return SegmentTree(nums[l], l, r)
        }
        let m = (l + r) / 2
        let root = SegmentTree(0, l, r)
        root.left = SegmentTree.build(nums, l, m)
        root.right = SegmentTree.build(nums, m + 1, r)
        root.sum = root.left.sum + root.right.sum
        return root
    }

    func update(_ index: Int, _ val: Int) {
        if l == r {
            sum = val
            return
        }
        let m = (l + r) / 2
        if index > m {
            right.update(index, val)
        } else {
            left.update(index, val)
        }
        sum = left.sum + right.sum
    }

    func rangeQuery(_ l: Int, _ r: Int) -> Int {
        if self.l == l && self.r == r {
            return sum
        }
        let m = (self.l + self.r) / 2
        if l > m {
            return right.rangeQuery(l, r)
        } else if r <= m {
            return left.rangeQuery(l, r)
        } else {
            return left.rangeQuery(l, m) + right.rangeQuery(m + 1, r)
        }
    }
}

class NumArray {
    let segmentTree: SegmentTree

    init(_ nums: [Int]) {
        segmentTree = SegmentTree.build(nums, 0, nums.count - 1)
    }
    
    func update(_ index: Int, _ val: Int) {
        segmentTree.update(index, val)
    }
    
    func sumRange(_ left: Int, _ right: Int) -> Int {
        segmentTree.rangeQuery(left, right)
    }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * let obj = NumArray(nums)
 * obj.update(index, val)
 * let ret_2: Int = obj.sumRange(left, right)
 */