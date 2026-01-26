## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Hash Maps** - Used to group website visits by user and count pattern frequencies
- **Sets** - Used to avoid counting duplicate patterns from the same user
- **Sorting** - Required to process visits in chronological order
- **Combinatorics (Triple Nested Loops)** - Generating all 3-element subsequences from a list

---

## 1. Hash Map

### Intuition

We need to find the most common 3-website pattern visited by users in sequential order. The key insight is that we should group each user's website visits in chronological order, then generate all possible 3-site combinations for each user. By counting how many distinct users visit each pattern, we can find the most popular one.

Since we want patterns across different users (not repeated visits by the same user), we use a `set` for each user's patterns before counting. This ensures each user contributes at most once to each pattern's `count`.

### Algorithm

1. Sort all visits by timestamp to ensure chronological order.
2. Group websites by user, maintaining the order of visits.
3. For each user, generate all possible 3-website patterns using three nested loops `i`, `j`, `k`. Store patterns in a `set` to avoid counting duplicates from the same user.
4. Count how many users have each pattern.
5. Return the pattern with the highest `count`, breaking ties lexicographically.

::tabs-start

```python
class Solution:
    def mostVisitedPattern(self, username: List[str], timestamp: List[int], website: List[str]) -> List[str]:
        arr = list(zip(timestamp, username, website))
        arr.sort()

        mp = defaultdict(list)
        for time, user, site in arr:
            mp[user].append(site)

        count = defaultdict(int)
        for user in mp:
            patterns = set()
            cur = mp[user]
            for i in range(len(cur)):
                for j in range(i + 1, len(cur)):
                    for k in range(j + 1, len(cur)):
                        patterns.add((cur[i], cur[j], cur[k]))
            for p in patterns:
                count[p] += 1

        max_count = 0
        res = tuple()
        for pattern in count:
            if count[pattern] > max_count or (count[pattern] == max_count and pattern < res):
                max_count = count[pattern]
                res = pattern

        return list(res)
```

```java
public class Solution {
    public List<String> mostVisitedPattern(String[] username, int[] timestamp, String[] website) {
        int n = timestamp.length;
        List<int[]> arr = new ArrayList<>();
        for (int i = 0; i < n; i++) arr.add(new int[]{timestamp[i], i});
        arr.sort((a, b) -> Integer.compare(a[0], b[0]));

        Map<String, List<String>> mp = new HashMap<>();
        for (int[] p : arr) {
            int idx = p[1];
            mp.computeIfAbsent(username[idx], k -> new ArrayList<>()).add(website[idx]);
        }

        Map<String, Integer> count = new HashMap<>();
        for (String user : mp.keySet()) {
            List<String> cur = mp.get(user);
            Set<String> patterns = new HashSet<>();
            for (int i = 0; i < cur.size(); i++)
                for (int j = i + 1; j < cur.size(); j++)
                    for (int k = j + 1; k < cur.size(); k++)
                        patterns.add(cur.get(i) + "#" + cur.get(j) + "#" + cur.get(k));
            for (String p : patterns)
                count.put(p, count.getOrDefault(p, 0) + 1);
        }

        String res = "";
        int max_count = 0;
        for (String p : count.keySet()) {
            int c = count.get(p);
            if (c > max_count || (c == max_count && p.compareTo(res) < 0)) {
                max_count = c;
                res = p;
            }
        }
        return Arrays.asList(res.split("#"));
    }
}
```

```cpp
class Solution {
public:
    vector<string> mostVisitedPattern(vector<string>& username, vector<int>& timestamp, vector<string>& website) {
        int n = timestamp.size();
        vector<pair<int,int>> arr;
        for (int i = 0; i < n; ++i) arr.push_back({timestamp[i], i});
        sort(arr.begin(), arr.end(),
             [](auto& a, auto& b){ return a.first < b.first; });

        unordered_map<string, vector<string>> mp;
        for (auto& p : arr) mp[username[p.second]].push_back(website[p.second]);

        unordered_map<string,int> count;
        for (auto& kv : mp) {
            auto& cur = kv.second;
            unordered_set<string> patterns;
            for (int i = 0; i < (int)cur.size(); ++i)
                for (int j = i + 1; j < (int)cur.size(); ++j)
                    for (int k = j + 1; k < (int)cur.size(); ++k)
                        patterns.insert(cur[i] + "#" + cur[j] + "#" + cur[k]);
            for (auto& p : patterns) ++count[p];
        }

        int maxCnt = 0;
        string res;
        for (auto& kv : count)
            if (kv.second > maxCnt ||
               (kv.second == maxCnt && (res.empty() || kv.first < res))) {
                maxCnt = kv.second;
                res = kv.first;
            }

        vector<string> ans;
        string tmp;
        for (char ch : res) {
            if (ch == '#') {
                ans.push_back(tmp);
                tmp.clear();
            } else {
                tmp += ch;
            }
        }
        ans.push_back(tmp);
        return ans;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} username
     * @param {number[]} timestamp
     * @param {string[]} website
     * @return {string[]}
     */
    mostVisitedPattern(username, timestamp, website) {
        const n = timestamp.length;
        const arr = [];
        for (let i = 0; i < n; i++) arr.push([timestamp[i], i]);
        arr.sort((a, b) => a[0] - b[0]);

        const mp = new Map();
        for (const [, idx] of arr) {
            const user = username[idx],
                site = website[idx];
            if (!mp.has(user)) mp.set(user, []);
            mp.get(user).push(site);
        }

        const count = new Map();
        for (const user of mp.keys()) {
            const cur = mp.get(user);
            const patterns = new Set();
            for (let i = 0; i < cur.length; i++) {
                for (let j = i + 1; j < cur.length; j++) {
                    for (let k = j + 1; k < cur.length; k++) {
                        patterns.add(`${cur[i]}#${cur[j]}#${cur[k]}`);
                    }
                }
            }
            for (const p of patterns) {
                count.set(p, (count.get(p) || 0) + 1);
            }
        }

        let maxCnt = 0,
            res = '';
        for (const [pat, c] of count.entries()) {
            if (c > maxCnt || (c === maxCnt && (res === '' || pat < res))) {
                maxCnt = c;
                res = pat;
            }
        }
        return res.split('#');
    }
}
```

```csharp
public class Solution {
    public List<string> MostVisitedPattern(string[] username, int[] timestamp, string[] website) {
        int n = timestamp.Length;
        var arr = new List<(int t, int i)>();
        for (int i = 0; i < n; i++) arr.Add((timestamp[i], i));
        arr.Sort((a, b) => a.t.CompareTo(b.t));

        var mp = new Dictionary<string, List<string>>();
        foreach (var (t, idx) in arr) {
            string user = username[idx], site = website[idx];
            if (!mp.ContainsKey(user)) mp[user] = new List<string>();
            mp[user].Add(site);
        }

        var count = new Dictionary<string,int>();
        foreach (var kv in mp) {
            var cur = kv.Value;
            var patterns = new HashSet<string>();
            for (int i = 0; i < cur.Count; i++)
                for (int j = i + 1; j < cur.Count; j++)
                    for (int k = j + 1; k < cur.Count; k++)
                        patterns.Add($"{cur[i]}#{cur[j]}#{cur[k]}");
            foreach (var p in patterns) {
                count[p] = count.ContainsKey(p) ? count[p] + 1 : 1;
            }
        }

        int maxCnt = 0;
        string res = "";
        foreach (var kv in count) {
            if (kv.Value > maxCnt ||
                (kv.Value == maxCnt &&
                (res == "" || string.Compare(kv.Key, res, StringComparison.Ordinal) < 0))) {
                maxCnt = kv.Value;
                res = kv.Key;
            }
        }
        return new List<string>(res.Split('#'));
    }
}
```

```go
func mostVisitedPattern(username []string, timestamp []int, website []string) []string {
    n := len(timestamp)
    arr := make([][2]int, n)
    for i := 0; i < n; i++ {
        arr[i] = [2]int{timestamp[i], i}
    }
    sort.Slice(arr, func(i, j int) bool {
        return arr[i][0] < arr[j][0]
    })

    mp := make(map[string][]string)
    for _, p := range arr {
        idx := p[1]
        mp[username[idx]] = append(mp[username[idx]], website[idx])
    }

    count := make(map[string]int)
    for _, cur := range mp {
        patterns := make(map[string]bool)
        for i := 0; i < len(cur); i++ {
            for j := i + 1; j < len(cur); j++ {
                for k := j + 1; k < len(cur); k++ {
                    patterns[cur[i]+"#"+cur[j]+"#"+cur[k]] = true
                }
            }
        }
        for p := range patterns {
            count[p]++
        }
    }

    maxCnt := 0
    res := ""
    for p, c := range count {
        if c > maxCnt || (c == maxCnt && (res == "" || p < res)) {
            maxCnt = c
            res = p
        }
    }
    return strings.Split(res, "#")
}
```

```kotlin
class Solution {
    fun mostVisitedPattern(username: Array<String>, timestamp: IntArray, website: Array<String>): List<String> {
        val n = timestamp.size
        val arr = (0 until n).map { intArrayOf(timestamp[it], it) }.sortedBy { it[0] }

        val mp = mutableMapOf<String, MutableList<String>>()
        for ((_, idx) in arr) {
            mp.getOrPut(username[idx]) { mutableListOf() }.add(website[idx])
        }

        val count = mutableMapOf<String, Int>()
        for ((_, cur) in mp) {
            val patterns = mutableSetOf<String>()
            for (i in cur.indices) {
                for (j in i + 1 until cur.size) {
                    for (k in j + 1 until cur.size) {
                        patterns.add("${cur[i]}#${cur[j]}#${cur[k]}")
                    }
                }
            }
            for (p in patterns) {
                count[p] = count.getOrDefault(p, 0) + 1
            }
        }

        var maxCnt = 0
        var res = ""
        for ((p, c) in count) {
            if (c > maxCnt || (c == maxCnt && (res.isEmpty() || p < res))) {
                maxCnt = c
                res = p
            }
        }
        return res.split("#")
    }
}
```

```swift
class Solution {
    func mostVisitedPattern(_ username: [String], _ timestamp: [Int], _ website: [String]) -> [String] {
        let n = timestamp.count
        var arr = [(Int, Int)]()
        for i in 0..<n {
            arr.append((timestamp[i], i))
        }
        arr.sort { $0.0 < $1.0 }

        var mp = [String: [String]]()
        for (_, idx) in arr {
            let user = username[idx]
            let site = website[idx]
            mp[user, default: []].append(site)
        }

        var count = [String: Int]()
        for (_, cur) in mp {
            var patterns = Set<String>()
            for i in 0..<cur.count {
                for j in (i + 1)..<cur.count {
                    for k in (j + 1)..<cur.count {
                        patterns.insert("\(cur[i])#\(cur[j])#\(cur[k])")
                    }
                }
            }
            for p in patterns {
                count[p, default: 0] += 1
            }
        }

        var maxCnt = 0
        var res = ""
        for (p, c) in count {
            if c > maxCnt || (c == maxCnt && (res.isEmpty || p < res)) {
                maxCnt = c
                res = p
            }
        }
        return res.components(separatedBy: "#")
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n + n * u +  n ^ 3 * w)$
- Space complexity: $O(n * u + n ^ 3 * w)$

> Where $n$ is the size of the array $timestamp$, $u$ is the maximum length of any string in the array $username$, and $w$ is the maximum length of any string in the array $website$.

---

## Common Pitfalls

### Counting Duplicate Patterns From the Same User
When a user visits enough websites to generate the same 3-site pattern multiple times, you should only count that pattern once per user. Failing to use a set for each user's patterns will inflate the count incorrectly.
```python
# Wrong: counting duplicates from same user
for i in range(len(cur)):
    for j in range(i + 1, len(cur)):
        for k in range(j + 1, len(cur)):
            count[(cur[i], cur[j], cur[k])] += 1  # Same user counted multiple times

# Correct: use set per user first
patterns = set()
for i, j, k in combinations:
    patterns.add((cur[i], cur[j], cur[k]))
for p in patterns:
    count[p] += 1
```

### Not Sorting Visits by Timestamp Before Grouping
The pattern must follow chronological order of visits. If you group websites by user without first sorting by timestamp, the patterns will be in arbitrary order and produce wrong results.
```python
# Wrong: not sorting by timestamp
for i in range(n):
    mp[username[i]].append(website[i])  # Order depends on input, not time

# Correct: sort first
arr.sort(key=lambda x: x[0])  # Sort by timestamp
```

### Incorrect Lexicographic Comparison for Tie-Breaking
When multiple patterns have the same count, you must return the lexicographically smallest one. Comparing concatenated strings with a separator may not give correct lexicographic ordering of the tuple components.
```python
# Wrong: comparing by concatenated string may differ from tuple comparison
if "a#z#b" < "aa#a#a":  # String comparison, not tuple comparison

# Correct: compare as tuples or ensure proper tuple-based comparison
if pattern < res:  # Where pattern and res are tuples
```
