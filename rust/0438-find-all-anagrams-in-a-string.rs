use std::ops::{Index, IndexMut};
struct CharVec(Vec<i32>);

impl CharVec {
    fn new() -> Self {
        Self(vec![0; 26])
    }
}

impl Index<char> for CharVec {
    type Output = i32;
    fn index(&self, index: char) -> &Self::Output {
        match index {
            'a'..='z' => &self.0[(index as u8 - 'a' as u8) as usize],
            _ => panic!("[!!] {} character is not supported in CharVec", index),
        }
    }
}

impl IndexMut<char> for CharVec {
    fn index_mut(&mut self, index: char) -> &mut Self::Output {
        match index {
            'a'..='z' => &mut self.0[(index as u8 - 'a' as u8) as usize],
            _ => panic!("[!!] {} character is not supported in CharVec", index),
        }
    }
}

impl Eq for CharVec {}

impl PartialEq for CharVec {
    fn eq(&self, other: &Self) -> bool {
        self.0.eq(&other.0)
    }
}

impl Solution {
    pub fn find_anagrams(s: String, p: String) -> Vec<i32> {
        let (s_len, p_len) = (s.len(), p.len());
        let mut ans = vec![];
        if s_len < p_len {
            return ans;
        }
        let mut freq_s = CharVec::new();
        let mut freq_p = CharVec::new();
        let s = s.chars().collect::<Vec<char>>();
        let p = p.chars().collect::<Vec<char>>();
        for i in 0..p_len {
            freq_s[s[i]] += 1;
            freq_p[p[i]] += 1;
        }
        if freq_s == freq_p {
            ans.push(0);
        }
        /* sliding window with of length p_len */
        for i in p_len..s_len {
            freq_s[s[i - p_len]] -= 1;
            freq_s[s[i]] += 1;
            if freq_s == freq_p {
                ans.push((i - p_len + 1) as i32);
            }
        }
        ans
    }
}
