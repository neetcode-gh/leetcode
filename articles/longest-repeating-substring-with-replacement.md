## 1. Brute Force

::tabs-start

```python
class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        res = 0
        for i in range(len(s)):
            count, maxf = {}, 0
            for j in range(i, len(s)):
                count[s[j]] = 1 + count.get(s[j], 0)
                maxf = max(maxf, count[s[j]])
                if (j - i + 1) - maxf <= k:
                    res = max(res, j - i + 1)
        return res
```

```java
public class Solution {
    public int characterReplacement(String s, int k) {
        int res = 0;
        for (int i = 0; i < s.length(); i++) {
            HashMap<Character, Integer> count = new HashMap<>();
            int maxf = 0;
            for (int j = i; j < s.length(); j++) {
                count.put(s.charAt(j), count.getOrDefault(s.charAt(j), 0) + 1);
                maxf = Math.max(maxf, count.get(s.charAt(j)));
                if ((j - i + 1) - maxf <= k) {
                    res = Math.max(res, j - i + 1);
                }
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int characterReplacement(string s, int k) {
        int res = 0;
        for (int i = 0; i < s.size(); i++) {
            unordered_map<char, int> count;
            int maxf = 0;
            for (int j = i; j < s.size(); j++) {
                count[s[j]]++;
                maxf = max(maxf, count[s[j]]);
                if ((j - i + 1) - maxf <= k) {
                    res = max(res, j - i + 1);
                }
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
     * @param {number} k
     * @return {number}
     */
    characterReplacement(s, k) {
        let res = 0;
        for (let i = 0; i < s.length; i++) {
            let count = new Map();
            let maxf = 0;
            for (let j = i; j < s.length; j++) {
                count.set(s[j], (count.get(s[j]) || 0) + 1);
                maxf = Math.max(maxf, count.get(s[j]));
                if ((j - i + 1) - maxf <= k) {
                    res = Math.max(res, j - i + 1);
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int CharacterReplacement(string s, int k) {
        int res = 0;
        for (int i = 0; i < s.Length; i++) {
            Dictionary<char, int> count = new Dictionary<char, int>();
            int maxf = 0;
            for (int j = i; j < s.Length; j++) {
                if (count.ContainsKey(s[j])) {
                    count[s[j]]++;
                } else {
                    count[s[j]] = 1;
                }
                maxf = Math.Max(maxf, count[s[j]]);
                if ((j - i + 1) - maxf <= k) {
                    res = Math.Max(res, j - i + 1);
                }
            }
        }
        return res;
    }
}
```

```go
func characterReplacement(s string, k int) int {
    res := 0
    for i := 0; i < len(s); i++ {
        count := make(map[byte]int)
        maxf := 0
        for j := i; j < len(s); j++ {
            count[s[j]]++
            maxf = max(maxf, count[s[j]])
            if (j - i + 1) - maxf <= k {
                res = max(res, j - i + 1)
            }
        }
    }
    return res
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun characterReplacement(s: String, k: Int): Int {
        var res = 0
        for (i in s.indices) {
            val count = HashMap<Char, Int>()
            var maxf = 0
            for (j in i until s.length) {
                count[s[j]] = count.getOrDefault(s[j], 0) + 1
                maxf = maxOf(maxf, count[s[j]]!!)
                if ((j - i + 1) - maxf <= k) {
                    res = maxOf(res, j - i + 1)
                }
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(m)$

> Where $n$ is the length of the string and $m$ is the total number of unique characters in the string.

---

## 2. Sliding Window

::tabs-start

```python
class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        res = 0
        charSet = set(s)

        for c in charSet:
            count = l = 0
            for r in range(len(s)):
                if s[r] == c:
                    count += 1

                while (r - l + 1) - count > k:
                    if s[l] == c:
                        count -= 1
                    l += 1
                    
                res = max(res, r - l + 1)
        return res
```

```java
public class Solution {
    public int characterReplacement(String s, int k) {
        int res = 0;
        HashSet<Character> charSet = new HashSet<>();
        for (char c : s.toCharArray()) {
            charSet.add(c);
        }

        for (char c : charSet) {
            int count = 0, l = 0;
            for (int r = 0; r < s.length(); r++) {
                if (s.charAt(r) == c) {
                    count++;
                }

                while ((r - l + 1) - count > k) {
                    if (s.charAt(l) == c) {
                        count--;
                    }
                    l++;
                }

                res = Math.max(res, r - l + 1);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int characterReplacement(std::string s, int k) {
        int res = 0;
        unordered_set<char> charSet(s.begin(), s.end());

        for (char c : charSet) {
            int count = 0, l = 0;
            for (int r = 0; r < s.size(); r++) {
                if (s[r] == c) {
                    count++;
                }

                while ((r - l + 1) - count > k) {
                    if (s[l] == c) {
                        count--;
                    }
                    l++;
                }

                res = std::max(res, r - l + 1);
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
     * @param {number} k
     * @return {number}
     */
    characterReplacement(s, k) {
        let res = 0;
        let charSet = new Set(s);

        for (let c of charSet) {
            let count = 0, l = 0;
            for (let r = 0; r < s.length; r++) {
                if (s[r] === c) {
                    count++;
                }

                while ((r - l + 1) - count > k) {
                    if (s[l] === c) {
                        count--;
                    }
                    l++;
                }

                res = Math.max(res, r - l + 1);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int CharacterReplacement(string s, int k) {
        int res = 0;
        HashSet<char> charSet = new HashSet<char>(s);

        foreach (char c in charSet) {
            int count = 0, l = 0;
            for (int r = 0; r < s.Length; r++) {
                if (s[r] == c) {
                    count++;
                }

                while ((r - l + 1) - count > k) {
                    if (s[l] == c) {
                        count--;
                    }
                    l++;
                }

                res = Math.Max(res, r - l + 1);
            }
        }
        return res;
    }
}
```

```go
func characterReplacement(s string, k int) int {
    res := 0
    charSet := make(map[byte]bool)
    
    for i := 0; i < len(s); i++ {
        charSet[s[i]] = true
    }

    for c := range charSet {
        count, l := 0, 0
        for r := 0; r < len(s); r++ {
            if s[r] == c {
                count++
            }

            for (r - l + 1) - count > k {
                if s[l] == c {
                    count--
                }
                l++
            }

            res = max(res, r - l + 1)
        }
    }
    
    return res
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun characterReplacement(s: String, k: Int): Int {
        var res = 0
        val charSet = s.toSet()

        for (c in charSet) {
            var count = 0
            var l = 0
            for (r in s.indices) {
                if (s[r] == c) {
                    count++
                }

                while ((r - l + 1) - count > k) {
                    if (s[l] == c) {
                        count--
                    }
                    l++
                }

                res = maxOf(res, r - l + 1)
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m)$

> Where $n$ is the length of the string and $m$ is the total number of unique characters in the string.

---

## 3. Sliding Window (Optimal)

::tabs-start

```python
class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        count = {}
        res = 0
        
        l = 0
        maxf = 0
        for r in range(len(s)):
            count[s[r]] = 1 + count.get(s[r], 0)
            maxf = max(maxf, count[s[r]])

            while (r - l + 1) - maxf > k:
                count[s[l]] -= 1
                l += 1
            res = max(res, r - l + 1)

        return res
```

```java
public class Solution {
    public int characterReplacement(String s, int k) {
        HashMap<Character, Integer> count = new HashMap<>();
        int res = 0;

        int l = 0, maxf = 0;
        for (int r = 0; r < s.length(); r++) {
            count.put(s.charAt(r), count.getOrDefault(s.charAt(r), 0) + 1);
            maxf = Math.max(maxf, count.get(s.charAt(r)));

            while ((r - l + 1) - maxf > k) {
                count.put(s.charAt(l), count.get(s.charAt(l)) - 1);
                l++;
            }
            res = Math.max(res, r - l + 1);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int characterReplacement(std::string s, int k) {
        unordered_map<char, int> count;
        int res = 0;

        int l = 0, maxf = 0;
        for (int r = 0; r < s.size(); r++) {
            count[s[r]]++;
            maxf = max(maxf, count[s[r]]);

            while ((r - l + 1) - maxf > k) {
                count[s[l]]--;
                l++;
            }
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
     * @param {number} k
     * @return {number}
     */
    characterReplacement(s, k) {
        let count = new Map();
        let res = 0;

        let l = 0, maxf = 0;
        for (let r = 0; r < s.length; r++) {
            count.set(s[r], (count.get(s[r]) || 0) + 1);
            maxf = Math.max(maxf, count.get(s[r]));

            while ((r - l + 1) - maxf > k) {
                count.set(s[l], count.get(s[l]) - 1);
                l++;
            }
            res = Math.max(res, r - l + 1);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int CharacterReplacement(string s, int k) {
        Dictionary<char, int> count = new Dictionary<char, int>();
        int res = 0;

        int l = 0, maxf = 0;
        for (int r = 0; r < s.Length; r++) {
            if (count.ContainsKey(s[r])) {
                count[s[r]]++;
            } else {
                count[s[r]] = 1;
            }
            maxf = Math.Max(maxf, count[s[r]]);

            while ((r - l + 1) - maxf > k) {
                count[s[l]]--;
                l++;
            }
            res = Math.Max(res, r - l + 1);
        }

        return res;
    }
}
```

```go
func characterReplacement(s string, k int) int {
    count := make(map[byte]int)
    res, l, maxf := 0, 0, 0

    for r := 0; r < len(s); r++ {
        count[s[r]]++
        if count[s[r]] > maxf {
            maxf = count[s[r]]
        }

        for (r - l + 1) - maxf > k {
            count[s[l]]--
            l++
        }
        
        if r - l + 1 > res {
            res = r - l + 1
        }
    }
    
    return res
}
```

```kotlin
class Solution {
    fun characterReplacement(s: String, k: Int): Int {
        val count = mutableMapOf<Char, Int>()
        var res = 0
        var l = 0
        var maxf = 0

        for (r in s.indices) {
            count[s[r]] = count.getOrDefault(s[r], 0) + 1
            maxf = maxOf(maxf, count[s[r]]!!)

            while (r - l + 1 - maxf > k) {
                count[s[l]] = count[s[l]]!! - 1
                l++
            }
            
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