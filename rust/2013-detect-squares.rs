use std::collections::HashMap;

struct DetectSquares {
    points: Vec<(i32, i32)>,
    counts: HashMap<(i32, i32), i32>
}

impl DetectSquares {

    fn new() -> Self {
        Self {
            points: vec![],
            counts: HashMap::new()
        }
    }
    
    fn add(&mut self, point: Vec<i32>) {
        let p = (point[0], point[1]);
        self.points.push(p);
        *self.counts.entry(p).or_default() += 1;
    }
    
    fn count(&self, point: Vec<i32>) -> i32 {
        let mut res = 0;
        let (px, py) = (point[0], point[1]);
        for (x, y) in self.points.iter() {
            if (py - y).abs() != (px - x).abs() || *x == px || *y == py {
                continue;
            }
            res += self.counts.get(&(*x, py)).unwrap_or(&0) * self.counts.get(&(px,*y)).unwrap_or(&0);
        }

        res
    }
}
