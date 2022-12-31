impl Solution {
    pub fn longest_common_prefix(strs: Vec<String>) -> String {
        if strs.is_empty() {
            return "".to_owned();
        }

        let mut common_prefix: Vec<u8> = strs[0].as_bytes().to_vec();

        for s in &strs[1..strs.len()] {
            let len = s.len();
            if len < common_prefix.len() {
                common_prefix = common_prefix[..len].to_vec();
            }
            for i in 0..len {
                if let Some(c) = s.as_bytes().get(i) {
                    if let Some(p) = common_prefix.get(i) {
                        if c != p {
                            common_prefix = common_prefix[..i].to_vec();
                        }
                    } else {
                        break;
                    }
                }
            }
        }
        common_prefix.into_iter().map(|s| s as char).collect()
    }
}
