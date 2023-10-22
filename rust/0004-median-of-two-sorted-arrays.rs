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
