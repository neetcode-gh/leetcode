## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## 2. Prefix Count

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Sliding Window

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
