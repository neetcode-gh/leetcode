## 1. Hash Map

::tabs-start

```python
class Solution:
    def longestPalindrome(self, s: str) -> int:
        count = defaultdict(int)
        res = 0

        for c in s:
            count[c] += 1
            if count[c] % 2 == 0:
                res += 2

        for cnt in count.values():
            if cnt % 2:
                res += 1
                break

        return res
```

```java
public class Solution {
    public int longestPalindrome(String s) {
        Map<Character, Integer> count = new HashMap<>();
        int res = 0;

        for (char c : s.toCharArray()) {
            count.put(c, count.getOrDefault(c, 0) + 1);
            if (count.get(c) % 2 == 0) {
                res += 2;
            }
        }

        for (int cnt : count.values()) {
            if (cnt % 2 == 1) {
                res += 1;
                break;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int longestPalindrome(string s) {
        unordered_map<char, int> count;
        int res = 0;

        for (char c : s) {
            count[c]++;
            if (count[c] % 2 == 0) {
                res += 2;
            }
        }

        for (auto& [ch, cnt] : count) {
            if (cnt % 2 == 1) {
                res += 1;
                break;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    longestPalindrome(s) {
        const count = {};
        let res = 0;

        for (let c of s) {
            count[c] = (count[c] || 0) + 1;
            if (count[c] % 2 === 0) {
                res += 2;
            }
        }

        for (let key in count) {
            if (count[key] % 2 === 1) {
                res += 1;
                break;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int LongestPalindrome(string s) {
        var count = new Dictionary<char, int>();
        int res = 0;

        foreach (char c in s) {
            if (!count.ContainsKey(c)) {
                count[c] = 0;
            }
            count[c]++;
            if (count[c] % 2 == 0) {
                res += 2;
            }
        }

        foreach (int cnt in count.Values) {
            if (cnt % 2 == 1) {
                res += 1;
                break;
            }
        }

        return res;
    }
}
```

```go
func longestPalindrome(s string) int {
    count := make(map[rune]int)
    res := 0

    for _, c := range s {
        count[c]++
        if count[c]%2 == 0 {
            res += 2
        }
    }

    for _, cnt := range count {
        if cnt%2 == 1 {
            res++
            break
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun longestPalindrome(s: String): Int {
        val count = mutableMapOf<Char, Int>()
        var res = 0

        for (c in s) {
            count[c] = count.getOrDefault(c, 0) + 1
            if (count[c]!! % 2 == 0) {
                res += 2
            }
        }

        for (cnt in count.values) {
            if (cnt % 2 == 1) {
                res += 1
                break
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func longestPalindrome(_ s: String) -> Int {
        var count = [Character: Int]()
        var res = 0

        for c in s {
            count[c, default: 0] += 1
            if count[c]! % 2 == 0 {
                res += 2
            }
        }

        for cnt in count.values {
            if cnt % 2 == 1 {
                res += 1
                break
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(m)$

> Where $n$ is the length of the given string, and $m$ is the number of distinct characters in the string.

---

## 2. Hash Map (Optimal)

::tabs-start

```python
class Solution:
    def longestPalindrome(self, s: str) -> int:
        count = defaultdict(int)
        res = 0

        for c in s:
            count[c] += 1
            if count[c] % 2 == 0:
                res += 2

        return res + (res < len(s))
```

```java
public class Solution {
    public int longestPalindrome(String s) {
        Map<Character, Integer> count = new HashMap<>();
        int res = 0;

        for (char c : s.toCharArray()) {
            count.put(c, count.getOrDefault(c, 0) + 1);
            if (count.get(c) % 2 == 0) {
                res += 2;
            }
        }

        return res + (res < s.length() ? 1 : 0);
    }
}
```

```cpp
class Solution {
public:
    int longestPalindrome(string s) {
        unordered_map<char, int> count;
        int res = 0;

        for (char c : s) {
            count[c]++;
            if (count[c] % 2 == 0) {
                res += 2;
            }
        }

        return res + (res < s.size());
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    longestPalindrome(s) {
        const count = {};
        let res = 0;

        for (let c of s) {
            count[c] = (count[c] || 0) + 1;
            if (count[c] % 2 === 0) {
                res += 2;
            }
        }

        return res + (res < s.length ? 1 : 0);
    }
}
```

```csharp
public class Solution {
    public int LongestPalindrome(string s) {
        var count = new Dictionary<char, int>();
        int res = 0;

        foreach (char c in s) {
            if (!count.ContainsKey(c)) {
                count[c] = 0;
            }
            count[c]++;
            if (count[c] % 2 == 0) {
                res += 2;
            }
        }

        return res + (res < s.Length ? 1 : 0);
    }
}
```

```go
func longestPalindrome(s string) int {
    count := make(map[rune]int)
    res := 0

    for _, c := range s {
        count[c]++
        if count[c]%2 == 0 {
            res += 2
        }
    }

    if res < len(s) {
        return res + 1
    }
    return res
}
```

```kotlin
class Solution {
    fun longestPalindrome(s: String): Int {
        val count = mutableMapOf<Char, Int>()
        var res = 0

        for (c in s) {
            count[c] = count.getOrDefault(c, 0) + 1
            if (count[c]!! % 2 == 0) {
                res += 2
            }
        }

        return res + if (res < s.length) 1 else 0
    }
}
```

```swift
class Solution {
    func longestPalindrome(_ s: String) -> Int {
        var count = [Character: Int]()
        var res = 0

        for c in s {
            count[c, default: 0] += 1
            if count[c]! % 2 == 0 {
                res += 2
            }
        }

        return res + (res < s.count ? 1 : 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(m)$

> Where $n$ is the length of the given string, and $m$ is the number of distinct characters in the string.

---

## 3. Hash Set

::tabs-start

```python
class Solution:
    def longestPalindrome(self, s: str) -> int:
        seen = set()
        res = 0

        for c in s:
            if c in seen:
                seen.remove(c)
                res += 2
            else:
                seen.add(c)

        return res + 1 if seen else res
```

```java
public class Solution {
    public int longestPalindrome(String s) {
        Set<Character> seen = new HashSet<>();
        int res = 0;

        for (char c : s.toCharArray()) {
            if (seen.contains(c)) {
                seen.remove(c);
                res += 2;
            } else {
                seen.add(c);
            }
        }

        return seen.isEmpty() ? res : res + 1;
    }
}
```

```cpp
class Solution {
public:
    int longestPalindrome(string s) {
        unordered_set<char> seen;
        int res = 0;

        for (char c : s) {
            if (seen.count(c)) {
                seen.erase(c);
                res += 2;
            } else {
                seen.insert(c);
            }
        }

        return seen.empty() ? res : res + 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    longestPalindrome(s) {
        const seen = new Set();
        let res = 0;

        for (let c of s) {
            if (seen.has(c)) {
                seen.delete(c);
                res += 2;
            } else {
                seen.add(c);
            }
        }

        return seen.size === 0 ? res : res + 1;
    }
}
```

```csharp
public class Solution {
    public int LongestPalindrome(string s) {
        var seen = new HashSet<char>();
        int res = 0;

        foreach (char c in s) {
            if (seen.Contains(c)) {
                seen.Remove(c);
                res += 2;
            } else {
                seen.Add(c);
            }
        }

        return seen.Count == 0 ? res : res + 1;
    }
}
```

```go
func longestPalindrome(s string) int {
    seen := make(map[rune]bool)
    res := 0

    for _, c := range s {
        if seen[c] {
            delete(seen, c)
            res += 2
        } else {
            seen[c] = true
        }
    }

    if len(seen) == 0 {
        return res
    }
    return res + 1
}
```

```kotlin
class Solution {
    fun longestPalindrome(s: String): Int {
        val seen = mutableSetOf<Char>()
        var res = 0

        for (c in s) {
            if (c in seen) {
                seen.remove(c)
                res += 2
            } else {
                seen.add(c)
            }
        }

        return if (seen.isEmpty()) res else res + 1
    }
}
```

```swift
class Solution {
    func longestPalindrome(_ s: String) -> Int {
        var seen = Set<Character>()
        var res = 0

        for c in s {
            if seen.contains(c) {
                seen.remove(c)
                res += 2
            } else {
                seen.insert(c)
            }
        }

        return seen.isEmpty ? res : res + 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(m)$

> Where $n$ is the length of the given string, and $m$ is the number of distinct characters in the string.

---

## 4. Bitmask

::tabs-start

```python
class Solution:
    def longestPalindrome(self, s: str) -> int:
        mask1 = 0  # [a - z]
        mask2 = 0  # [A - Z]
        res = 0

        for c in s:
            if 'a' <= c <= 'z':
                bit = 1 << (ord(c) - ord('a'))
                if mask1 & bit:
                    res += 2
                mask1 ^= bit
            else:
                bit = 1 << (ord(c) - ord('A'))
                if mask2 & bit:
                    res += 2
                mask2 ^= bit

        return res + 1 if mask1 or mask2 else res
```

```java
public class Solution {
    public int longestPalindrome(String s) {
        int mask1 = 0; // [a - z]
        int mask2 = 0; // [A - Z]
        int res = 0;

        for (char c : s.toCharArray()) {
            if (c >= 'a' && c <= 'z') {
                int bit = 1 << (c - 'a');
                if ((mask1 & bit) != 0) {
                    res += 2;
                }
                mask1 ^= bit;
            } else {
                int bit = 1 << (c - 'A');
                if ((mask2 & bit) != 0) {
                    res += 2;
                }
                mask2 ^= bit;
            }
        }

        return (mask1 != 0 || mask2 != 0) ? res + 1 : res;
    }
}
```

```cpp
class Solution {
public:
    int longestPalindrome(string s) {
        int mask1 = 0; // [a - z]
        int mask2 = 0; // [A - Z]
        int res = 0;

        for (char c : s) {
            if ('a' <= c && c <= 'z') {
                int bit = 1 << (c - 'a');
                if (mask1 & bit) {
                    res += 2;
                }
                mask1 ^= bit;
            } else {
                int bit = 1 << (c - 'A');
                if (mask2 & bit) {
                    res += 2;
                }
                mask2 ^= bit;
            }
        }

        return (mask1 || mask2) ? res + 1 : res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    longestPalindrome(s) {
        let mask1 = 0; // [a - z]
        let mask2 = 0; // [A - Z]
        let res = 0;

        for (let c of s) {
            if (c >= 'a' && c <= 'z') {
                let bit = 1 << (c.charCodeAt(0) - 97);
                if (mask1 & bit) {
                    res += 2;
                }
                mask1 ^= bit;
            } else {
                let bit = 1 << (c.charCodeAt(0) - 65);
                if (mask2 & bit) {
                    res += 2;
                }
                mask2 ^= bit;
            }
        }

        return mask1 || mask2 ? res + 1 : res;
    }
}
```

```csharp
public class Solution {
    public int LongestPalindrome(string s) {
        int mask1 = 0; // [a - z]
        int mask2 = 0; // [A - Z]
        int res = 0;

        foreach (char c in s) {
            if (c >= 'a' && c <= 'z') {
                int bit = 1 << (c - 'a');
                if ((mask1 & bit) != 0) {
                    res += 2;
                }
                mask1 ^= bit;
            } else {
                int bit = 1 << (c - 'A');
                if ((mask2 & bit) != 0) {
                    res += 2;
                }
                mask2 ^= bit;
            }
        }

        return (mask1 != 0 || mask2 != 0) ? res + 1 : res;
    }
}
```

```go
func longestPalindrome(s string) int {
    mask1 := 0 // [a - z]
    mask2 := 0 // [A - Z]
    res := 0

    for _, c := range s {
        if c >= 'a' && c <= 'z' {
            bit := 1 << (c - 'a')
            if mask1&bit != 0 {
                res += 2
            }
            mask1 ^= bit
        } else {
            bit := 1 << (c - 'A')
            if mask2&bit != 0 {
                res += 2
            }
            mask2 ^= bit
        }
    }

    if mask1 != 0 || mask2 != 0 {
        return res + 1
    }
    return res
}
```

```kotlin
class Solution {
    fun longestPalindrome(s: String): Int {
        var mask1 = 0 // [a - z]
        var mask2 = 0 // [A - Z]
        var res = 0

        for (c in s) {
            if (c in 'a'..'z') {
                val bit = 1 shl (c - 'a')
                if (mask1 and bit != 0) {
                    res += 2
                }
                mask1 = mask1 xor bit
            } else {
                val bit = 1 shl (c - 'A')
                if (mask2 and bit != 0) {
                    res += 2
                }
                mask2 = mask2 xor bit
            }
        }

        return if (mask1 != 0 || mask2 != 0) res + 1 else res
    }
}
```

```swift
class Solution {
    func longestPalindrome(_ s: String) -> Int {
        var mask1 = 0 // [a - z]
        var mask2 = 0 // [A - Z]
        var res = 0

        for c in s {
            let asciiValue = Int(c.asciiValue!)
            if c >= "a" && c <= "z" {
                let bit = 1 << (asciiValue - 97)
                if mask1 & bit != 0 {
                    res += 2
                }
                mask1 ^= bit
            } else {
                let bit = 1 << (asciiValue - 65)
                if mask2 & bit != 0 {
                    res += 2
                }
                mask2 ^= bit
            }
        }

        return (mask1 != 0 || mask2 != 0) ? res + 1 : res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
