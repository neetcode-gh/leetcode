impl Solution {
    pub fn is_ugly(n: i32) -> bool {
                if n < 1 {
            return false;
        }
        let mut n = n;
        let ugly_primes = vec![2, 3, 5];

        for prime in ugly_primes {
            while n % prime == 0 {
                n /= prime;
            }
        }

        n == 1
    }
}