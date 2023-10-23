// Solution 1: focus on logic
impl Solution {
    pub fn find_median_sorted_arrays(mut nums1: Vec<i32>, nums2: Vec<i32>) -> f64 {
        for val in nums2 {
          nums1.insert(nums1.binary_search(&val).unwrap_or_else(|e| e), val);
        }
        if nums1.len()%2==0 {
          (nums1[(nums1.len()-1) / 2] +  nums1[nums1.len() / 2]) as f64 / 2.0
        } else {
          nums1[(nums1.len()-1) / 2] as f64
        }
    }
}

// Solution 2: focus on binary search
impl Solution {
    pub fn find_median_sorted_arrays(mut nums1: Vec<i32>, mut nums2: Vec<i32>) -> f64 {
        let total = nums1.len() + nums2.len();
        let half = total / 2;

        if nums1.len() > nums2.len() {
            std::mem::swap(&mut nums1, &mut nums2);
        }

        let mut left = 0;
        let mut right = nums1.len();

        while left <= right {
            let mid = left + (right - left) / 2;
            let pointer = half - mid;

            let base_left = if mid > 0 {
                nums1[mid - 1] as f64
            } else {
                f64::MIN
            };

            let base_right = if mid < nums1.len() {
                nums1[mid] as f64
            } else {
                f64::MAX
            };

            let ref_left = if pointer > 0 {
                nums2[pointer - 1] as f64
            } else {
                f64::MIN
            };

            let ref_right = if pointer < nums2.len() {
                nums2[pointer] as f64
            } else {
                f64::MAX
            };

            if base_left <= ref_right && ref_left <= base_right {
                if total % 2 == 1 {
                    return base_right.min(ref_right);
                } else {
                    return (base_left.max(ref_left) + base_right.min(ref_right)) / 2.0;
                }
            } else if base_left > ref_right {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        panic!("Arrays are not sorted");
    }
}
