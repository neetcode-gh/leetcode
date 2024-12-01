// BTreeSet Solution

use std::collections::BTreeSet;

struct SummaryRanges {
    tree_map: BTreeSet<i32>,
}

impl SummaryRanges {
    fn new() -> Self {
        Self {
            tree_map: BTreeSet::new(),
        }
    }

    fn add_num(&mut self, value: i32) {
        self.tree_map.insert(value);
    }

    fn get_intervals(&self) -> Vec<Vec<i32>> {
        let mut res: Vec<Vec<i32>> = vec![];

        for n in &self.tree_map {
            if !res.is_empty() && res.last().unwrap()[1] + 1 == *n {
                let mut last = res.pop().unwrap();
                last[1] = *n;
                res.push(last);
            } else {
                res.push(vec![*n, *n]);
            }
        }

        res
    }
}

// HashSet Solution
use std::collections::HashSet;
struct SummaryRanges {
    ranges: Vec<Vec<i32>>,
    num_set: HashSet<i32>,
}

impl SummaryRanges {
    fn new() -> Self {
        Self {
            ranges: vec![],
            num_set: HashSet::new(),
        }
    }

    fn add_num(&mut self, value: i32) {
        self.num_set.insert(value);
    }

    fn get_intervals(&self) -> Vec<Vec<i32>> {
        let mut nums: Vec<i32> = self.num_set.iter().cloned().collect();
        nums.sort();
        let mut res = vec![];
        let mut i = 0;

        while i < nums.len() {
            let start = nums[i];

            while i + 1 < nums.len() && nums[i] + 1 == nums[i + 1] {
                i += 1;
            }
            res.push(vec![start, nums[i]]);
            i += 1;
        }
        res
    }
}
