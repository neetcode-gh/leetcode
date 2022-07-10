mod contains_duplicate;
#[cfg(test)]
mod tests {
    use crate::contains_duplicate;

    #[test]
    fn test_containts_duplicate_1() {
        use contains_duplicate::Solution;
        let nums = vec![1, 2, 3, 1];
        assert!(Solution::contains_duplicate(nums));
    }
    #[test]
    fn test_containts_duplicate_2() {
        use contains_duplicate::Solution;
        let nums = vec![1, 2, 3, 4];
        assert!(!Solution::contains_duplicate(nums));
    }
    #[test]
    fn test_containts_duplicate_3() {
        use contains_duplicate::Solution;
        let nums = vec![1, 1, 1, 3, 3, 4, 3, 2, 4, 2];
        assert!(Solution::contains_duplicate(nums));
    }
}
