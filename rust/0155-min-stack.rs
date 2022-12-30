struct MinStack {
    stack: Vec<i32>,
    min_stack: Vec<i32>,
}

impl MinStack {
    fn new() -> Self {
        Self {
            stack: vec![],
            min_stack: vec![],
        }
    }

    fn push(&mut self, val: i32) {
        self.stack.push(val);
        if self.min_stack.is_empty() || Some(&val) <= self.min_stack.last() {
            self.min_stack.push(val);
        }
    }

    fn pop(&mut self) {
        let val = self.stack.pop().unwrap();
        if Some(&val) == self.min_stack.last() {
            self.min_stack.pop();
        }
    }

    fn top(&self) -> i32 {
        self.stack.last().cloned().unwrap()
    }

    fn get_min(&self) -> i32 {
        self.min_stack.last().cloned().unwrap()
    }
}


