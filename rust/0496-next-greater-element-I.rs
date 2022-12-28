use std::collections::HashMap;

impl Solution {
    pub fn next_greater_element(nums1: Vec<i32>, nums2: Vec<i32>) -> Vec<i32> {
        let map: HashMap<i32, usize> = nums1
            .iter()
            .cloned()
            .enumerate()
            .map(Self::reverse_tuple)
            .collect();

        let mut result = vec![0; nums1.len()];

        for (index, val) in nums2.iter().enumerate() {
            if map.contains_key(val) {
                let idx = *map.get(val).unwrap();

                let next_greater = nums2.iter().skip(index).find(|&x| x > val).unwrap_or(&-1);

                result[idx] = *next_greater;
            }
        }
        result
    }

    // O(nums1.length + nums2.length)
    pub fn other_next_greater_element(nums1: Vec<i32>, nums2: Vec<i32>) -> Vec<i32> {
        let map: HashMap<i32, usize> = nums1
            .iter()
            .cloned()
            .enumerate()
            .map(Self::reverse_tuple)
            .collect();

        let mut result = vec![-1; nums1.len()];
        let mut stack = Vec::new();

        for (_, val) in nums2.iter().enumerate() {
            while !stack.is_empty() && val > stack.last().unwrap() {
                let value = stack.pop().unwrap();
                let idx = *map.get(&value).unwrap();
                result[idx] = value;
            }
            if map.contains_key(val) {
                stack.push(*val);
            }
        }
        result
    }

    pub fn reverse_tuple<T, U>(tup: (T, U)) -> (U, T)
    where
        T: Default,
        U: Default,
    {
        let mut new_tup: (U, T) = (U::default(), T::default());
        new_tup.0 = tup.1;
        new_tup.1 = tup.0;
        new_tup
    }
}
