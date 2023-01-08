// Time Complexity: O(m + n)
// Space Complexity: O(1)

func merge(nums1 []int, m int, nums2 []int, n int)  {
    last := m + n - 1
    m -= 1
    n -= 1

    for m >= 0 && n >= 0 {
        if nums1[m] > nums2[n] {
            nums1[last] = nums1[m]
            m -= 1
        } else {
            nums1[last] = nums2[n]
            n -= 1
        }
        last -= 1
    }

    for n >= 0 {
        nums1[last] = nums2[n]
        last -= 1
        n -= 1
    }
}
