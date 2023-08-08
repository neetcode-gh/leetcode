https://leetcode.com/problems/kth-largest-element-in-an-array/submissions/1012381844/
  
use std::collections::BinaryHeap;
impl Solution {
    pub fn find_kth_largest(nums: Vec<i32>, k: i32) -> i32 {
        let mut heap = BinaryHeap::new();
        for &n in nums.iter() {
            if heap.len() < k as usize {
                heap.push(-n);
                continue;
            } else if -heap.peek().unwrap() < n {
                heap.pop();
                heap.push(-n);
            }
        }
        -heap.pop().unwrap()
    }
}
