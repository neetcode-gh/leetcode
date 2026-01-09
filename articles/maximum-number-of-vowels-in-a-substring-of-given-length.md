## 1. Brute Force

### Intuition

The most straightforward approach is to check every possible substring of length `k`. For each starting position, count the vowels in the window and track the maximum count seen.

This works correctly but is inefficient because we recount characters for overlapping windows.

### Algorithm

1. For each starting index `i` from `0` to `n - k`:
   - Count the vowels in the substring `s[i..i+k-1]`.
   - Update the result if this count is larger.
2. Return the maximum vowel count found.

::tabs-start

```python
class Solution:
    def maxVowels(self, s: str, k: int) -> int:
        vowel = {'a', 'e', 'i', 'o', 'u'}
        res = 0

        for i in range(len(s) - k + 1):
            cnt = 0
            for j in range(i, i + k):
                cnt += 1 if s[j] in vowel else 0
            res = max(res, cnt)

        return res
```

```java
public class Solution {
    public int maxVowels(String s, int k) {
        Set<Character> vowels = Set.of('a', 'e', 'i', 'o', 'u');
        int res = 0;

        for (int i = 0; i <= s.length() - k; i++) {
            int cnt = 0;
            for (int j = i; j < i + k; j++) {
                if (vowels.contains(s.charAt(j))) {
                    cnt++;
                }
            }
            res = Math.max(res, cnt);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxVowels(string s, int k) {
        unordered_set<char> vowels = {'a', 'e', 'i', 'o', 'u'};
        int res = 0;

        for (int i = 0; i <= s.size() - k; i++) {
            int cnt = 0;
            for (int j = i; j < i + k; j++) {
                if (vowels.count(s[j])) {
                    cnt++;
                }
            }
            res = max(res, cnt);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    maxVowels(s, k) {
        const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
        let res = 0;

        for (let i = 0; i <= s.length - k; i++) {
            let cnt = 0;
            for (let j = i; j < i + k; j++) {
                if (vowels.has(s[j])) {
                    cnt++;
                }
            }
            res = Math.max(res, cnt);
        }

        return res;
    }
}
```

```go
func maxVowels(s string, k int) int {
    vowels := map[byte]bool{'a': true, 'e': true, 'i': true, 'o': true, 'u': true}
    res := 0

    for i := 0; i <= len(s)-k; i++ {
        cnt := 0
        for j := i; j < i+k; j++ {
            if vowels[s[j]] {
                cnt++
            }
        }
        if cnt > res {
            res = cnt
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun maxVowels(s: String, k: Int): Int {
        val vowels = setOf('a', 'e', 'i', 'o', 'u')
        var res = 0

        for (i in 0..s.length - k) {
            var cnt = 0
            for (j in i until i + k) {
                if (s[j] in vowels) {
                    cnt++
                }
            }
            res = maxOf(res, cnt)
        }

        return res
    }
}
```

```swift
class Solution {
    func maxVowels(_ s: String, _ k: Int) -> Int {
        let vowels: Set<Character> = ["a", "e", "i", "o", "u"]
        let chars = Array(s)
        var res = 0

        for i in 0...(chars.count - k) {
            var cnt = 0
            for j in i..<(i + k) {
                if vowels.contains(chars[j]) {
                    cnt += 1
                }
            }
            res = max(res, cnt)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## 2. Prefix Count

### Intuition

We can precompute a prefix sum array where `prefix[i]` stores the number of vowels in `s[0..i-1]`. Then, the vowel count in any window `s[i-k..i-1]` is simply `prefix[i] - prefix[i-k]`.

This allows us to answer each window query in O(1) time after O(n) preprocessing.

### Algorithm

1. Build a prefix array where `prefix[i+1] = prefix[i] + (1 if s[i] is a vowel else 0)`.
2. For each ending position `i` from `k` to `n`:
   - Calculate the vowel count as `prefix[i] - prefix[i-k]`.
   - Update the maximum.
3. Return the maximum vowel count.

::tabs-start

```python
class Solution:
    def maxVowels(self, s: str, k: int) -> int:
        vowel = {'a', 'e', 'i', 'o', 'u'}
        prefix = [0] * (len(s) + 1)
        for i in range(len(s)):
            prefix[i + 1] = prefix[i] + (1 if s[i] in vowel else 0)

        res = 0
        for i in range(k, len(s) + 1):
            res = max(res, prefix[i] - prefix[i - k])

        return res
```

```java
public class Solution {
    public int maxVowels(String s, int k) {
        Set<Character> vowels = Set.of('a', 'e', 'i', 'o', 'u');
        int[] prefix = new int[s.length() + 1];

        for (int i = 0; i < s.length(); i++) {
            prefix[i + 1] = prefix[i] + (vowels.contains(s.charAt(i)) ? 1 : 0);
        }

        int res = 0;
        for (int i = k; i <= s.length(); i++) {
            res = Math.max(res, prefix[i] - prefix[i - k]);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxVowels(string s, int k) {
        unordered_set<char> vowels = {'a', 'e', 'i', 'o', 'u'};
        vector<int> prefix(s.size() + 1, 0);

        for (int i = 0; i < s.size(); i++) {
            prefix[i + 1] = prefix[i] + (vowels.count(s[i]) ? 1 : 0);
        }

        int res = 0;
        for (int i = k; i <= s.size(); i++) {
            res = max(res, prefix[i] - prefix[i - k]);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    maxVowels(s, k) {
        const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
        const prefix = new Array(s.length + 1).fill(0);

        for (let i = 0; i < s.length; i++) {
            prefix[i + 1] = prefix[i] + (vowels.has(s[i]) ? 1 : 0);
        }

        let res = 0;
        for (let i = k; i <= s.length; i++) {
            res = Math.max(res, prefix[i] - prefix[i - k]);
        }

        return res;
    }
}
```

```go
func maxVowels(s string, k int) int {
    vowels := map[byte]bool{'a': true, 'e': true, 'i': true, 'o': true, 'u': true}
    prefix := make([]int, len(s)+1)

    for i := 0; i < len(s); i++ {
        if vowels[s[i]] {
            prefix[i+1] = prefix[i] + 1
        } else {
            prefix[i+1] = prefix[i]
        }
    }

    res := 0
    for i := k; i <= len(s); i++ {
        if prefix[i]-prefix[i-k] > res {
            res = prefix[i] - prefix[i-k]
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun maxVowels(s: String, k: Int): Int {
        val vowels = setOf('a', 'e', 'i', 'o', 'u')
        val prefix = IntArray(s.length + 1)

        for (i in s.indices) {
            prefix[i + 1] = prefix[i] + if (s[i] in vowels) 1 else 0
        }

        var res = 0
        for (i in k..s.length) {
            res = maxOf(res, prefix[i] - prefix[i - k])
        }

        return res
    }
}
```

```swift
class Solution {
    func maxVowels(_ s: String, _ k: Int) -> Int {
        let vowels: Set<Character> = ["a", "e", "i", "o", "u"]
        let chars = Array(s)
        var prefix = [Int](repeating: 0, count: chars.count + 1)

        for i in 0..<chars.count {
            prefix[i + 1] = prefix[i] + (vowels.contains(chars[i]) ? 1 : 0)
        }

        var res = 0
        for i in k...chars.count {
            res = max(res, prefix[i] - prefix[i - k])
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Sliding Window

### Intuition

Instead of storing prefix sums, we can maintain a running count of vowels in the current window. As we slide the window right:
- Add `1` if the new character entering the window is a vowel.
- Subtract `1` if the character leaving the window is a vowel.

This gives us O(n) time with O(1) extra space.

### Algorithm

1. Initialize a vowel count `cnt` and result `res` to `0`.
2. Use two pointers: `l` (left) starts at `0`, `r` (right) iterates through the string.
3. For each character at `r`:
   - If it is a vowel, increment `cnt`.
   - If the window size exceeds `k`, check if `s[l]` is a vowel and decrement `cnt` if so, then increment `l`.
   - Update `res` with the maximum of `res` and `cnt`.
4. Return `res`.

::tabs-start

```python
class Solution:
    def maxVowels(self, s: str, k: int) -> int:
        vowel = {'a', 'e', 'i', 'o', 'u'}

        l = cnt = res = 0
        for r in range(len(s)):
            cnt += 1 if s[r] in vowel else 0
            if r - l + 1 > k:
                cnt -= 1 if s[l] in vowel else 0
                l += 1
            res = max(res, cnt)
        return res
```

```java
public class Solution {
    public int maxVowels(String s, int k) {
        Set<Character> vowels = Set.of('a', 'e', 'i', 'o', 'u');

        int l = 0, cnt = 0, res = 0;
        for (int r = 0; r < s.length(); r++) {
            cnt += (vowels.contains(s.charAt(r)) ? 1 : 0);
            if (r - l + 1 > k) {
                cnt -= (vowels.contains(s.charAt(l)) ? 1 : 0);
                l++;
            }
            res = Math.max(res, cnt);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxVowels(string s, int k) {
        unordered_set<char> vowels = {'a', 'e', 'i', 'o', 'u'};

        int l = 0, cnt = 0, res = 0;
        for (int r = 0; r < s.length(); r++) {
            cnt += (vowels.count(s[r]) ? 1 : 0);
            if (r - l + 1 > k) {
                cnt -= (vowels.count(s[l++]) ? 1 : 0);
            }
            res = max(res, cnt);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    maxVowels(s, k) {
        const vowels = new Set(['a', 'e', 'i', 'o', 'u']);

        let l = 0,
            cnt = 0,
            res = 0;
        for (let r = 0; r < s.length; r++) {
            cnt += vowels.has(s[r]) ? 1 : 0;
            if (r - l + 1 > k) {
                cnt -= vowels.has(s[l++]) ? 1 : 0;
            }
            res = Math.max(res, cnt);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 4. Sliding Window (Bit Mask)

### Intuition

Checking if a character is a vowel using a set or string comparison can be optimized using a bitmask. We assign each letter a bit position (a=0, b=1, ..., z=25). The vowels form a constant bitmask. Checking if a character is a vowel becomes a single bitwise operation.

This is a micro-optimization but can improve cache performance and avoid hash lookups.

### Algorithm

1. Create a bitmask with bits set for vowel positions: `mask = (1 << 0) | (1 << 4) | (1 << 8) | (1 << 14) | (1 << 20)` for `a`, `e`, `i`, `o`, `u`.
2. To check if character `c` is a vowel: `(mask >> (c - 'a')) & 1`.
3. Apply the same sliding window logic as before, using the bitmask for vowel checks.
4. Return the maximum vowel count.

::tabs-start

```python
class Solution:
    def maxVowels(self, s: str, k: int) -> int:
        def getId(c):
            return ord(c) - ord('a')

        mask = (1 << getId('a')) | (1 << getId('e')) | \
               (1 << getId('i')) | (1 << getId('o')) | \
               (1 << getId('u'))

        l = cnt = res = 0
        for r in range(len(s)):
            cnt += ((mask >> getId(s[r])) & 1)
            if r - l + 1 > k:
                cnt -= ((mask >> getId(s[l])) & 1)
                l += 1
            res = max(res, cnt)
        return res
```

```java
public class Solution {
    public int maxVowels(String s, int k) {
        int mask = (1 << ('a' - 'a')) | (1 << ('e' - 'a')) |
                   (1 << ('i' - 'a')) | (1 << ('o' - 'a')) |
                   (1 << ('u' - 'a'));

        int l = 0, cnt = 0, res = 0;
        for (int r = 0; r < s.length(); r++) {
            cnt += (mask >> (s.charAt(r) - 'a')) & 1;
            if (r - l + 1 > k) {
                cnt -= (mask >> (s.charAt(l) - 'a')) & 1;
                l++;
            }
            res = Math.max(res, cnt);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxVowels(string s, int k) {
        int mask = (1 << ('a' - 'a')) | (1 << ('e' - 'a')) |
                   (1 << ('i' - 'a')) | (1 << ('o' - 'a')) |
                   (1 << ('u' - 'a'));

        int l = 0, cnt = 0, res = 0;
        for (int r = 0; r < s.size(); r++) {
            cnt += (mask >> (s[r] - 'a')) & 1;
            if (r - l + 1 > k) {
                cnt -= (mask >> (s[l] - 'a')) & 1;
                l++;
            }
            res = max(res, cnt);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    maxVowels(s, k) {
        const getId = (c) => {
            return c.charCodeAt(0) - 'a'.charCodeAt(0);
        };
        const mask =
            (1 << getId('a')) |
            (1 << getId('e')) |
            (1 << getId('i')) |
            (1 << getId('o')) |
            (1 << getId('u'));

        let l = 0,
            cnt = 0,
            res = 0;
        for (let r = 0; r < s.length; r++) {
            cnt += (mask >> getId(s.charAt(r))) & 1;
            if (r - l + 1 > k) {
                cnt -= (mask >> getId(s.charAt(l))) & 1;
                l++;
            }
            res = Math.max(res, cnt);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
