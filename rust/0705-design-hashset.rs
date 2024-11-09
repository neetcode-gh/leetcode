/*
 * @lc app=leetcode id=705 lang=rust
 *
 * [705] Design HashSet
 */

use std::vec;

// @lc code=start
struct MyHashSet {
    buckets: Vec<Vec<i32>>,
    capacity: usize,
    size: usize,
    load_factor: f64,
}

/**
 * `&self` means the method takes an immutable reference.
 * If you need a mutable reference, change it to `&mut self` instead.
 */
impl MyHashSet {
    fn new() -> Self {
        Self {
            buckets: vec![Vec::new(); 8],
            capacity: 8,
            size: 0,
            load_factor: 0.75,
        }
    }

    fn hash(&self, key: i32) -> usize {
        (key % self.capacity as i32) as usize
    }

    fn add(&mut self, key: i32) {
        let index = self.hash(key);
        let bucket = &mut self.buckets[index];
        if !bucket.iter().any(|&k| k == key) {
            bucket.push(key);
            self.size += 1;
            if self.size as f64 / self.capacity as f64 > self.load_factor {
                self.resize()
            }
        }
    }

    fn remove(&mut self, key: i32) {
        let index = self.hash(key);
        let bucket = &mut self.buckets[index];
        if let Some(i) = bucket.iter().position(|&k| k == key) {
            bucket.swap_remove(i);
            self.size -= 1;
        }
    }

    fn contains(&self, key: i32) -> bool {
        let index = self.hash(key);
        let bucket = &self.buckets[index];
        bucket.iter().any(|&k| k == key)
    }

    fn resize(&mut self) {
        let new_capacity = self.capacity * 2;
        let mut new_buckets = vec![Vec::new(); new_capacity];
        for bucket in self.buckets.iter() {
            for &key in bucket.iter() {
                let new_index = (key % new_capacity as i32) as usize;
                new_buckets[new_index].push(key);
            }
        }
        self.buckets = new_buckets;
        self.capacity = new_capacity;
    }
}
// @lc code=end