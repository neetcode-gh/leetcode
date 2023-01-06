impl Solution {
    pub fn merge(nums1: &mut Vec<i32>, m: i32, nums2: &mut Vec<i32>, n: i32) {
        let (mut m, mut n) = (m as usize, n as usize);
        // Last index nums1
        let mut last = m + n - 1;

        // Merge in reverse order
        while m > 0 && n > 0 {
            if nums1[m - 1] > nums2[n as usize - 1] {
                nums1[last] = nums1[m - 1];
                m -= 1;
            } else {
                nums1[last] = nums2[n - 1];
                n -= 1;
            }
            last -= 1
        }

        // Fill nums1 with leftover nums2 elements
        while n > 0 {
            nums1[last] = nums2[n - 1];
            n -= 1;
            last -= 1;
        }
    }
}
