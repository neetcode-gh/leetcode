impl Solution {
    pub fn car_fleet(target: i32, position: Vec<i32>, speed: Vec<i32>) -> i32 {
       let mut s: Vec<(i32, f64)> = vec![]; 

        let mut pair: Vec<(i32, f64)> = position.iter()
        .map(|&a| a)
        .zip( speed.iter().map(|&b| b as f64))
        .map(|a| (a.0, (target-a.0) as f64/a.1))
        .collect();

        pair.sort_unstable_by_key(|t| t.0);

       for car in pair.into_iter().rev(){
           if s.is_empty() || car.1 > s.last().unwrap().1 {
               s.push(car);
           }
       }
       s.len() as i32
    }
}
