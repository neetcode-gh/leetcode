use std::collections::HashSet;

impl Solution {
    pub fn find_difference(nums1: Vec<i32>, nums2: Vec<i32>) -> Vec<Vec<i32>> {

    let s1: HashSet<i32> =  nums1.into_iter().collect();
    let s2: HashSet<i32> =  nums2.into_iter().collect();

    let mut r1: HashSet<i32> =  HashSet::new();
    let mut r2: HashSet<i32> =  HashSet::new();

    for n in &s1{
        if !s2.contains(n){
            r1.insert(*n);
        }
    }

    for n in &s2{
        if !s1.contains(n){
            r2.insert(*n);
        }
    }

    vec![
        r1.into_iter().collect(),   
        r2.into_iter().collect(),
    ]
  
    }
}