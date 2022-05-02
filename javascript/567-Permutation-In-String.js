//////////////////////////////////////////////////////////////////////////////
// Static Sliding Window
// Time: Theta(l1 + l2) O(l1 + l2)  Space: Theta(1) O(1)
// Highest performing solution. Simply builds a map of the character counts
// for `s1` and `s1.length` of `s2`, updates the `s2` character map as it
// slides from the beginning of `s2` to the end of `s2`, and returns upon
// verifying a match between the `s1` and `s2` character maps.
//////////////////////////////////////////////////////////////////////////////

const CHARS = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ];

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
function checkInclusion(s1, s2) {
    
    if (s1.length > s2.length) {
        return false;
    }
    
    const s1Chars = buildCharsMap(s1);
    const s2Chars = buildCharsMap(s2, s1.length);
    
    let matches = 0;
    
    for (const ch of CHARS) {
        if (s1Chars[ch] === s2Chars[ch]) {
            ++matches;
        }
    }
    
    const last = s2.length - s1.length;
    
    for (let i = 0; i <= last; ++i) {
        
        if (matches === CHARS.length) {
            return true;
        }
        
        const ch1 = s2[i];
        const ch2 = s2[i + s1.length];
        
        if (s1Chars[ch1] === s2Chars[ch1]--) {
            --matches;
        } else if (s1Chars[ch1] === s2Chars[ch1]) {
            ++matches;
        }
        
        if (s1Chars[ch2] === s2Chars[ch2]++) {
            --matches;
        } else if (s1Chars[ch2] === s2Chars[ch2]) {
            ++matches;
        }
    }
    
    return matches === CHARS.length;
}

/**
 * @param {string} s
 * @param {number=} length = `s.length`
 * @return {boolean}
 */
function buildCharsMap(s, length = s.length) {
    
    const chars = Object.create(null);
    
    for (const ch of CHARS) {
        chars[ch] = 0;
    }
    
    for (let i = 0; i < length; ++i) {
        ++chars[s[i]];
    }
    
    return chars;
}

//////////////////////////////////////////////////////////////////////////////
// Optimized Backtracking
// Time: Theta(l1 + l2) O(l1 + l2^2)  Space: Theta(l1) O(l1)
// This solution passes the tests, but it is much slower than other passing
// solutions. At each possible beginning character of `s1` within `s2` a fresh
// map is created and a second pointer increments until it either matches `s1`
// or fails and moves the first and second pointer to the next available
// matching index.
//////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
function checkInclusion(s1, s2) {
    
    if (s1.length > s2.length) {
        return false;
    }
    
    const s1Chars = Object.create(null);
    
    for (const ch of s1) {
        if (!(ch in s1Chars)) {
            s1Chars[ch] = 0;
        }
        ++s1Chars[ch];
    }
    
    const last = s2.length - s1.length;
    let i = 0;
    
    while (i <= last) {
        
        while (i <= last && !(s2[i] in s1Chars)) {
            ++i;
        }
        
        if (i > last) {
            return false;
        }
        
        const subChars = Object.create(null);
        let j = i;
        
        while (j < s2.length && s2[j] in s1Chars) {
            
            const ch = s2[j];
            
            if (!(ch in subChars)) {
                subChars[ch] = 0;
            }
            ++subChars[ch];
            
            if (subChars[ch] > s1Chars[ch]) {
                break;
            }
            
            ++j;
        }
        
        if (s1.length === j - i) {
            return true;
        }
        
        if (j < s2.length && s2[j] in s1Chars) {
            while (s2[i] !== s2[j]) {
                ++i;
            }
            ++i;
        } else {
            i = j;
        }
    }
    
    return false;
}
