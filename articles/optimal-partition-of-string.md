## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Greedy Algorithms** - Making locally optimal choices (extend partition as long as possible) to achieve a global optimum
- **HashSet Operations** - Using sets for O(1) membership checks to detect duplicate characters
- **Bit Manipulation** - Using bitmasks to represent sets of characters efficiently with bitwise AND and OR operations

---

## 1. Greedy (Hash Set)

### Intuition

To minimize the number of substrings, we want each substring to be as long as possible while containing only unique characters. A greedy approach works perfectly here: extend the current substring until we encounter a duplicate character, then start a new substring.

We use a hash set to track characters in the current substring. When we see a character already in the set, we've found a duplicate, so we increment our count and clear the set to start fresh.

### Algorithm

1. Initialize a set `curSet` to track characters in the current partition and `res = 1` for the result count.
2. Iterate through each character in the string:
   - If the character is already in `curSet`, increment `res` and clear the set.
   - Add the current character to `curSet`.
3. Return `res`.

::tabs-start

```python
class Solution:
    def partitionString(self, s: str) -> int:
        curSet = set()
        res = 1
        for c in s:
            if c in curSet:
                res += 1
                curSet.clear()
            curSet.add(c)
        return res
```

```java
public class Solution {
    public int partitionString(String s) {
        Set<Character> curSet = new HashSet<>();
        int res = 1;
        for (char c : s.toCharArray()) {
            if (curSet.contains(c)) {
                res++;
                curSet.clear();
            }
            curSet.add(c);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int partitionString(string s) {
        unordered_set<char> curSet;
        int res = 1;
        for (char c : s) {
            if (curSet.count(c)) {
                res++;
                curSet.clear();
            }
            curSet.insert(c);
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
    partitionString(s) {
        let curSet = new Set();
        let res = 1;
        for (let c of s) {
            if (curSet.has(c)) {
                res++;
                curSet.clear();
            }
            curSet.add(c);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int PartitionString(string s) {
        HashSet<char> curSet = new HashSet<char>();
        int res = 1;
        foreach (char c in s) {
            if (curSet.Contains(c)) {
                res++;
                curSet.Clear();
            }
            curSet.Add(c);
        }
        return res;
    }
}
```

```go
func partitionString(s string) int {
    curSet := make(map[rune]bool)
    res := 1
    for _, c := range s {
        if curSet[c] {
            res++
            curSet = make(map[rune]bool)
        }
        curSet[c] = true
    }
    return res
}
```

```kotlin
class Solution {
    fun partitionString(s: String): Int {
        val curSet = HashSet<Char>()
        var res = 1
        for (c in s) {
            if (c in curSet) {
                res++
                curSet.clear()
            }
            curSet.add(c)
        }
        return res
    }
}
```

```swift
class Solution {
    func partitionString(_ s: String) -> Int {
        var curSet = Set<Character>()
        var res = 1
        for c in s {
            if curSet.contains(c) {
                res += 1
                curSet.removeAll()
            }
            curSet.insert(c)
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

---

## 2. Greedy (Array)

### Intuition

Instead of using a set and clearing it on each partition, we can track the last index where each character appeared. A character causes a conflict only if its last occurrence is within the current partition (at or after the start index).

This approach avoids the overhead of clearing the set and uses constant extra space since we only need to track `26` lowercase letters.

### Algorithm

1. Create an array `lastIdx` of size `26` initialized to `-1`, tracking the last seen index of each character.
2. Initialize `res = 1` and `start = 0` to mark the beginning of the current partition.
3. For each character at index `i`:
   - If `lastIdx[char]` >= `start`, this character appeared in the current partition, so start a new partition by setting `start = i` and incrementing `res`.
   - Update `lastIdx[char] = i`.
4. Return `res`.

::tabs-start

```python
class Solution:
    def partitionString(self, s: str) -> int:
        lastIdx = [-1] * 26
        res = 1
        start = 0
        for i, c in enumerate(s):
            j = ord(c) - ord('a')
            if lastIdx[j] >= start:
                start = i
                res += 1
            lastIdx[j] = i
        return res
```

```java
public class Solution {
    public int partitionString(String s) {
        int[] lastIdx = new int[26];
        Arrays.fill(lastIdx, -1);
        int res = 1, start = 0;
        for (int i = 0; i < s.length(); i++) {
            int j = s.charAt(i) - 'a';
            if (lastIdx[j] >= start) {
                start = i;
                res++;
            }
            lastIdx[j] = i;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int partitionString(string s) {
        vector<int> lastIdx(26, -1);
        int res = 1, start = 0;
        for (int i = 0; i < s.size(); i++) {
            int j = s[i] - 'a';
            if (lastIdx[j] >= start) {
                start = i;
                res++;
            }
            lastIdx[j] = i;
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
    partitionString(s) {
        const lastIdx = Array(26).fill(-1);
        let res = 1,
            start = 0;
        for (let i = 0; i < s.length; i++) {
            const j = s.charCodeAt(i) - 97;
            if (lastIdx[j] >= start) {
                start = i;
                res++;
            }
            lastIdx[j] = i;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int PartitionString(string s) {
        int[] lastIdx = new int[26];
        Array.Fill(lastIdx, -1);
        int res = 1, start = 0;
        for (int i = 0; i < s.Length; i++) {
            int j = s[i] - 'a';
            if (lastIdx[j] >= start) {
                start = i;
                res++;
            }
            lastIdx[j] = i;
        }
        return res;
    }
}
```

```go
func partitionString(s string) int {
    lastIdx := make([]int, 26)
    for i := range lastIdx {
        lastIdx[i] = -1
    }
    res, start := 1, 0
    for i, c := range s {
        j := int(c - 'a')
        if lastIdx[j] >= start {
            start = i
            res++
        }
        lastIdx[j] = i
    }
    return res
}
```

```kotlin
class Solution {
    fun partitionString(s: String): Int {
        val lastIdx = IntArray(26) { -1 }
        var res = 1
        var start = 0
        for (i in s.indices) {
            val j = s[i] - 'a'
            if (lastIdx[j] >= start) {
                start = i
                res++
            }
            lastIdx[j] = i
        }
        return res
    }
}
```

```swift
class Solution {
    func partitionString(_ s: String) -> Int {
        var lastIdx = [Int](repeating: -1, count: 26)
        var res = 1
        var start = 0
        let chars = Array(s)
        for i in 0..<chars.count {
            let j = Int(chars[i].asciiValue! - Character("a").asciiValue!)
            if lastIdx[j] >= start {
                start = i
                res += 1
            }
            lastIdx[j] = i
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

---

## 3. Greedy (Bit Mask)

### Intuition

Since we only have `26` lowercase letters, we can represent the set of characters in the current partition using a single integer as a bitmask. Each bit position corresponds to a letter (bit `0` for `'a'`, bit `1` for `'b'`, etc.).

This is the most space-efficient approach and uses fast bitwise operations to check membership and add characters.

### Algorithm

1. Initialize `res = 1` and `mask = 0`.
2. For each character, compute its bit position `i = char - 'a'`.
3. If the bit at position `i` is already set in `mask` (i.e., `mask & (1 << i)` is non-zero), we have a duplicate:
   - Reset `mask = 0` and increment `res`.
4. Set the bit for the current character: `mask |= (1 << i)`.
5. Return `res`.

::tabs-start

```python
class Solution:
    def partitionString(self, s: str) -> int:
        res = 1
        mask = 0
        for c in s:
            i = ord(c) - ord('a')
            if mask & (1 << i):
                mask = 0
                res += 1
            mask |= (1 << i)
        return res
```

```java
public class Solution {
    public int partitionString(String s) {
        int res = 1, mask = 0;
        for (char c : s.toCharArray()) {
            int i = c - 'a';
            if ((mask & (1 << i)) != 0) {
                mask = 0;
                res++;
            }
            mask |= (1 << i);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int partitionString(string s) {
        int res = 1, mask = 0;
        for (char c : s) {
            int i = c - 'a';
            if (mask & (1 << i)) {
                mask = 0;
                res++;
            }
            mask |= (1 << i);
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
    partitionString(s) {
        let res = 1,
            mask = 0;
        for (const c of s) {
            const i = c.charCodeAt(0) - 97;
            if (mask & (1 << i)) {
                mask = 0;
                res++;
            }
            mask |= 1 << i;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int PartitionString(string s) {
        int res = 1, mask = 0;
        foreach (char c in s) {
            int i = c - 'a';
            if ((mask & (1 << i)) != 0) {
                mask = 0;
                res++;
            }
            mask |= (1 << i);
        }
        return res;
    }
}
```

```go
func partitionString(s string) int {
    res, mask := 1, 0
    for _, c := range s {
        i := int(c - 'a')
        if mask&(1<<i) != 0 {
            mask = 0
            res++
        }
        mask |= 1 << i
    }
    return res
}
```

```kotlin
class Solution {
    fun partitionString(s: String): Int {
        var res = 1
        var mask = 0
        for (c in s) {
            val i = c - 'a'
            if (mask and (1 shl i) != 0) {
                mask = 0
                res++
            }
            mask = mask or (1 shl i)
        }
        return res
    }
}
```

```swift
class Solution {
    func partitionString(_ s: String) -> Int {
        var res = 1
        var mask = 0
        for c in s {
            let i = Int(c.asciiValue! - Character("a").asciiValue!)
            if mask & (1 << i) != 0 {
                mask = 0
                res += 1
            }
            mask |= 1 << i
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Starting the Result Counter at Zero

A common mistake is initializing `res = 0` instead of `res = 1`. Since we are counting partitions and the string is non-empty, we always have at least one partition. Starting at zero would undercount by one because the final substring after the last split is never explicitly counted when we only increment on encountering duplicates.

### Forgetting to Add the Character After Clearing the Set

When a duplicate is found, some implementations clear the set but forget to add the current character to the fresh set. This leads to incorrect behavior because the duplicate character that triggered the new partition should be the first character of that new partition.

### Treating the Problem as Finding Unique Substrings

Some solvers confuse this with finding all unique substrings or counting unique characters globally. The goal is to partition the string such that each partition has unique characters within itself, not across the entire string. Each partition is independent and can reuse characters from previous partitions.