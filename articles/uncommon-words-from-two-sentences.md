## 1. Hash Map - I

### Intuition

A word is uncommon if it appears exactly once across both sentences. We can combine both sentences and count the frequency of each word. Any word with a count of 1 is uncommon.

### Algorithm

1. Split both sentences into words and combine them.
2. Use a hash map to count the frequency of each word.
3. Iterate through the hash map and collect all words with a count of `1`.
4. Return the list of uncommon words.

::tabs-start

```python
class Solution:
    def uncommonFromSentences(self, s1: str, s2: str) -> List[str]:
        count = defaultdict(int)
        for w in s1.split(" ") + s2.split(" "):
            count[w] += 1

        res = []
        for w, cnt in count.items():
            if cnt == 1:
                res.append(w)
        return res
```

```java
public class Solution {
    public String[] uncommonFromSentences(String s1, String s2) {
        String[] words = (s1 + " " + s2).split(" ");
        Map<String, Integer> count = new HashMap<>();

        for (String w : words) {
            count.put(w, count.getOrDefault(w, 0) + 1);
        }

        List<String> res = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : count.entrySet()) {
            if (entry.getValue() == 1) {
                res.add(entry.getKey());
            }
        }

        return res.toArray(new String[0]);
    }
}
```

```cpp
class Solution {
public:
    vector<string> uncommonFromSentences(string s1, string s2) {
        unordered_map<string, int> count;
        istringstream ss(s1 + " " + s2);
        string w;
        while (ss >> w) {
            count[w]++;
        }

        vector<string> res;
        for (auto& [word, freq] : count) {
            if (freq == 1) {
                res.push_back(word);
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s1
     * @param {string} s2
     * @return {string[]}
     */
    uncommonFromSentences(s1, s2) {
        const words = (s1 + ' ' + s2).split(' ');
        const count = new Map();

        for (const w of words) {
            count.set(w, (count.get(w) || 0) + 1);
        }

        const res = [];
        for (const [w, c] of count.entries()) {
            if (c === 1) {
                res.push(w);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public string[] UncommonFromSentences(string s1, string s2) {
        string[] words = (s1 + " " + s2).Split(' ');
        Dictionary<string, int> count = new Dictionary<string, int>();

        foreach (string w in words) {
            if (count.ContainsKey(w)) {
                count[w]++;
            } else {
                count[w] = 1;
            }
        }

        List<string> res = new List<string>();
        foreach (var entry in count) {
            if (entry.Value == 1) {
                res.Add(entry.Key);
            }
        }

        return res.ToArray();
    }
}
```

```go
func uncommonFromSentences(s1 string, s2 string) []string {
    words := strings.Split(s1 + " " + s2, " ")
    count := make(map[string]int)

    for _, w := range words {
        count[w]++
    }

    res := []string{}
    for w, c := range count {
        if c == 1 {
            res = append(res, w)
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun uncommonFromSentences(s1: String, s2: String): Array<String> {
        val words = "$s1 $s2".split(" ")
        val count = mutableMapOf<String, Int>()

        for (w in words) {
            count[w] = count.getOrDefault(w, 0) + 1
        }

        val res = mutableListOf<String>()
        for ((w, c) in count) {
            if (c == 1) {
                res.add(w)
            }
        }

        return res.toTypedArray()
    }
}
```

```swift
class Solution {
    func uncommonFromSentences(_ s1: String, _ s2: String) -> [String] {
        let words = (s1 + " " + s2).split(separator: " ").map { String($0) }
        var count = [String: Int]()

        for w in words {
            count[w, default: 0] += 1
        }

        var res = [String]()
        for (w, c) in count {
            if c == 1 {
                res.append(w)
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$

> Where $n$ and $m$ are the lengths of the strings $s1$ and $s2$, respectively.

---

## 2. Hash Map - II

### Intuition

This is a more concise version of the same approach. We use built-in functions like `Counter` (in Python) or stream operations (in Java) to reduce boilerplate while maintaining the same logic.

### Algorithm

1. Combine and split both sentences into words.
2. Count word frequencies using a built-in counter or grouping function.
3. Filter to keep only words with count equal to `1`.
4. Return the filtered words.

::tabs-start

```python
class Solution:
    def uncommonFromSentences(self, s1: str, s2: str) -> List[str]:
        return [w for w, cnt in Counter(s1.split(" ") + s2.split(" ")).items() if cnt == 1]
```

```java
public class Solution {
    public String[] uncommonFromSentences(String s1, String s2) {
        String[] words = (s1 + " " + s2).split(" ");
        Map<String, Integer> count = new HashMap<>();

        for (String w : words) {
            count.put(w, count.getOrDefault(w, 0) + 1);
        }

        return count.entrySet()
                    .stream()
                    .filter(e -> e.getValue() == 1)
                    .map(Map.Entry::getKey)
                    .toArray(String[]::new);
    }
}
```

```cpp
class Solution {
public:
    vector<string> uncommonFromSentences(string s1, string s2) {
        unordered_map<string, int> count;
        istringstream ss(s1 + " " + s2);
        string w;
        while (ss >> w) {
            count[w]++;
        }

        vector<string> res;
        for (auto& [w, c] : count) {
            if (c == 1) {
                res.push_back(w);
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s1
     * @param {string} s2
     * @return {string[]}
     */
    uncommonFromSentences(s1, s2) {
        const words = (s1 + ' ' + s2).split(' ');
        const count = new Map();

        for (const w of words) {
            count.set(w, (count.get(w) || 0) + 1);
        }

        return [...count.entries()].filter(([_, c]) => c === 1).map(([w]) => w);
    }
}
```

```csharp
public class Solution {
    public string[] UncommonFromSentences(string s1, string s2) {
        string[] words = (s1 + " " + s2).Split(' ');
        Dictionary<string, int> count = new Dictionary<string, int>();

        foreach (string w in words) {
            if (count.ContainsKey(w)) {
                count[w]++;
            } else {
                count[w] = 1;
            }
        }

        return count.Where(e => e.Value == 1)
                    .Select(e => e.Key)
                    .ToArray();
    }
}
```

```go
func uncommonFromSentences(s1 string, s2 string) []string {
    words := strings.Split(s1 + " " + s2, " ")
    count := make(map[string]int)

    for _, w := range words {
        count[w]++
    }

    res := []string{}
    for w, c := range count {
        if c == 1 {
            res = append(res, w)
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun uncommonFromSentences(s1: String, s2: String): Array<String> {
        val words = "$s1 $s2".split(" ")
        val count = words.groupingBy { it }.eachCount()

        return count.filter { it.value == 1 }
                    .keys
                    .toTypedArray()
    }
}
```

```swift
class Solution {
    func uncommonFromSentences(_ s1: String, _ s2: String) -> [String] {
        let words = (s1 + " " + s2).split(separator: " ").map { String($0) }
        var count = [String: Int]()

        for w in words {
            count[w, default: 0] += 1
        }

        return count.filter { $0.value == 1 }.map { $0.key }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$

> Where $n$ and $m$ are the lengths of the strings $s1$ and $s2$, respectively.
