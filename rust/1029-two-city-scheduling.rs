impl Solution {
    pub fn two_city_sched_cost(costs: Vec<Vec<i32>>) -> i32 {
        let mut costs = costs;
        costs.sort_by_key(|pair| pair[1] - pair[0]);

        let mut total_cost = 0;

        let n = costs.len() / 2;

        for i in 0..n {
            total_cost += costs[i][1] + costs[i + n][0];
        }
        total_cost
    }
}
