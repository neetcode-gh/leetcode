## 1. Brute Force

::tabs-start

```python
class Solution:
    def firstUniqChar(self, s: str) -> int:
        for i in range(len(s)):
            flag = True
            for j in range(len(s)):
                if i == j:
                    continue
                if s[i] == s[j]:
                    flag = False
                    break
            if flag:
                return i
        return -1
```

```java
public class Solution {
    public int firstUniqChar(String s) {
        for (int i = 0; i < s.length(); i++) {
            boolean flag = true;
            for (int j = 0; j < s.length(); j++) {
                if (i == j) continue;
                if (s.charAt(i) == s.charAt(j)) {
                    flag = false;
                    break;
                }
            }
            if (flag) return i;
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int firstUniqChar(string s) {
        for (int i = 0; i < s.size(); i++) {
            bool flag = true;
            for (int j = 0; j < s.size(); j++) {
                if (i == j) continue;
                if (s[i] == s[j]) {
                    flag = false;
                    break;
                }
            }
            if (flag) return i;
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    firstUniqChar(s) {
        for (let i = 0; i < s.length; i++) {
            let flag = true;
            for (let j = 0; j < s.length; j++) {
                if (i === j) continue;
                if (s[i] === s[j]) {
                    flag = false;
                    break;
                }
            }
            if (flag) return i;
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int FirstUniqChar(string s) {
        for (int i = 0; i < s.Length; i++) {
            bool flag = true;
            for (int j = 0; j < s.Length; j++) {
                if (i == j) continue;
                if (s[i] == s[j]) {
                    flag = false;
                    break;
                }
            }
            if (flag) return i;
        }
        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Hash Map

::tabs-start

```python
class Solution:
    def firstUniqChar(self, s: str) -> int:
        count = defaultdict(int)
        for c in s:
            count[c] += 1

        for i, c in enumerate(s):
            if count[c] == 1:
                return i
        return -1
```

```java
public class Solution {
    public int firstUniqChar(String s) {
        Map<Character, Integer> count = new HashMap<>();
        for (char c : s.toCharArray()) {
            count.put(c, count.getOrDefault(c, 0) + 1);
        }

        for (int i = 0; i < s.length(); i++) {
            if (count.get(s.charAt(i)) == 1) {
                return i;
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int firstUniqChar(string s) {
        unordered_map<char, int> count;
        for (char c : s) {
            count[c]++;
        }

        for (int i = 0; i < s.size(); i++) {
            if (count[s[i]] == 1) {
                return i;
            }
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    firstUniqChar(s) {
        const count = new Map();
        for (const c of s) {
            count.set(c, (count.get(c) || 0) + 1);
        }

        for (let i = 0; i < s.length; i++) {
            if (count.get(s[i]) === 1) {
                return i;
            }
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int FirstUniqChar(string s) {
        Dictionary<char, int> count = new Dictionary<char, int>();
        foreach (char c in s) {
            if (!count.ContainsKey(c)) {
                count[c] = 0;
            }
            count[c]++;
        }

        for (int i = 0; i < s.Length; i++) {
            if (count[s[i]] == 1) {
                return i;
            }
        }
        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

---

## 3. Hash Map (Optimal)

::tabs-start

```python
class Solution:
    def firstUniqChar(self, s: str) -> int:
        n = len(s)
        count = defaultdict(int)
        for i, c in enumerate(s):
            if c not in count:
                count[c] = i
            else:
                count[c] = n

        res = n
        for c in count:
            res = min(res, count[c])

        return -1 if res == n else res
```

```java
public class Solution {
    public int firstUniqChar(String s) {
        int n = s.length();
        Map<Character, Integer> count = new HashMap<>();

        for (int i = 0; i < n; i++) {
            char c = s.charAt(i);
            if (!count.containsKey(c)) {
                count.put(c, i);
            } else {
                count.put(c, n);
            }
        }

        int res = n;
        for (int index : count.values()) {
            res = Math.min(res, index);
        }

        return res == n ? -1 : res;
    }
}
```

```cpp
class Solution {
public:
    int firstUniqChar(string s) {
        int n = s.size();
        unordered_map<char, int> count;

        for (int i = 0; i < n; i++) {
            if (count.find(s[i]) == count.end()) {
                count[s[i]] = i;
            } else {
                count[s[i]] = n;
            }
        }

        int res = n;
        for (auto& [key, index] : count) {
            res = min(res, index);
        }

        return res == n ? -1 : res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    firstUniqChar(s) {
        const n = s.length;
        const count = new Map();

        for (let i = 0; i < n; i++) {
            const c = s[i];
            if (!count.has(c)) {
                count.set(c, i);
            } else {
                count.set(c, n);
            }
        }

        let res = n;
        for (const index of count.values()) {
            res = Math.min(res, index);
        }

        return res === n ? -1 : res;
    }
}
```

```csharp
public class Solution {
    public int FirstUniqChar(string s) {
        int n = s.Length;
        Dictionary<char, int> count = new Dictionary<char, int>();

        for (int i = 0; i < n; i++) {
            char c = s[i];
            if (!count.ContainsKey(c)) {
                count[c] = i;
            } else {
                count[c] = n;
            }
        }

        int res = n;
        foreach (var kvp in count) {
            res = Math.Min(res, kvp.Value);
        }

        return res == n ? -1 : res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

---

## 4. Iteration

::tabs-start

```python
class Solution:
    def firstUniqChar(self, s: str) -> int:
        res = n = len(s)
        for ch in range(ord('a'), ord('z') + 1):
            index = s.find(chr(ch))
            if index != -1 and s.rfind(chr(ch)) == index:
                res = min(res, index)

        return -1 if res == n else res
```

```java
public class Solution {
    public int firstUniqChar(String s) {
        int res = s.length();

        for (char ch = 'a'; ch <= 'z'; ch++) {
            int firstIndex = s.indexOf(ch);
            if (firstIndex != -1 && s.lastIndexOf(ch) == firstIndex) {
                res = Math.min(res, firstIndex);
            }
        }

        return res == s.length() ? -1 : res;
    }
}
```

```cpp
class Solution {
public:
    int firstUniqChar(string s) {
        int res = s.size();

        for (char ch = 'a'; ch <= 'z'; ch++) {
            int firstIndex = s.find(ch);
            if (firstIndex != string::npos && s.rfind(ch) == firstIndex) {
                res = min(res, firstIndex);
            }
        }

        return res == s.size() ? -1 : res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    firstUniqChar(s) {
        let res = s.length;

        for (let ch = 'a'.charCodeAt(0); ch <= 'z'.charCodeAt(0); ch++) {
            const char = String.fromCharCode(ch);
            const firstIndex = s.indexOf(char);
            if (firstIndex !== -1 && s.lastIndexOf(char) === firstIndex) {
                res = Math.min(res, firstIndex);
            }
        }

        return res === s.length ? -1 : res;
    }
}
```

```csharp
public class Solution {
    public int FirstUniqChar(string s) {
        int n = s.Length;
        int res = n;

        for (char ch = 'a'; ch <= 'z'; ch++) {
            int index = s.IndexOf(ch);
            if (index != -1 && s.LastIndexOf(ch) == index) {
                res = Math.Min(res, index);
            }
        }

        return res == n ? -1 : res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(26 * n)$ since we have at most $26$ different characters.
- Space complexity: $O(1)$
