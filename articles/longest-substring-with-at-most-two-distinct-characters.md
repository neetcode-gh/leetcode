## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(1)$ since we have at most $52$ different characters.

---

## 2. Sliding Window

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$ since we have at most $52$ different characters.

---

## 3. Sliding Window (Optimal)

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$ since we have at most $52$ different characters.