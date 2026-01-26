## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Sliding Window Technique** - Essential for efficiently finding the longest valid substring without rechecking overlapping portions
- **Hash Map / Dictionary** - Used to track character frequencies within the current window and count distinct characters
- **Two Pointers** - The sliding window is implemented using left and right pointers to define window boundaries

---

## 1. Brute Force

### Intuition

The most direct approach is to examine every possible substring and check if it contains at most two distinct characters. For each starting position, we extend the substring character by character, tracking the distinct characters seen. Once we see a third distinct character, we stop and record the maximum valid length found.

### Algorithm

1. Initialize `res = 0` to store the maximum length.
2. For each starting index `i` from `0` to `n-1`:
   - Create a set `seen` to track distinct characters.
   - Initialize `curLen = 0`.
   - For each ending index `j` from `i` to `n-1`:
     - Add `s[j]` to the set.
     - If the set size exceeds `2`, break out of the inner loop.
     - Otherwise, increment `curLen`.
   - Update `res = max(res, curLen)`.
3. Return `res`.

::tabs-start

```python
class Solution:
    def lengthOfLongestSubstringTwoDistinct(self, s: str) -> int:
        res, n = 0, len(s)

        for i in range(n):
            seen = set()
            cnt = curLen = 0
            for j in range(i, n):
                seen.add(s[j])
                if len(seen) > 2:
                    break
                curLen += 1
            res = max(res, curLen)

        return res
```

```java
public class Solution {
    public int lengthOfLongestSubstringTwoDistinct(String s) {
        int res = 0, n = s.length();

        for (int i = 0; i < n; i++) {
            Set<Character> seen = new HashSet<>();
            int curLen = 0;
            for (int j = i; j < n; j++) {
                seen.add(s.charAt(j));
                if (seen.size() > 2) {
                    break;
                }
                curLen++;
            }
            res = Math.max(res, curLen);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int lengthOfLongestSubstringTwoDistinct(string s) {
        int res = 0, n = s.size();

        for (int i = 0; i < n; i++) {
            unordered_set<char> seen;
            int curLen = 0;
            for (int j = i; j < n; j++) {
                seen.insert(s[j]);
                if (seen.size() > 2) {
                    break;
                }
                curLen++;
            }
            res = max(res, curLen);
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
    lengthOfLongestSubstringTwoDistinct(s) {
        let res = 0, n = s.length;

        for (let i = 0; i < n; i++) {
            let seen = new Set();
            let curLen = 0;
            for (let j = i; j < n; j++) {
                seen.add(s[j]);
                if (seen.size > 2) {
                    break;
                }
                curLen++;
            }
            res = Math.max(res, curLen);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int LengthOfLongestSubstringTwoDistinct(string s) {
        int res = 0, n = s.Length;

        for (int i = 0; i < n; i++) {
            HashSet<char> seen = new HashSet<char>();
            int curLen = 0;
            for (int j = i; j < n; j++) {
                seen.Add(s[j]);
                if (seen.Count > 2) {
                    break;
                }
                curLen++;
            }
            res = Math.Max(res, curLen);
        }
        return res;
    }
}
```

```go
func lengthOfLongestSubstringTwoDistinct(s string) int {
    res, n := 0, len(s)

    for i := 0; i < n; i++ {
        seen := make(map[byte]bool)
        curLen := 0
        for j := i; j < n; j++ {
            seen[s[j]] = true
            if len(seen) > 2 {
                break
            }
            curLen++
        }
        if curLen > res {
            res = curLen
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun lengthOfLongestSubstringTwoDistinct(s: String): Int {
        var res = 0
        val n = s.length

        for (i in 0 until n) {
            val seen = HashSet<Char>()
            var curLen = 0
            for (j in i until n) {
                seen.add(s[j])
                if (seen.size > 2) {
                    break
                }
                curLen++
            }
            res = maxOf(res, curLen)
        }
        return res
    }
}
```

```swift
class Solution {
    func lengthOfLongestSubstringTwoDistinct(_ s: String) -> Int {
        let chars = Array(s)
        var res = 0
        let n = chars.count

        for i in 0..<n {
            var seen = Set<Character>()
            var curLen = 0
            for j in i..<n {
                seen.insert(chars[j])
                if seen.count > 2 {
                    break
                }
                curLen += 1
            }
            res = max(res, curLen)
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(1)$ since we have at most $52$ different characters.

---

## 2. Sliding Window

### Intuition

We maintain a window that always contains at most two distinct characters. As we expand the window to the right, we track character frequencies in a hash map. When adding a new character causes us to have more than two distinct characters, we shrink the window from the left until we're back to two or fewer distinct characters.

### Algorithm

1. Initialize `res = 0`, `j = 0` (left pointer), and a hash map `seen` for character counts.
2. For each `i` (right pointer) from `0` to `n-1`:
   - Increment the count of `s[i]` in the map.
   - While the map contains more than `2` distinct characters:
     - Decrement the count of `s[j]`.
     - If the count reaches `0`, remove `s[j]` from the map.
     - Increment `j`.
   - Update `res = max(res, i - j + 1)`.
3. Return `res`.

::tabs-start

```python
class Solution:
    def lengthOfLongestSubstringTwoDistinct(self, s: str) -> int:
        res, n = 0, len(s)
        seen = defaultdict(int)
        j = 0

        for i in range(n):
            seen[s[i]] += 1
            while len(seen) > 2:
                seen[s[j]] -= 1
                if seen[s[j]] == 0:
                    seen.pop(s[j])
                j += 1
            res = max(res, i - j + 1)
        return res
```

```java
public class Solution {
    public int lengthOfLongestSubstringTwoDistinct(String s) {
        int res = 0, n = s.length();
        Map<Character, Integer> seen = new HashMap<>();
        int j = 0;

        for (int i = 0; i < n; i++) {
            seen.put(s.charAt(i), seen.getOrDefault(s.charAt(i), 0) + 1);

            while (seen.size() > 2) {
                char c = s.charAt(j);
                seen.put(c, seen.get(c) - 1);
                if (seen.get(c) == 0) {
                    seen.remove(c);
                }
                j++;
            }
            res = Math.max(res, i - j + 1);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int lengthOfLongestSubstringTwoDistinct(string s) {
        int res = 0, n = s.size();
        unordered_map<char, int> seen;
        int j = 0;

        for (int i = 0; i < n; i++) {
            seen[s[i]]++;

            while (seen.size() > 2) {
                char c = s[j];
                seen[c]--;
                if (seen[c] == 0) {
                    seen.erase(c);
                }
                j++;
            }
            res = max(res, i - j + 1);
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
    lengthOfLongestSubstringTwoDistinct(s) {
        let res = 0, n = s.length;
        let seen = new Map();
        let j = 0;

        for (let i = 0; i < n; i++) {
            seen.set(s[i], (seen.get(s[i]) || 0) + 1);

            while (seen.size > 2) {
                let c = s[j];
                seen.set(c, seen.get(c) - 1);
                if (seen.get(c) === 0) {
                    seen.delete(c);
                }
                j++;
            }
            res = Math.max(res, i - j + 1);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int LengthOfLongestSubstringTwoDistinct(string s) {
        int res = 0, n = s.Length;
        Dictionary<char, int> seen = new Dictionary<char, int>();
        int j = 0;

        for (int i = 0; i < n; i++) {
            if (!seen.ContainsKey(s[i])) {
                seen[s[i]] = 0;
            }
            seen[s[i]]++;

            while (seen.Count > 2) {
                char c = s[j];
                seen[c]--;
                if (seen[c] == 0) {
                    seen.Remove(c);
                }
                j++;
            }
            res = Math.Max(res, i - j + 1);
        }
        return res;
    }
}
```

```go
func lengthOfLongestSubstringTwoDistinct(s string) int {
    res, n := 0, len(s)
    seen := make(map[byte]int)
    j := 0

    for i := 0; i < n; i++ {
        seen[s[i]]++

        for len(seen) > 2 {
            c := s[j]
            seen[c]--
            if seen[c] == 0 {
                delete(seen, c)
            }
            j++
        }
        if i-j+1 > res {
            res = i - j + 1
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun lengthOfLongestSubstringTwoDistinct(s: String): Int {
        var res = 0
        val n = s.length
        val seen = HashMap<Char, Int>()
        var j = 0

        for (i in 0 until n) {
            seen[s[i]] = seen.getOrDefault(s[i], 0) + 1

            while (seen.size > 2) {
                val c = s[j]
                seen[c] = seen[c]!! - 1
                if (seen[c] == 0) {
                    seen.remove(c)
                }
                j++
            }
            res = maxOf(res, i - j + 1)
        }
        return res
    }
}
```

```swift
class Solution {
    func lengthOfLongestSubstringTwoDistinct(_ s: String) -> Int {
        let chars = Array(s)
        var res = 0
        let n = chars.count
        var seen = [Character: Int]()
        var j = 0

        for i in 0..<n {
            seen[chars[i], default: 0] += 1

            while seen.count > 2 {
                let c = chars[j]
                seen[c]! -= 1
                if seen[c] == 0 {
                    seen.removeValue(forKey: c)
                }
                j += 1
            }
            res = max(res, i - j + 1)
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$ since we have at most $52$ different characters.

---

## 3. Sliding Window (Optimal)

### Intuition

We can further optimize by observing that we only care about the maximum window size. Instead of tracking the actual maximum during iteration, we maintain a window that never shrinks by more than one element at a time. When we have too many distinct characters, we shift the entire window right by one. The final window size represents the longest valid substring.

### Algorithm

1. Initialize `j = 0` (left pointer) and a hash map `count` for character frequencies.
2. For each `i` from `0` to `n-1`:
   - Increment the count of `s[i]`.
   - If more than `2` distinct characters:
     - Decrement the count of `s[j]`.
     - If count becomes `0`, remove from map.
     - Increment `j`.
3. Return `i - j + 1` (or `n - j` after the loop).

::tabs-start

```python
class Solution:
    def lengthOfLongestSubstringTwoDistinct(self, s: str) -> int:
        n = len(s)
        count = defaultdict(int)
        j = 0

        for i in range(n):
            count[s[i]] += 1
            if len(count) > 2:
                count[s[j]] -= 1
                if count[s[j]] == 0:
                    count.pop(s[j])
                j += 1
        return i - j + 1
```

```java
public class Solution {
    public int lengthOfLongestSubstringTwoDistinct(String s) {
        int n = s.length();
        Map<Character, Integer> count = new HashMap<>();
        int j = 0, i = 0;
        for (i = 0; i < n; i++) {
            count.put(s.charAt(i), count.getOrDefault(s.charAt(i), 0) + 1);
            if (count.size() > 2) {
                char c = s.charAt(j);
                count.put(c, count.get(c) - 1);
                if (count.get(c) == 0) count.remove(c);
                j++;
            }
        }
        return i - j;
    }
}
```

```cpp
class Solution {
public:
    int lengthOfLongestSubstringTwoDistinct(string s) {
        int n = s.size();
        unordered_map<char, int> count;
        int j = 0, i = 0;
        for (i = 0; i < n; i++) {
            count[s[i]]++;
            if (count.size() > 2) {
                count[s[j]]--;
                if (count[s[j]] == 0) count.erase(s[j]);
                j++;
            }
        }
        return i - j;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    lengthOfLongestSubstringTwoDistinct(s) {
        let n = s.length;
        let count = new Map();
        let j = 0, i = 0;
        for (i = 0; i < n; i++) {
            count.set(s[i], (count.get(s[i]) || 0) + 1);
            if (count.size > 2) {
                count.set(s[j], count.get(s[j]) - 1);
                if (count.get(s[j]) === 0) count.delete(s[j]);
                j++;
            }
        }
        return i - j;
    }
}
```

```csharp
public class Solution {
    public int LengthOfLongestSubstringTwoDistinct(string s) {
        int n = s.Length;
        Dictionary<char, int> count = new Dictionary<char, int>();
        int j = 0, i = 0;
        for (i = 0; i < n; i++) {
            if (!count.ContainsKey(s[i])) count[s[i]] = 0;
            count[s[i]]++;
            if (count.Count > 2) {
                count[s[j]]--;
                if (count[s[j]] == 0) count.Remove(s[j]);
                j++;
            }
        }
        return i - j;
    }
}
```

```go
func lengthOfLongestSubstringTwoDistinct(s string) int {
    n := len(s)
    count := make(map[byte]int)
    j := 0

    for i := 0; i < n; i++ {
        count[s[i]]++
        if len(count) > 2 {
            count[s[j]]--
            if count[s[j]] == 0 {
                delete(count, s[j])
            }
            j++
        }
    }
    return n - j
}
```

```kotlin
class Solution {
    fun lengthOfLongestSubstringTwoDistinct(s: String): Int {
        val n = s.length
        val count = HashMap<Char, Int>()
        var j = 0

        for (i in 0 until n) {
            count[s[i]] = count.getOrDefault(s[i], 0) + 1
            if (count.size > 2) {
                count[s[j]] = count[s[j]]!! - 1
                if (count[s[j]] == 0) count.remove(s[j])
                j++
            }
        }
        return n - j
    }
}
```

```swift
class Solution {
    func lengthOfLongestSubstringTwoDistinct(_ s: String) -> Int {
        let chars = Array(s)
        let n = chars.count
        var count = [Character: Int]()
        var j = 0

        for i in 0..<n {
            count[chars[i], default: 0] += 1
            if count.count > 2 {
                count[chars[j]]! -= 1
                if count[chars[j]] == 0 {
                    count.removeValue(forKey: chars[j])
                }
                j += 1
            }
        }
        return n - j
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$ since we have at most $52$ different characters.

---

## Common Pitfalls

### Forgetting to Remove Characters with Zero Count

When shrinking the window from the left, you must remove characters from the hash map when their count drops to zero. If you only decrement the count without removing the entry, the map size will incorrectly reflect more distinct characters than actually exist in the window, causing premature window shrinking.

### Confusing "At Most Two" with "Exactly Two"

The problem asks for substrings with *at most* two distinct characters, not exactly two. This means substrings with zero or one distinct character are also valid. Ensure your solution counts these cases correctly and does not skip windows with fewer than two distinct characters.

### Incorrect Window Boundary Updates

A common mistake is updating the result before fully adjusting the window to be valid. Always ensure the window contains at most two distinct characters before calculating and updating the maximum length. Update the result after the while loop that shrinks the window, not before.