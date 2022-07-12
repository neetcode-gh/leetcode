mod contains_duplicate;
mod group_anagrams;
mod top_k_frequent_elements;
mod two_sum;
mod valid_anagram;

#[cfg(test)]
mod tests {
    use crate::contains_duplicate;
    use crate::group_anagrams;
    use crate::top_k_frequent_elements;
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
    #[test]
    fn test_group_anagram() {
        use group_anagrams::Solution;
        let strs: Vec<String> = vec![
            "eat".to_owned(),
            "tea".to_owned(),
            "tan".to_owned(),
            "ate".to_owned(),
            "nat".to_owned(),
            "bat".to_owned(),
        ];
        let mut solution: Vec<Vec<String>> = vec![
            vec!["bat".to_owned()],
            vec!["tan".to_owned(), "nat".to_owned()],
            vec!["eat".to_owned(), "tea".to_owned(), "ate".to_owned()],
        ];
        let mut result: Vec<Vec<String>> = Solution::group_anagrams(strs);
        result.sort_unstable();
        solution.sort_unstable();
        assert_eq!(result, solution);
    }
    #[test]
    fn test_group_anagram_empty() {
        use group_anagrams::Solution;
        let strs = vec!["".to_owned()];
        let solution = vec![vec!["".to_owned()]];
        assert_eq!(Solution::group_anagrams(strs), solution);
    }
    #[test]
    fn test_group_anagram_one_word() {
        use group_anagrams::Solution;
        let strs = vec!["a".to_owned()];
        let solution = vec![vec!["a".to_owned()]];
        assert_eq!(Solution::group_anagrams(strs), solution);
    }
    #[test]
    fn test_top_k_frequent() {
        use top_k_frequent_elements::Solution;
        let nums = vec![1, 1, 1, 2, 2, 3];
        let mut solution = Solution::top_k_frequent(nums, 2);
        solution.sort_unstable();
        assert_eq!(solution, vec![1, 2]);
    }
    #[test]
    fn test_top_k_frequent_wrong_len() {
        use top_k_frequent_elements::Solution;
        let nums = vec![1, 2];
        let mut solution = Solution::top_k_frequent(nums, 2);
        solution.sort_unstable();
        assert_eq!(solution, vec![1, 2]);
    }
}
