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

```csharp
public class Solution {
    public string FrequencySort(string s) {
        int[] count = new int[123];
        foreach (char c in s) {
            count[c]++;
        }

        char[] chars = s.ToCharArray();
        Array.Sort(chars, (a, b) => {
            if (count[b] == count[a]) {
                return a.CompareTo(b);
            }
            return count[b].CompareTo(count[a]);
        });

        return new string(chars);
    }
}
```

```go
func frequencySort(s string) string {
    count := make([]int, 123)
    for _, c := range s {
        count[c]++
    }

    chars := []rune(s)
    sort.Slice(chars, func(i, j int) bool {
        if count[chars[i]] == count[chars[j]] {
            return chars[i] < chars[j]
        }
        return count[chars[i]] > count[chars[j]]
    })

    return string(chars)
}
```

```kotlin
class Solution {
    fun frequencySort(s: String): String {
        val count = IntArray(123)
        for (c in s) {
            count[c.code]++
        }

        return s.toCharArray()
            .sortedWith(compareBy({ -count[it.code] }, { it }))
            .joinToString("")
    }
}
```

```swift
class Solution {
    func frequencySort(_ s: String) -> String {
        var count = [Int](repeating: 0, count: 123)
        for c in s {
            count[Int(c.asciiValue!)] += 1
        }

        let sortedChars = s.sorted { a, b in
            let countA = count[Int(a.asciiValue!)]
            let countB = count[Int(b.asciiValue!)]
            if countA == countB {
                return a < b
            }
            return countA > countB
        }

        return String(sortedChars)
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

```csharp
public class Solution {
    public string FrequencySort(string s) {
        int[] count = new int[123];
        foreach (char c in s) {
            count[c]++;
        }

        var freq = new List<(char ch, int cnt)>();
        for (int i = 0; i < 123; i++) {
            if (count[i] > 0) {
                freq.Add(((char)i, count[i]));
            }
        }

        freq.Sort((a, b) => {
            if (b.cnt == a.cnt) {
                return a.ch.CompareTo(b.ch);
            }
            return b.cnt.CompareTo(a.cnt);
        });

        var res = new StringBuilder();
        foreach (var (ch, cnt) in freq) {
            res.Append(ch, cnt);
        }

        return res.ToString();
    }
}
```

```go
func frequencySort(s string) string {
    count := make([]int, 123)
    for _, c := range s {
        count[c]++
    }

    type pair struct {
        ch   rune
        freq int
    }

    freq := []pair{}
    for i := 0; i < 123; i++ {
        if count[i] > 0 {
            freq = append(freq, pair{rune(i), count[i]})
        }
    }

    sort.Slice(freq, func(i, j int) bool {
        if freq[i].freq == freq[j].freq {
            return freq[i].ch < freq[j].ch
        }
        return freq[i].freq > freq[j].freq
    })

    var res strings.Builder
    for _, p := range freq {
        for i := 0; i < p.freq; i++ {
            res.WriteRune(p.ch)
        }
    }

    return res.String()
}
```

```kotlin
class Solution {
    fun frequencySort(s: String): String {
        val count = IntArray(123)
        for (c in s) {
            count[c.code]++
        }

        val freq = mutableListOf<Pair<Char, Int>>()
        for (i in 0 until 123) {
            if (count[i] > 0) {
                freq.add(Pair(i.toChar(), count[i]))
            }
        }

        freq.sortWith(compareBy({ -it.second }, { it.first }))

        val res = StringBuilder()
        for ((ch, cnt) in freq) {
            repeat(cnt) { res.append(ch) }
        }

        return res.toString()
    }
}
```

```swift
class Solution {
    func frequencySort(_ s: String) -> String {
        var count = [Int](repeating: 0, count: 123)
        for c in s {
            count[Int(c.asciiValue!)] += 1
        }

        var freq = [(Character, Int)]()
        for i in 0..<123 {
            if count[i] > 0 {
                freq.append((Character(UnicodeScalar(i)!), count[i]))
            }
        }

        freq.sort { a, b in
            if a.1 == b.1 {
                return a.0 < b.0
            }
            return a.1 > b.1
        }

        var res = ""
        for (ch, cnt) in freq {
            res += String(repeating: String(ch), count: cnt)
        }

        return res
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

```csharp
public class Solution {
    public string FrequencySort(string s) {
        var count = new Dictionary<char, int>();
        foreach (char c in s) {
            if (!count.ContainsKey(c)) count[c] = 0;
            count[c]++;
        }

        var buckets = new List<List<char>>(s.Length + 1);
        for (int i = 0; i <= s.Length; i++) {
            buckets.Add(new List<char>());
        }

        foreach (var entry in count) {
            buckets[entry.Value].Add(entry.Key);
        }

        var res = new StringBuilder();
        for (int i = s.Length; i > 0; i--) {
            foreach (char c in buckets[i]) {
                res.Append(c, i);
            }
        }

        return res.ToString();
    }
}
```

```go
func frequencySort(s string) string {
    count := make(map[rune]int)
    for _, c := range s {
        count[c]++
    }

    buckets := make([][]rune, len(s)+1)
    for i := range buckets {
        buckets[i] = []rune{}
    }

    for char, freq := range count {
        buckets[freq] = append(buckets[freq], char)
    }

    var res strings.Builder
    for i := len(s); i > 0; i-- {
        for _, c := range buckets[i] {
            for j := 0; j < i; j++ {
                res.WriteRune(c)
            }
        }
    }

    return res.String()
}
```

```kotlin
class Solution {
    fun frequencySort(s: String): String {
        val count = mutableMapOf<Char, Int>()
        for (c in s) {
            count[c] = count.getOrDefault(c, 0) + 1
        }

        val buckets = MutableList(s.length + 1) { mutableListOf<Char>() }
        for ((char, freq) in count) {
            buckets[freq].add(char)
        }

        val res = StringBuilder()
        for (i in s.length downTo 1) {
            for (c in buckets[i]) {
                repeat(i) { res.append(c) }
            }
        }

        return res.toString()
    }
}
```

```swift
class Solution {
    func frequencySort(_ s: String) -> String {
        var count = [Character: Int]()
        for c in s {
            count[c, default: 0] += 1
        }

        var buckets = [[Character]](repeating: [], count: s.count + 1)
        for (char, freq) in count {
            buckets[freq].append(char)
        }

        var res = ""
        for i in stride(from: s.count, through: 1, by: -1) {
            for c in buckets[i] {
                res += String(repeating: String(c), count: i)
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
