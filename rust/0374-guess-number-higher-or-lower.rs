/**
 * Forward declaration of guess API.
 * @param  num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * unsafe fn guess(num: i32) -> i32 {}
 */

impl Solution {
    unsafe fn guessNumber(n: i32) -> i32 {
        Self::binary_search(1, n)
    }

    unsafe fn binary_search(left: i32, right: i32) -> i32 {
        let mid = left + (right - left ) / 2;

        if guess(mid) < 0 {
            Self::binary_search(1, mid)
        } else if guess(mid) > 0 {
            Self::binary_search(mid + 1, right)
        } else {
            mid
        }
    }
}
