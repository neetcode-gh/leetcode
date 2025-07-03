## 1. Counting

::tabs-start

```python
class Solution:
    def maxDifference(self, s: str) -> int:
        count = Counter(s)
        res = float("-inf")

        for odd in count.values():
            if odd % 2 == 0: continue
            for even in count.values():
                if even % 2 == 1: continue
                res = max(res, odd - even)

        return res
```

```java
public class Solution {
    public int maxDifference(String s) {
        int[] count = new int[26];
        for (char c : s.toCharArray()) {
            count[c - 'a']++;
        }

        int res = Integer.MIN_VALUE;
        for (int odd : count) {
            if (odd == 0 || odd % 2 == 0) continue;
            for (int even : count) {
                if (even == 0 || even % 2 == 1) continue;
                res = Math.max(res, odd - even);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxDifference(string s) {
        vector<int> count(26, 0);
        for (char c : s) {
            count[c - 'a']++;
        }

        int res = INT_MIN;
        for (int odd : count) {
            if (odd == 0 || odd % 2 == 0) continue;
            for (int even : count) {
                if (even == 0 || even % 2 == 1) continue;
                res = max(res, odd - even);
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
    maxDifference(s) {
        const count = new Array(26).fill(0);
        for (const c of s) {
            count[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }

        let res = -Infinity;
        for (const odd of count) {
            if (odd === 0 || odd % 2 === 0) continue;
            for (const even of count) {
                if (even === 0 || even % 2 === 1) continue;
                res = Math.max(res, odd - even);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxDifference(string s) {
        int[] count = new int[26];
        foreach (char c in s) {
            count[c - 'a']++;
        }

        int res = int.MinValue;
        foreach (int odd in count) {
            if (odd == 0 || odd % 2 == 0) continue;
            foreach (int even in count) {
                if (even == 0 || even % 2 == 1) continue;
                res = Math.Max(res, odd - even);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$ since we have at most $26$ different characters.

---

## 2. Counting (Optimal)

::tabs-start

```python
class Solution:
    def maxDifference(self, s: str) -> int:
        count = Counter(s)
        oddMax, evenMin = 0, len(s) 

        for cnt in count.values():
            if cnt & 1:
                oddMax = max(oddMax, cnt)
            else:
                evenMin = min(evenMin, cnt)

        return oddMax - evenMin
```

```java
public class Solution {
    public int maxDifference(String s) {
        int[] count = new int[26];
        for (char c : s.toCharArray()) {
            count[c - 'a']++;
        }

        int oddMax = 0, evenMin = s.length();
        for (int c : count) {
            if ((c & 1) == 1) {
                oddMax = Math.max(oddMax, c);
            } else if (c > 0) {
                evenMin = Math.min(evenMin, c);
            }
        }

        return oddMax - evenMin;
    }
}
```

```cpp
class Solution {
public:
    int maxDifference(string s) {
        vector<int> count(26, 0);
        for (char c : s) {
            count[c - 'a']++;
        }

        int oddMax = 0, evenMin = s.length();
        for (int c : count) {
            if (c & 1) {
                oddMax = max(oddMax, c);
            } else if (c > 0) {
                evenMin = min(evenMin, c);
            }
        }

        return oddMax - evenMin;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    maxDifference(s) {
        const count = new Array(26).fill(0);
        for (const c of s) {
            count[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }

        let oddMax = 0, evenMin = s.length;
        for (const c of count) {
            if (c & 1) {
                oddMax = Math.max(oddMax, c);
            } else if (c > 0) {
                evenMin = Math.min(evenMin, c);
            }
        }

        return oddMax - evenMin;
    }
}
```

```csharp
public class Solution {
    public int MaxDifference(string s) {
        int[] count = new int[26];
        foreach (char c in s) {
            count[c - 'a']++;
        }

        int oddMax = 0, evenMin = s.Length;
        foreach (int c in count) {
            if ((c & 1) == 1) {
                oddMax = Math.Max(oddMax, c);
            } else if (c > 0) {
                evenMin = Math.Min(evenMin, c);
            }
        }

        return oddMax - evenMin;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$ since we have at most $26$ different characters.