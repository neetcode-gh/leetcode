## 1. Two Pointers (Greedy)

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
        let size = 0, end = 0;
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(m)$

> Where $n$ is the length of the string $s$ and $m$ is the number of unique characters in the string $s$.