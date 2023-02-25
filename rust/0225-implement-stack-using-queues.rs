use std::collections::VecDeque;

struct MyStack {
    q: VecDeque<i32>,
}

impl MyStack {
    fn new() -> Self {
        Self { q: VecDeque::new() }
    }

    fn push(&mut self, x: i32) {
        self.q.push_back(x);
    }

    fn pop(&mut self) -> i32 {
        for i in 0..self.q.len() - 1 {
            let temp = self.q.pop_front().unwrap();
            self.q.push_back(temp);
        }
        self.q.pop_front().unwrap()
    }

    fn top(&self) -> i32 {
        self.q[self.q.len() - 1]
    }

    fn empty(&self) -> bool {
        self.q.is_empty()
    }
}
