mod contains_duplicate;
mod valid_anagram;
#[cfg(test)]
mod tests {
    use crate::contains_duplicate;
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
}
