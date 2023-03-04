struct MyHashMap {
    buckets: Vec<Vec<(i32,i32)>>,
}

// Prime number of buckets to reduce collisions
const N_BUCKETS: usize = 1031;

impl MyHashMap {

    fn new() -> Self {
        Self{ buckets: vec![vec![]; N_BUCKETS] }
    }

    fn hash(key: i32) -> usize {
        key as usize % N_BUCKETS
    }

    fn find_entry(&mut self, key: i32) -> (&mut Vec<(i32, i32)>, Result<usize, usize>) {
        let bucket = &mut self.buckets[Self::hash(key)];
        let result = bucket.binary_search_by(|(k, v)| k.cmp(&key));
        (bucket, result)
    }
    
    fn put(&mut self, key: i32, value: i32) {
        match self.find_entry(key) {
            (bucket, Ok(index)) => bucket[index] = (key, value),
            (bucket, Err(index)) => bucket.insert(index, (key, value)),
        }
    }
    
    fn get(&self, key: i32) -> i32 {
        let bucket = &self.buckets[Self::hash(key)];
        match bucket.binary_search_by(|(k, v)| k.cmp(&key)) {
            Ok(index) => bucket[index].1,
            Err(index) => -1,
        }
    }
    
    fn remove(&mut self, key: i32) {
        match self.find_entry(key) {
            (bucket, Ok(index)) => { bucket.remove(index); },
            _ => (),
        }
    }
}