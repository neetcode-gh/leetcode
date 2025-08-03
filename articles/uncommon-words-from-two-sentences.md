## 1. Hash Map - I

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$

> Where $n$ and $m$ are the lengths of the strings $s1$ and $s2$, respectively.

---

## 2. Hash Map - II

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$

> Where $n$ and $m$ are the lengths of the strings $s1$ and $s2$, respectively.
