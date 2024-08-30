/**
 * Question Link: https://leetcode.com/problems/longest-increasing-subsequence-ii/
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
        root.sum = max(root.left.sum, root.right.sum)
        return root
    }

    func update(_ index: Int, _ val: Int) {
        if self.l == self.r {
            sum = val
            return
        }
        let m = (l + r) / 2
        if index > m {
            right.update(index, val)
        } else {
            left.update(index, val)
        }
        sum = max(left.sum, right.sum)
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
            return max(left.rangeQuery(l, m), right.rangeQuery(m + 1, r))
        }
    }
}

class Solution {
    func lengthOfLIS(_ nums: [Int], _ k: Int) -> Int {
        let val = nums.max()!
        var res = 1
        let tree = SegmentTree.build([Int](repeating: 0, count: val + 1), 0, val)
        for n in nums {
            let left = max(0, n - k)
            let count = tree.rangeQuery(left, n - 1) + 1
            res = max(res, count)
            tree.update(n, count)
        }
        return res
    }
}