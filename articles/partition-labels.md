## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Hash Maps** - Used to store and quickly lookup the last occurrence index of each character
- **Greedy Algorithms** - The solution makes locally optimal choices (extending partition to farthest last occurrence) to achieve the global optimum
- **Two Pointers / Sliding Window** - Tracking the current position and the end boundary of each partition

---

## 1. Two Pointers (Greedy)

### Intuition

We want to split the string into as many parts as possible such that **each letter appears in at most one part**.

The key observation is:
- for any character, we must include **all occurrences** of that character in the same partition
- so if a character appears later in the string, the current partition must extend at least up to that last occurrence

By knowing the **last index** of every character, we can greedily decide where to end each partition.

As we scan the string:
- we keep extending the current partition to the farthest last occurrence of any character seen so far
- once we reach that farthest point, the partition can safely end

### Algorithm

1. First, record the last index of every character in the string.
2. Initialize:
   - an empty list `res` to store partition sizes
   - `size = 0` for the current partition length
   - `end = 0` for the farthest index the current partition must reach
3. Iterate through the string with index `i`:
4. For each character `c`:
   - increment the current partition size
   - update `end = max(end, lastIndex[c])`
5. If `i == end`:
   - we have reached the end of the current partition
   - append `size` to `res`
   - reset `size` to `0`
6. After processing the whole string, return `res`

::tabs-start

```python
class Solution:
    def partitionLabels(self, s: str) -> List[int]:
        lastIndex = {}
        for i, c in enumerate(s):
            lastIndex[c] = i

        res = []
        size = end = 0
        for i, c in enumerate(s):
            size += 1
            end = max(end, lastIndex[c])

            if i == end:
                res.append(size)
                size = 0
        return res
```

```java
public class Solution {
    public List<Integer> partitionLabels(String s) {
        Map<Character, Integer> lastIndex = new HashMap<>();
        for (int i = 0; i < s.length(); i++) {
            lastIndex.put(s.charAt(i), i);
        }

        List<Integer> res = new ArrayList<>();
        int size = 0, end = 0;
        for (int i = 0; i < s.length(); i++) {
            size++;
            end = Math.max(end, lastIndex.get(s.charAt(i)));

            if (i == end) {
                res.add(size);
                size = 0;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> partitionLabels(string s) {
        unordered_map<char, int> lastIndex;
        for (int i = 0; i < s.size(); i++) {
            lastIndex[s[i]] = i;
        }

        vector<int> res;
        int size = 0, end = 0;
        for (int i = 0; i < s.size(); i++) {
            size++;
            end = max(end, lastIndex[s[i]]);

            if (i == end) {
                res.push_back(size);
                size = 0;
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} S
     * @return {number[]}
     */
    partitionLabels(S) {
        let lastIndex = {};
        for (let i = 0; i < S.length; i++) {
            lastIndex[S[i]] = i;
        }

        let res = [];
        let size = 0,
            end = 0;
        for (let i = 0; i < S.length; i++) {
            size++;
            end = Math.max(end, lastIndex[S[i]]);

            if (i === end) {
                res.push(size);
                size = 0;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public List<int> PartitionLabels(string s) {
        Dictionary<char, int> lastIndex = new Dictionary<char, int>();
        for (int i = 0; i < s.Length; i++) {
            lastIndex[s[i]] = i;
        }

        List<int> res = new List<int>();
        int size = 0, end = 0;
        for (int i = 0; i < s.Length; i++) {
            size++;
            end = Math.Max(end, lastIndex[s[i]]);

            if (i == end) {
                res.Add(size);
                size = 0;
            }
        }
        return res;
    }
}
```

```go
func partitionLabels(s string) []int {
    lastIndex := make(map[rune]int)
    for i, c := range s {
        lastIndex[c] = i
    }

    var res []int
    size, end := 0, 0
    for i, c := range s {
        size++
        if lastIndex[c] > end {
            end = lastIndex[c]
        }

        if i == end {
            res = append(res, size)
            size = 0
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun partitionLabels(s: String): List<Int> {
        val lastIndex = HashMap<Char, Int>()
        s.forEachIndexed { i, c -> lastIndex[c] = i }

        val res = mutableListOf<Int>()
        var size = 0
        var end = 0
        for (i in s.indices) {
            size++
            end = maxOf(end, lastIndex[s[i]] ?: 0)

            if (i == end) {
                res.add(size)
                size = 0
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func partitionLabels(_ s: String) -> [Int] {
        var lastIndex = [Character: Int]()
        for (i, c) in s.enumerated() {
            lastIndex[c] = i
        }

        var res = [Int]()
        var size = 0
        var end = 0
        for (i, c) in s.enumerated() {
            size += 1
            end = max(end, lastIndex[c]!)

            if i == end {
                res.append(size)
                size = 0
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

> Where $n$ is the length of the string $s$ and $m$ is the number of unique characters in the string $s$.

---

## Common Pitfalls

### Not Precomputing Last Indices

A common mistake is trying to find the last occurrence of each character on the fly during the main traversal. This leads to O(n^2) time complexity. You must precompute the last index of every character in a first pass to achieve O(n) time.

### Forgetting to Reset Partition Size

After completing a partition (when `i == end`), forgetting to reset the `size` counter to 0 causes partition sizes to accumulate incorrectly. Each new partition must start with a fresh count.

### Off-by-One Errors with Partition Boundaries

When checking if the current index equals the end of the partition, make sure to use the correct comparison. The partition ends when `i == end`, not `i > end` or `i >= end`. An off-by-one error here will either split partitions prematurely or merge partitions that should be separate.
