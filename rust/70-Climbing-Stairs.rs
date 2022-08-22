
impl Solution {
    pub fn climb_stairs(n: i32) -> i32 {
        if n == 1{
            return 1;
        }
        
        let (mut one, mut two) = (1, 2);

        for i in 2..n{
            let tmp = two;
            two = two + one;
            one = tmp;
        }
        
        two
    }
}