impl Solution {
    pub fn find_closest_elements(arr: Vec<i32>, k: i32, x: i32) -> Vec<i32> {
        let (mut l, mut r) = (0, arr.len() - 1);

        while r - l >= k as usize {
            if x - arr[l] <= arr[r] - x {
                r -= 1;
            } else {
                l += 1;
            }
        }

        arr[l..r + 1].to_vec()
    }
}
