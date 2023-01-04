use std::collections::HashMap;

impl Solution {
    pub fn is_isomorphic(s: String, t: String) -> bool {
        let (mut map_s_to_t, mut map_t_to_s) = (HashMap::new(), HashMap::new());

        for (c1, c2) in s.chars().zip(t.chars()) {
            if (map_s_to_t.contains_key(&c1) && map_s_to_t.get(&c1) != Some(&c2))
                || (map_t_to_s.contains_key(&c2) && map_t_to_s.get(&c2) != Some(&c1))
            {
                return false;
            }

            map_s_to_t.insert(c1, c2);
            map_t_to_s.insert(c2, c1);
        }

        true
    }
}