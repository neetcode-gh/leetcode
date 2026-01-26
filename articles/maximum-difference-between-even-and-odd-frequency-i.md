## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Hash Maps / Frequency Counting** - Counting occurrences of elements using dictionaries or arrays
- **Parity (Odd/Even)** - Determining whether a number is odd or even using modulo or bitwise operations

---

## 1. Counting

### Intuition

We want to maximize `(frequency of some character with odd count) - (frequency of some character with even count)`. The straightforward approach is to count how often each character appears, then check all pairs where one has an odd frequency and the other has an even frequency. We take the maximum difference among all valid pairs.

### Algorithm

1. Count the frequency of each character in the string.
2. Iterate through all pairs of frequencies where one is odd and one is even.
3. For each valid pair, compute `odd - even` and track the maximum.
4. Return the maximum difference found.

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

```go
func maxDifference(s string) int {
    count := make([]int, 26)
    for _, c := range s {
        count[c-'a']++
    }

    res := -1 << 31
    for _, odd := range count {
        if odd == 0 || odd%2 == 0 {
            continue
        }
        for _, even := range count {
            if even == 0 || even%2 == 1 {
                continue
            }
            if odd-even > res {
                res = odd - even
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun maxDifference(s: String): Int {
        val count = IntArray(26)
        for (c in s) {
            count[c - 'a']++
        }

        var res = Int.MIN_VALUE
        for (odd in count) {
            if (odd == 0 || odd % 2 == 0) continue
            for (even in count) {
                if (even == 0 || even % 2 == 1) continue
                res = maxOf(res, odd - even)
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func maxDifference(_ s: String) -> Int {
        var count = [Int](repeating: 0, count: 26)
        let aAscii = Character("a").asciiValue!
        for c in s {
            count[Int(c.asciiValue! - aAscii)] += 1
        }

        var res = Int.min
        for odd in count {
            if odd == 0 || odd % 2 == 0 { continue }
            for even in count {
                if even == 0 || even % 2 == 1 { continue }
                res = max(res, odd - even)
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$ since we have at most $26$ different characters.

---

## 2. Counting (Optimal)

### Intuition

Instead of checking all pairs, we can observe that to maximize `odd - even`, we should pick the largest odd frequency and the smallest even frequency. This gives us the optimal answer in a single pass through the frequency counts.

### Algorithm

1. Count the frequency of each character in the string.
2. Track `oddMax` as the largest frequency that is odd.
3. Track `evenMin` as the smallest frequency that is even (and greater than `0`).
4. Return `oddMax - evenMin`.

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

```go
func maxDifference(s string) int {
    count := make([]int, 26)
    for _, c := range s {
        count[c-'a']++
    }

    oddMax, evenMin := 0, len(s)
    for _, c := range count {
        if c&1 == 1 {
            if c > oddMax {
                oddMax = c
            }
        } else if c > 0 {
            if c < evenMin {
                evenMin = c
            }
        }
    }

    return oddMax - evenMin
}
```

```kotlin
class Solution {
    fun maxDifference(s: String): Int {
        val count = IntArray(26)
        for (c in s) {
            count[c - 'a']++
        }

        var oddMax = 0
        var evenMin = s.length
        for (c in count) {
            if (c and 1 == 1) {
                oddMax = maxOf(oddMax, c)
            } else if (c > 0) {
                evenMin = minOf(evenMin, c)
            }
        }

        return oddMax - evenMin
    }
}
```

```swift
class Solution {
    func maxDifference(_ s: String) -> Int {
        var count = [Int](repeating: 0, count: 26)
        let aAscii = Character("a").asciiValue!
        for c in s {
            count[Int(c.asciiValue! - aAscii)] += 1
        }

        var oddMax = 0
        var evenMin = s.count
        for c in count {
            if c & 1 == 1 {
                oddMax = max(oddMax, c)
            } else if c > 0 {
                evenMin = min(evenMin, c)
            }
        }

        return oddMax - evenMin
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$ since we have at most $26$ different characters.

---

## Common Pitfalls

### Including Zero Frequencies

Characters that do not appear in the string have frequency zero, which is technically even. However, you cannot use a zero-frequency character as the "even frequency" character because it does not exist in the string. Always filter out zero counts when looking for the minimum even frequency.

### Swapping Odd and Even in the Difference

The problem asks for `(odd frequency) - (even frequency)`, not the other way around. Maximizing `even - odd` instead gives the wrong answer. Pay attention to which frequency should be maximized and which should be minimized.