use std::collections::HashMap;
struct FreqStack {
    count: HashMap<i32, i32>,
    max_count: i32,
    stacks: HashMap<i32, Vec<i32>>,
}

impl FreqStack {
    fn new() -> Self {
        Self {
            count: HashMap::new(),
            max_count: 0,
            stacks: HashMap::new(),
        }
    }

    fn push(&mut self, val: i32) {
        let val_count = 1 + *self.count.get(&val).or(Some(&0)).unwrap();
        self.count.insert(val, val_count);
        if val_count > self.max_count {
            self.max_count = val_count;
            self.stacks.insert(val_count, vec![]);
        }
        self.stacks.get_mut(&val_count).unwrap().push(val);
    }

    fn pop(&mut self) -> i32 {
        let res = self.stacks.get_mut(&self.max_count).unwrap().pop().unwrap();
        *self.count.get_mut(&res).unwrap() -= 1;
        if self.stacks.get(&self.max_count).unwrap().is_empty() {
            self.max_count -= 1;
        }
        res
    }
}
