mod contains_duplicate;
mod two_sum;
mod valid_anagram;
#[cfg(test)]
mod tests {
    use crate::contains_duplicate;
    use crate::two_sum;
    use crate::valid_anagram;

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
    #[test]
    fn test_is_anagram() {
        use valid_anagram::Solution;
        let s = "anagram".to_string();
        let t = "nagaram".to_string();
        assert!(Solution::is_anagram(s, t));
    }
    #[test]
    fn test_is_not_anagram() {
        use valid_anagram::Solution;
        let s = "rat".to_string();
        let t = "car".to_string();
        assert!(!Solution::is_anagram(s, t));
    }
    #[test]
    fn test_is_not_anagram_short_word() {
        use valid_anagram::Solution;
        let s = "a".to_string();
        let t = "ab".to_string();
        assert!(!Solution::is_anagram(s, t));
    }
    #[test]
    fn test_two_sum() {
        use two_sum::Solution;
        assert_eq!(
            Solution::two_sum([2, 7, 11, 15].to_vec(), 9),
            [0, 1].to_vec()
        );
    }
    #[test]
    fn test_two_sum_same_number() {
        use two_sum::Solution;
        assert_eq!(Solution::two_sum([3, 2, 4].to_vec(), 6), [1, 2].to_vec());
    }
}
