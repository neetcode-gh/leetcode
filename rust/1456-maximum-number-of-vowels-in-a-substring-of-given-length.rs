impl Solution {
    pub fn max_vowels(s: String, k: i32) -> i32 {
        let (mut top, mut count) = (i32::min_value(),0);
        let (mut i,mut j):(usize,usize) = (0,0);
        fn is_vowel(c:&u8) ->bool{
            match c {
                b'a'=> return true,
                b'e'=> return true,
                b'i'=> return true,
                b'o'=> return true,
                b'u'=> return true,
                _  => return false
            }
        }
        let s_raw = s.as_bytes();
        while j < s.len() {
            if j - i == k as usize{
                if count > top { top = count; }
                if top == k {
                    return count;
                }
                if is_vowel(&(s_raw[i])){
                    count -=1;
                }
                if is_vowel(&(s_raw[j])){
                    count +=1;
                }
                i += 1;
                j += 1;
            }
            else {
                if is_vowel(&(s_raw[j])){
                    count += 1;
                }
                j += 1;
            }
        }
        if count > top { top = count; }
        top
    }
}
