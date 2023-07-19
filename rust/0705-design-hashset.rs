
/*
 * @lc app=leetcode id=705 lang=rust
 *
 * [705] Design HashSet
 */

// @lc code=start
struct MyHashSet {
    data: Vec<Vec<i32>>
}


/** 
 * `&self` means the method takes an immutable reference.
 * If you need a mutable reference, change it to `&mut self` instead.
 */
const BUCKETS: usize = 1000;
impl MyHashSet {

    fn new() -> Self {
        let mut data = Vec::with_capacity(BUCKETS);
        for _ in 0..BUCKETS {
            data.push(Vec::new());
        }
        Self {data}
    }
    
    fn add(&mut self, key: i32) {
        // Call the hash method to find the bucket index
        let index = self.hash(key);

        // Get a mutable reference to the bucket
        let bucket = &mut self.data[index];

        // Iterate over the bucket and check if the key already exists
        for &k in bucket {
            if k == key {
                // If yes, do nothing and return
                return;
            }
        }

        // If not, push the key to the end of the bucket
        bucket.push(key);
    }

    fn remove(&self, key: i32) {
        
    }
    
    fn contains(&self, key: i32) -> bool {
        return true
    }

    fn hash(&self, key: i32) -> usize {
        (key % BUCKETS as i32) as usize
    }
}

/**
 * Your MyHashSet object will be instantiated and called as such:
 * let obj = MyHashSet::new();
 * obj.add(key);
 * obj.remove(key);
 * let ret_3: bool = obj.contains(key);
 */
// @lc code=end
fn main() {
    let mut set = MyHashSet::new();

    // Print the data field of the set
    println!("set.data = {:?}", set.data);

    // Add some keys to the set
    set.add(1);
    set.add(2);
    set.add(3);
    set.add(4);

    // Print the data field of the set again
    println!("set.data = {:?}", set.data);
}
