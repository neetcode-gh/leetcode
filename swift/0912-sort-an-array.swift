/**
 * Question Link: https://leetcode.com/problems/sort-an-array/
 */

 class Solution {
    func sortArray(_ nums: [Int]) -> [Int] {
        var nums = nums

        func merge(arr: inout [Int], l: Int, m: Int, r: Int) {
            var left = Array(arr[l...m])
            var right = Array(arr[m + 1...r])
            var i = l
            var j = 0
            var k = 0
            
            while j < left.count && k < right.count {
                if left[j] <= right[k] {
                    arr[i] = left[j]
                    j += 1
                } else {
                    arr[i] = right[k]
                    k += 1
                } 
                i += 1
            }

            while j < left.count {
                arr[i] = left[j]
                j += 1
                i += 1
            }

            while k < right.count {
                arr[i] = right[k]
                k += 1
                i += 1
            }

        }
        
        func mergeSort(arr: inout [Int], l: Int, r: Int) -> [Int] {
            if l == r {
                return arr
            }

            let m = (l + r) / 2
            mergeSort(arr: &arr, l: l, r: m)
            mergeSort(arr: &arr, l: m + 1, r: r)
            merge(arr: &arr, l: l, m: m, r: r)
            return arr
        }

        return mergeSort(arr: &nums, l: 0, r: nums.count - 1)
    }
}