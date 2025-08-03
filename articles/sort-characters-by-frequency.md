## 1. Sorting

::tabs-start

```python
class Solution:
    def frequencySort(self, s: str) -> str:
        count = Counter(s)
        sorted_chars = sorted(s, key=lambda x: (-count[x], x))
        return ''.join(sorted_chars)
```

```java
public class Solution {
    public String frequencySort(String s) {
        int[] count = new int[123];
        for (char c : s.toCharArray()) {
            count[c]++;
        }

        Character[] chars = new Character[s.length()];
        for (int i = 0; i < s.length(); i++) {
            chars[i] = s.charAt(i);
        }

        Arrays.sort(chars, (a, b) -> {
            if (count[b] == count[a]) {
                return a - b;
            }
            return count[b] - count[a];
        });

        StringBuilder result = new StringBuilder();
        for (char c : chars) {
            result.append(c);
        }

        return result.toString();
    }
}
```

```cpp
class Solution {
public:
    string frequencySort(string s) {
        vector<int> count(123);
        for (char c : s) {
            count[c]++;
        }

        vector<char> chars(s.begin(), s.end());
        sort(chars.begin(), chars.end(), [&](char a, char b) {
            if (count[b] == count[a]) {
                return a < b;
            }
            return count[b] < count[a];
        });

        return string(chars.begin(), chars.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    frequencySort(s) {
        const count = {};
        for (const char of s) {
            count[char] = (count[char] || 0) + 1;
        }

        const sortedChars = [...s].sort((a, b) => {
            if (count[b] === count[a]) {
                return a.localeCompare(b);
            }
            return count[b] - count[a];
        });

        return sortedChars.join('');
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 2. Frequency Sort

::tabs-start

```python
class Solution:
    def frequencySort(self, s: str) -> str:
        count = [0] * 123
        for c in s:
            count[ord(c)] += 1

        freq = [(chr(i), count[i]) for i in range(123) if count[i] > 0]
        freq.sort(key=lambda x: (-x[1], x[0]))

        return ''.join(char * freq for char, freq in freq)
```

```java
public class Solution {
    public String frequencySort(String s) {
        int[] count = new int[123];
        for (char c : s.toCharArray()) {
            count[c]++;
        }

        List<int[]> freq = new ArrayList<>();
        for (int i = 0; i < 123; i++) {
            if (count[i] > 0) {
                freq.add(new int[]{i, count[i]});
            }
        }

        freq.sort((a, b) -> {
            if (b[1] == a[1]) {
                return a[0] - b[0];
            }
            return b[1] - a[1];
        });

        StringBuilder res = new StringBuilder();
        for (int[] entry : freq) {
            for (int i = 0; i < entry[1]; i++) {
                res.append((char) entry[0]);
            }
        }

        return res.toString();
    }
}
```

```cpp
class Solution {
public:
    string frequencySort(string s) {
        vector<int> count(123, 0);
        for (char c : s) {
            count[c]++;
        }

        vector<pair<char, int>> freq;
        for (int i = 0; i < 123; i++) {
            if (count[i] > 0) {
                freq.emplace_back((char)i, count[i]);
            }
        }

        sort(freq.begin(), freq.end(), [](auto& a, auto& b) {
            if (a.second == b.second) {
                return a.first < b.first;
            }
            return a.second > b.second;
        });

        string res;
        for (const auto& entry : freq) {
            res += string(entry.second, entry.first);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    frequencySort(s) {
        const count = new Array(123).fill(0);
        for (const char of s) {
            count[char.charCodeAt(0)]++;
        }

        const freq = [];
        for (let i = 0; i < 123; i++) {
            if (count[i] > 0) {
                freq.push([String.fromCharCode(i), count[i]]);
            }
        }

        freq.sort((a, b) => {
            if (b[1] === a[1]) {
                return a[0].localeCompare(b[0]);
            }
            return b[1] - a[1];
        });

        let res = '';
        for (const [char, freqCount] of freq) {
            res += char.repeat(freqCount);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for the output string.

---

## 3. Bucket Sort

::tabs-start

```python
class Solution:
    def frequencySort(self, s: str) -> str:
        count = Counter(s)  # char -> freq
        buckets = defaultdict(list)  # freq -> [char]

        for char, freq in count.items():
            buckets[freq].append(char)

        res = []
        for i in range(len(s), 0, -1):
            if i in buckets:
                for c in buckets[i]:
                    res.append(c * i)

        return "".join(res)
```

```java
public class Solution {
    public String frequencySort(String s) {
        Map<Character, Integer> count = new HashMap<>();
        for (char c : s.toCharArray()) {
            count.put(c, count.getOrDefault(c, 0) + 1);
        }

        List<List<Character>> buckets = new ArrayList<>(s.length() + 1);
        for (int i = 0; i <= s.length(); i++) {
            buckets.add(new ArrayList<>());
        }

        for (Map.Entry<Character, Integer> entry : count.entrySet()) {
            buckets.get(entry.getValue()).add(entry.getKey());
        }

        StringBuilder res = new StringBuilder();
        for (int i = s.length(); i > 0; i--) {
            for (char c : buckets.get(i)) {
                for (int j = 0; j < i; j++) {
                    res.append(c);
                }
            }
        }

        return res.toString();
    }
}
```

```cpp
class Solution {
public:
    string frequencySort(string s) {
        unordered_map<char, int> count;
        for (char c : s) {
            count[c]++;
        }

        vector<vector<char>> buckets(s.size() + 1);
        for (auto& entry : count) {
            buckets[entry.second].push_back(entry.first);
        }

        string res;
        for (int i = s.size(); i > 0; i--) {
            for (char c : buckets[i]) {
                res += string(i, c);
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
     * @return {string}
     */
    frequencySort(s) {
        const count = {};
        for (const char of s) {
            count[char] = (count[char] || 0) + 1;
        }

        const buckets = Array.from({ length: s.length + 1 }, () => []);
        for (const [char, freq] of Object.entries(count)) {
            buckets[freq].push(char);
        }

        let res = '';
        for (let i = s.length; i > 0; i--) {
            for (const char of buckets[i]) {
                res += char.repeat(i);
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
