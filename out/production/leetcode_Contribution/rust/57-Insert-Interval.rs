pub fn insert(intervals: Vec<Vec<i32>>, mut new_interval: Vec<i32>) -> Vec<Vec<i32>> {
    let mut res: Vec<Vec<i32>> = Vec::new();

    for i in 0..intervals.len() {
        if new_interval[1] < intervals[i][0] {
            res.push(new_interval.clone());
            return [res, intervals[i..].to_vec()].concat().to_vec();
        } else if new_interval[0] > intervals[i][1] {
            res.push(intervals[i].clone());
        } else {
            new_interval = vec![
                new_interval[0].min(intervals[i][0]),
                new_interval[1].max(intervals[i][1]),
            ];
        }
    }

    res.push(new_interval);

    res
}
