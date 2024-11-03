impl Solution {
    pub fn arrange_coins(n: i32) -> i32 {
        let (mut l, mut r) = (1, n);
        let mut res = 0;

        while l <= r {
            let mid = l + (r - l) / 2;
            let coins = (mid as i64 * (mid as i64 + 1)) / 2;

            if coins > n as i64 {
                r = mid - 1;
            } else {
                l = mid + 1;
                res = mid;
            }
        }

        res as i32

    }
}