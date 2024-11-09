## 1. Brute Force

::tabs-start

```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        res = 0
        for i in range(len(s)):
            charSet = set()
            for j in range(i, len(s)):
                if s[j] in charSet:
                    break
                charSet.add(s[j])
            res = max(res, len(charSet))
        return res
```

```java
public class Solution {
    public int lengthOfLongestSubstring(String s) {
        int res = 0;
        for (int i = 0; i < s.length(); i++) {
            Set<Character> charSet = new HashSet<>();
            for (int j = i; j < s.length(); j++) {
                if (charSet.contains(s.charAt(j))) {
                    break;
                }
                charSet.add(s.charAt(j));
            }
            res = Math.max(res, charSet.size());
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int res = 0;
        for (int i = 0; i < s.size(); i++) {
            unordered_set<char> charSet;
            for (int j = i; j < s.size(); j++) {
                if (charSet.find(s[j]) != charSet.end()) {
                    break;
                }
                charSet.insert(s[j]);
            }
            res = max(res, (int)charSet.size());
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
    lengthOfLongestSubstring(s) {
        let res = 0;
        for (let i = 0; i < s.length; i++) {
            let charSet = new Set();
            for (let j = i; j < s.length; j++) {
                if (charSet.has(s[j])) {
                    break;
                }
                charSet.add(s[j]);
            }
            res = Math.max(res, charSet.size);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int LengthOfLongestSubstring(string s) {
        int res = 0;
        for (int i = 0; i < s.Length; i++) {
            HashSet<char> charSet = new HashSet<char>();
            for (int j = i; j < s.Length; j++) {
                if (charSet.Contains(s[j])) {
                    break;
                }
                charSet.Add(s[j]);
            }
            res = Math.Max(res, charSet.Count);
        }
        return res;
    }
}
```

```go
func lengthOfLongestSubstring(s string) int {
    res := 0

    for i := 0; i < len(s); i++ {
        charSet := make(map[byte]bool)
        for j := i; j < len(s); j++ {
            if charSet[s[j]] {
                break
            }
            charSet[s[j]] = true
        }
        if len(charSet) > res {
            res = len(charSet)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun lengthOfLongestSubstring(s: String): Int {
        var res = 0

        for (i in s.indices) {
            val charSet = mutableSetOf<Char>()
            for (j in i until s.length) {
                if (s[j] in charSet) {
                    break
                }
                charSet.add(s[j])
            }
            res = maxOf(res, charSet.size)
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * m)$
* Space complexity: $O(m)$

> Where $n$ is the length of the string and $m$ is the total number of unique characters in the string.

---

## 2. Sliding Window

::tabs-start

```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        charSet = set()
        l = 0
        res = 0

        for r in range(len(s)):
            while s[r] in charSet:
                charSet.remove(s[l])
                l += 1
            charSet.add(s[r])
            res = max(res, r - l + 1)
        return res
```

```java
public class Solution {
    public int lengthOfLongestSubstring(String s) {
        HashSet<Character> charSet = new HashSet<>();
        int l = 0;
        int res = 0;

        for (int r = 0; r < s.length(); r++) {
            while (charSet.contains(s.charAt(r))) {
                charSet.remove(s.charAt(l));
                l++;
            }
            charSet.add(s.charAt(r));
            res = Math.max(res, r - l + 1);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_set<char> charSet;
        int l = 0;
        int res = 0;

        for (int r = 0; r < s.size(); r++) {
            while (charSet.find(s[r]) != charSet.end()) {
                charSet.erase(s[l]);
                l++;
            }
            charSet.insert(s[r]);
            res = max(res, r - l + 1);
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
    lengthOfLongestSubstring(s) {
        const charSet = new Set();
        let l = 0;
        let res = 0;

        for (let r = 0; r < s.length; r++) {
            while (charSet.has(s[r])) {
                charSet.delete(s[l]);
                l++;
            }
            charSet.add(s[r]);
            res = Math.max(res, r - l + 1);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int LengthOfLongestSubstring(string s) {
        HashSet<char> charSet = new HashSet<char>();
        int l = 0;
        int res = 0;

        for (int r = 0; r < s.Length; r++) {
            while (charSet.Contains(s[r])) {
                charSet.Remove(s[l]);
                l++;
            }
            charSet.Add(s[r]);
            res = Math.Max(res, r - l + 1);
        }
        return res;
    }
}
```

```go
func lengthOfLongestSubstring(s string) int {
    charSet := make(map[byte]bool)
    l, res := 0, 0

    for r := 0; r < len(s); r++ {
        for charSet[s[r]] {
            delete(charSet, s[l])
            l++
        }
        charSet[s[r]] = true
        if r - l + 1 > res {
            res = r - l + 1
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun lengthOfLongestSubstring(s: String): Int {
        val charSet = HashSet<Char>()
        var l = 0
        var res = 0

        for (r in s.indices) {
            while (s[r] in charSet) {
                charSet.remove(s[l])
                l++
            }
            charSet.add(s[r])
            res = maxOf(res, r - l + 1)
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(m)$

> Where $n$ is the length of the string and $m$ is the total number of unique characters in the string.

---

## 3. Sliding Window (Optimal)

::tabs-start

```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        mp = {}
        l = 0
        res = 0
        
        for r in range(len(s)):
            if s[r] in mp:
                l = max(mp[s[r]] + 1, l)
            mp[s[r]] = r
            res = max(res, r - l + 1)
        return res
```

```java
public class Solution {
    public int lengthOfLongestSubstring(String s) {
        HashMap<Character, Integer> mp = new HashMap<>();
        int l = 0, res = 0;
        
        for (int r = 0; r < s.length(); r++) {
            if (mp.containsKey(s.charAt(r))) {
                l = Math.max(mp.get(s.charAt(r)) + 1, l);
            }
            mp.put(s.charAt(r), r);
            res = Math.max(res, r - l + 1);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_map<char, int> mp;
        int l = 0, res = 0;
        
        for (int r = 0; r < s.size(); r++) {
            if (mp.find(s[r]) != mp.end()) {
                l = max(mp[s[r]] + 1, l);
            }
            mp[s[r]] = r;
            res = max(res, r - l + 1);
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
    lengthOfLongestSubstring(s) {
        let mp = new Map();
        let l = 0, res = 0;
        
        for (let r = 0; r < s.length; r++) {
            if (mp.has(s[r])) {
                l = Math.max(mp.get(s[r]) + 1, l);
            }
            mp.set(s[r], r);
            res = Math.max(res, r - l + 1);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int LengthOfLongestSubstring(string s) {
        Dictionary<char, int> mp = new Dictionary<char, int>();
        int l = 0, res = 0;
        
        for (int r = 0; r < s.Length; r++) {
            if (mp.ContainsKey(s[r])) {
                l = Math.Max(mp[s[r]] + 1, l);
            }
            mp[s[r]] = r;
            res = Math.Max(res, r - l + 1);
        }
        return res;
    }
}
```

```go
func lengthOfLongestSubstring(s string) int {
    mp := make(map[byte]int)
    l, res := 0, 0

    for r := 0; r < len(s); r++ {
        if idx, found := mp[s[r]]; found {
            l = max(idx+1, l)
        }
        mp[s[r]] = r
        if r - l + 1 > res {
            res = r - l + 1
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun lengthOfLongestSubstring(s: String): Int {
        val mp = HashMap<Char, Int>()
        var l = 0
        var res = 0

        for (r in s.indices) {
            if (s[r] in mp) {
                l = maxOf(mp[s[r]]!! + 1, l)
            }
            mp[s[r]] = r
            res = maxOf(res, r - l + 1)
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(m)$

> Where $n$ is the length of the string and $m$ is the total number of unique characters in the string.