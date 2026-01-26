## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Hash Sets** - Using sets for O(1) lookups to check if swapped names already exist
- **Hash Maps** - Grouping strings by their first character for efficient processing
- **String Manipulation** - Extracting substrings and swapping characters
- **Set Intersection** - Understanding how to count common elements between two sets to identify invalid swaps

---

## 1. Brute Force

### Intuition

To form a valid company name, we pick two distinct ideas and swap their first letters. The resulting two names must both be new (not in the original list). A straightforward approach checks every pair of ideas, performs the swap, and verifies that neither swapped name exists in the original set. We track valid combinations in a set to avoid counting duplicates.

This works but is slow because we examine O(n^2) pairs, and string operations add additional cost.

### Algorithm

1. Store all ideas in a set for O(1) lookup.
2. For each pair of ideas `(i, j)` where `i < j`:
   - Swap the first letters to create two new names `A` and `B`.
   - If neither `A` nor `B` exists in the original set, add both orderings to the `res` set.
3. Return the size of the `res` set.

::tabs-start

```python
class Solution:
    def distinctNames(self, ideas: List[str]) -> int:
        n = len(ideas)
        res = set()
        ideasSet = set(ideas)

        for i in range(n):
            for j in range(i + 1, n):
                A, B = ideas[j][0] + ideas[i][1:], ideas[i][0] + ideas[j][1:]
                if A not in ideasSet and B not in ideasSet:
                    res.add(A + ' ' + B)
                    res.add(B + ' ' + A)

        return len(res)
```

```java
public class Solution {
    public long distinctNames(String[] ideas) {
        int n = ideas.length;
        Set<String> res = new HashSet<>();
        Set<String> ideasSet = new HashSet<>(Arrays.asList(ideas));

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                String A = ideas[j].charAt(0) + ideas[i].substring(1);
                String B = ideas[i].charAt(0) + ideas[j].substring(1);

                if (!ideasSet.contains(A) && !ideasSet.contains(B)) {
                    res.add(A + " " + B);
                    res.add(B + " " + A);
                }
            }
        }

        return res.size();
    }
}
```

```cpp
class Solution {
public:
    long long distinctNames(vector<string>& ideas) {
        int n = ideas.size();
        unordered_set<string> res;
        unordered_set<string> ideasSet(ideas.begin(), ideas.end());

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                string A = ideas[j][0] + ideas[i].substr(1);
                string B = ideas[i][0] + ideas[j].substr(1);

                if (!ideasSet.count(A) && !ideasSet.count(B)) {
                    res.insert(A + " " + B);
                    res.insert(B + " " + A);
                }
            }
        }

        return res.size();
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} ideas
     * @return {number}
     */
    distinctNames(ideas) {
        let n = ideas.length;
        let res = new Set();
        let ideasSet = new Set(ideas);

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                let A = ideas[j][0] + ideas[i].slice(1);
                let B = ideas[i][0] + ideas[j].slice(1);

                if (!ideasSet.has(A) && !ideasSet.has(B)) {
                    res.add(A + ' ' + B);
                    res.add(B + ' ' + A);
                }
            }
        }

        return res.size;
    }
}
```

```csharp
public class Solution {
    public long DistinctNames(string[] ideas) {
        int n = ideas.Length;
        HashSet<string> res = new HashSet<string>();
        HashSet<string> ideasSet = new HashSet<string>(ideas);

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                string A = ideas[j][0] + ideas[i].Substring(1);
                string B = ideas[i][0] + ideas[j].Substring(1);

                if (!ideasSet.Contains(A) && !ideasSet.Contains(B)) {
                    res.Add(A + " " + B);
                    res.Add(B + " " + A);
                }
            }
        }

        return res.Count;
    }
}
```

```go
func distinctNames(ideas []string) int64 {
    n := len(ideas)
    res := make(map[string]struct{})
    ideasSet := make(map[string]struct{})
    for _, idea := range ideas {
        ideasSet[idea] = struct{}{}
    }

    for i := 0; i < n; i++ {
        for j := i + 1; j < n; j++ {
            A := string(ideas[j][0]) + ideas[i][1:]
            B := string(ideas[i][0]) + ideas[j][1:]

            _, hasA := ideasSet[A]
            _, hasB := ideasSet[B]
            if !hasA && !hasB {
                res[A+" "+B] = struct{}{}
                res[B+" "+A] = struct{}{}
            }
        }
    }

    return int64(len(res))
}
```

```kotlin
class Solution {
    fun distinctNames(ideas: Array<String>): Long {
        val n = ideas.size
        val res = HashSet<String>()
        val ideasSet = ideas.toHashSet()

        for (i in 0 until n) {
            for (j in i + 1 until n) {
                val A = ideas[j][0] + ideas[i].substring(1)
                val B = ideas[i][0] + ideas[j].substring(1)

                if (A !in ideasSet && B !in ideasSet) {
                    res.add("$A $B")
                    res.add("$B $A")
                }
            }
        }

        return res.size.toLong()
    }
}
```

```swift
class Solution {
    func distinctNames(_ ideas: [String]) -> Int {
        let n = ideas.count
        var res = Set<String>()
        let ideasSet = Set(ideas)

        for i in 0..<n {
            for j in (i + 1)..<n {
                let A = String(ideas[j].first!) + String(ideas[i].dropFirst())
                let B = String(ideas[i].first!) + String(ideas[j].dropFirst())

                if !ideasSet.contains(A) && !ideasSet.contains(B) {
                    res.insert("\(A) \(B)")
                    res.insert("\(B) \(A)")
                }
            }
        }

        return res.count
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n ^ 2)$
- Space complexity: $O(m * n ^ 2)$

> Where $n$ is the size of the array $ideas$ and $m$ is the average length of the strings.

---

## 2. Group By First Letter (Hash Map)

### Intuition

The key insight is that swapping first letters only matters between ideas that start with different letters. If two ideas share the same first letter, swapping produces the same names back.

Group ideas by their first letter, storing only the suffixes (the part after the first character). For two groups with different first letters, a swap is valid if the suffix appears in exactly one group (not both). If a suffix appears in both groups, swapping would produce an existing name.

For groups A and B, count how many suffixes are shared (the intersection). The number of valid pairs is (size of A minus intersection) times (size of B minus intersection).

### Algorithm

1. Build a map where each key is a first letter and each value is a set of suffixes starting with that letter.
2. For each pair of distinct first letters `(char1, char2)`:
   - Count how many suffixes appear in both groups (`intersect`).
   - Compute `distinct1` = size of group `char1` minus `intersect`.
   - Compute `distinct2` = size of group `char2` minus `intersect`.
   - Add `distinct1 * distinct2` to the result.
3. Return the total result.

::tabs-start

```python
class Solution:
    def distinctNames(self, ideas: List[str]) -> int:
        wordMap = collections.defaultdict(set)
        for w in ideas:
            wordMap[w[0]].add(w[1:])

        res = 0
        for char1 in wordMap:
            for char2 in wordMap:
                if char1 == char2:
                    continue

                intersect = sum(1 for w in wordMap[char1] if w in wordMap[char2])
                distinct1 = len(wordMap[char1]) - intersect
                distinct2 = len(wordMap[char2]) - intersect
                res += distinct1 * distinct2

        return res
```

```java
public class Solution {
    public long distinctNames(String[] ideas) {
        Map<Character, Set<String>> wordMap = new HashMap<>();
        for (String word : ideas) {
            wordMap.computeIfAbsent(
                word.charAt(0), k -> new HashSet<>()).add(word.substring(1)
            );
        }

        long res = 0;
        for (char char1 : wordMap.keySet()) {
            for (char char2 : wordMap.keySet()) {
                if (char1 == char2) continue;

                int intersect = 0;
                for (String w : wordMap.get(char1)) {
                    if (wordMap.get(char2).contains(w)) {
                        intersect++;
                    }
                }

                int distinct1 = wordMap.get(char1).size() - intersect;
                int distinct2 = wordMap.get(char2).size() - intersect;
                res += distinct1 * 1L * distinct2;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    long long distinctNames(vector<string>& ideas) {
        unordered_map<char, unordered_set<string>> wordMap;
        for (const string& word : ideas) {
            wordMap[word[0]].insert(word.substr(1));
        }

        long long res = 0;
        for (auto& [char1, set1] : wordMap) {
            for (auto& [char2, set2] : wordMap) {
                if (char1 == char2) continue;

                int intersect = 0;
                for (const string& w : set1) {
                    if (set2.count(w)) {
                        intersect++;
                    }
                }

                int distinct1 = set1.size() - intersect;
                int distinct2 = set2.size() - intersect;
                res += distinct1 * 1LL * distinct2;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} ideas
     * @return {number}
     */
    distinctNames(ideas) {
        const wordMap = new Map();
        for (let word of ideas) {
            let key = word[0];
            if (!wordMap.has(key)) {
                wordMap.set(key, new Set());
            }
            wordMap.get(key).add(word.slice(1));
        }

        let res = 0;
        for (let [char1, set1] of wordMap) {
            for (let [char2, set2] of wordMap) {
                if (char1 === char2) continue;

                let intersect = 0;
                for (let w of set1) {
                    if (set2.has(w)) {
                        intersect++;
                    }
                }

                let distinct1 = set1.size - intersect;
                let distinct2 = set2.size - intersect;
                res += distinct1 * distinct2;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public long DistinctNames(string[] ideas) {
        var wordMap = new Dictionary<char, HashSet<string>>();
        foreach (var word in ideas) {
            if (!wordMap.ContainsKey(word[0])) {
                wordMap[word[0]] = new HashSet<string>();
            }
            wordMap[word[0]].Add(word.Substring(1));
        }

        long res = 0;
        foreach (var kv1 in wordMap) {
            foreach (var kv2 in wordMap) {
                if (kv1.Key == kv2.Key) continue;

                int intersect = 0;
                foreach (var w in kv1.Value) {
                    if (kv2.Value.Contains(w)) {
                        intersect++;
                    }
                }

                int distinct1 = kv1.Value.Count - intersect;
                int distinct2 = kv2.Value.Count - intersect;
                res += (long)distinct1 * distinct2;
            }
        }

        return res;
    }
}
```

```go
func distinctNames(ideas []string) int64 {
    wordMap := make(map[byte]map[string]struct{})
    for _, word := range ideas {
        key := word[0]
        if wordMap[key] == nil {
            wordMap[key] = make(map[string]struct{})
        }
        wordMap[key][word[1:]] = struct{}{}
    }

    var res int64 = 0
    for char1, set1 := range wordMap {
        for char2, set2 := range wordMap {
            if char1 == char2 {
                continue
            }

            intersect := 0
            for w := range set1 {
                if _, ok := set2[w]; ok {
                    intersect++
                }
            }

            distinct1 := len(set1) - intersect
            distinct2 := len(set2) - intersect
            res += int64(distinct1) * int64(distinct2)
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun distinctNames(ideas: Array<String>): Long {
        val wordMap = HashMap<Char, HashSet<String>>()
        for (word in ideas) {
            wordMap.getOrPut(word[0]) { HashSet() }.add(word.substring(1))
        }

        var res = 0L
        for ((char1, set1) in wordMap) {
            for ((char2, set2) in wordMap) {
                if (char1 == char2) continue

                var intersect = 0
                for (w in set1) {
                    if (w in set2) {
                        intersect++
                    }
                }

                val distinct1 = set1.size - intersect
                val distinct2 = set2.size - intersect
                res += distinct1.toLong() * distinct2
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func distinctNames(_ ideas: [String]) -> Int {
        var wordMap = [Character: Set<String>]()
        for word in ideas {
            let key = word.first!
            if wordMap[key] == nil {
                wordMap[key] = Set<String>()
            }
            wordMap[key]!.insert(String(word.dropFirst()))
        }

        var res = 0
        for (char1, set1) in wordMap {
            for (char2, set2) in wordMap {
                if char1 == char2 { continue }

                var intersect = 0
                for w in set1 {
                    if set2.contains(w) {
                        intersect += 1
                    }
                }

                let distinct1 = set1.count - intersect
                let distinct2 = set2.count - intersect
                res += distinct1 * distinct2
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $n$ is the size of the array $ideas$ and $m$ is the average length of the strings.

---

## 3. Group By First Letter (Array)

### Intuition

This approach is the same as the hash map solution, but uses a fixed-size array of 26 sets instead of a hash map. Since we only deal with lowercase letters, indexing by (character minus 'a') gives us direct array access, which can be slightly faster.

We also optimize by only iterating over pairs (i, j) where i < j, then multiplying the result by 2 to account for both orderings.

### Algorithm

1. Create an array of 26 sets, one for each letter. Store suffixes in the set corresponding to each idea's first letter.
2. For each pair of indices `(i, j)` where `i < j`:
   - Count the `intersect` of suffixes between groups `i` and `j`.
   - Compute the product of non-overlapping suffix counts.
   - Add `2` times this product to the result (for both orderings).
3. Return the total result.

::tabs-start

```python
class Solution:
    def distinctNames(self, ideas: List[str]) -> int:
        suffixes = [set() for _ in range(26)]
        for w in ideas:
            suffixes[ord(w[0]) - ord('a')].add(w[1:])

        res = 0
        for i in range(26):
            for j in range(i + 1, 26):
                intersect = len(suffixes[i] & suffixes[j])
                res += 2 * (len(suffixes[i]) - intersect) * (len(suffixes[j]) - intersect)

        return res
```

```java
public class Solution {
    public long distinctNames(String[] ideas) {
        Set<String>[] suffixes = new HashSet[26];
        for (int i = 0; i < 26; i++) {
            suffixes[i] = new HashSet<>();
        }
        for (String w : ideas) {
            suffixes[w.charAt(0) - 'a'].add(w.substring(1));
        }

        long res = 0;
        for (int i = 0; i < 26; i++) {
            for (int j = i + 1; j < 26; j++) {
                int intersect = 0;
                for (String s : suffixes[i]) {
                    if (suffixes[j].contains(s)) {
                        intersect++;
                    }
                }
                res += 2L * (suffixes[i].size() - intersect) * (suffixes[j].size() - intersect);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    long long distinctNames(vector<string>& ideas) {
        unordered_set<string> suffixes[26];
        for (const string& w : ideas) {
            suffixes[w[0] - 'a'].insert(w.substr(1));
        }

        long long res = 0;
        for (int i = 0; i < 26; i++) {
            for (int j = i + 1; j < 26; j++) {
                int intersect = 0;
                for (const string& s : suffixes[i]) {
                    if (suffixes[j].count(s)) {
                        intersect++;
                    }
                }
                res += 2LL * (suffixes[i].size() - intersect) * (suffixes[j].size() - intersect);
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} ideas
     * @return {number}
     */
    distinctNames(ideas) {
        const suffixes = Array.from({ length: 26 }, () => new Set());
        for (let w of ideas) {
            suffixes[w.charCodeAt(0) - 97].add(w.slice(1));
        }

        let res = 0;
        for (let i = 0; i < 26; i++) {
            for (let j = i + 1; j < 26; j++) {
                let intersect = 0;
                for (let s of suffixes[i]) {
                    if (suffixes[j].has(s)) {
                        intersect++;
                    }
                }
                res +=
                    2 *
                    (suffixes[i].size - intersect) *
                    (suffixes[j].size - intersect);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public long DistinctNames(string[] ideas) {
        HashSet<string>[] suffixes = new HashSet<string>[26];
        for (int i = 0; i < 26; i++) {
            suffixes[i] = new HashSet<string>();
        }
        foreach (var w in ideas) {
            suffixes[w[0] - 'a'].Add(w.Substring(1));
        }

        long res = 0;
        for (int i = 0; i < 26; i++) {
            for (int j = i + 1; j < 26; j++) {
                int intersect = 0;
                foreach (var s in suffixes[i]) {
                    if (suffixes[j].Contains(s)) {
                        intersect++;
                    }
                }
                res += 2L * (suffixes[i].Count - intersect) * (suffixes[j].Count - intersect);
            }
        }
        return res;
    }
}
```

```go
func distinctNames(ideas []string) int64 {
    suffixes := make([]map[string]struct{}, 26)
    for i := 0; i < 26; i++ {
        suffixes[i] = make(map[string]struct{})
    }
    for _, w := range ideas {
        suffixes[w[0]-'a'][w[1:]] = struct{}{}
    }

    var res int64 = 0
    for i := 0; i < 26; i++ {
        for j := i + 1; j < 26; j++ {
            intersect := 0
            for s := range suffixes[i] {
                if _, ok := suffixes[j][s]; ok {
                    intersect++
                }
            }
            res += 2 * int64(len(suffixes[i])-intersect) * int64(len(suffixes[j])-intersect)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun distinctNames(ideas: Array<String>): Long {
        val suffixes = Array(26) { HashSet<String>() }
        for (w in ideas) {
            suffixes[w[0] - 'a'].add(w.substring(1))
        }

        var res = 0L
        for (i in 0 until 26) {
            for (j in i + 1 until 26) {
                var intersect = 0
                for (s in suffixes[i]) {
                    if (s in suffixes[j]) {
                        intersect++
                    }
                }
                res += 2L * (suffixes[i].size - intersect) * (suffixes[j].size - intersect)
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func distinctNames(_ ideas: [String]) -> Int {
        var suffixes = Array(repeating: Set<String>(), count: 26)
        for w in ideas {
            let idx = Int(w.first!.asciiValue! - Character("a").asciiValue!)
            suffixes[idx].insert(String(w.dropFirst()))
        }

        var res = 0
        for i in 0..<26 {
            for j in (i + 1)..<26 {
                var intersect = 0
                for s in suffixes[i] {
                    if suffixes[j].contains(s) {
                        intersect += 1
                    }
                }
                res += 2 * (suffixes[i].count - intersect) * (suffixes[j].count - intersect)
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $n$ is the size of the array $ideas$ and $m$ is the average length of the strings.

---

## 4. Counting

### Intuition

Instead of computing intersections for each pair of letters, we can build a count matrix incrementally. For each suffix, we know which first letters it appears with. We process suffixes one by one and maintain count[i][j], which tracks how many suffixes have appeared with letter i but not with letter j.

When we encounter a suffix that appears with letter i but not letter j, any previous suffix that appeared with letter j but not letter i forms a valid pair. We look up count[j][i] to find how many such suffixes exist.

### Algorithm

1. Build a map from each suffix to a boolean array of size 26, indicating which first letters it appears with.
2. Initialize a 26x26 `count` matrix to zero.
3. For each suffix and its boolean array:
   - For each letter `i` where the suffix appears:
     - For each letter `j` where the suffix does not appear:
       - Increment `count[i][j]`.
       - Add `count[j][i]` to the result (these are valid pairings).
4. Return `2` times the result (for both orderings).

::tabs-start

```python
class Solution:
    def distinctNames(self, ideas: List[str]) -> int:
        mp = defaultdict(lambda: [False] * 26)
        count = [[0] * 26 for _ in range(26)]
        res = 0

        for s in ideas:
            first_char = ord(s[0]) - ord('a')
            suffix = s[1:]
            mp[suffix][first_char] = True

        for suffix, arr in mp.items():
            for i in range(26):
                if arr[i]:
                    for j in range(26):
                        if not arr[j]:
                            count[i][j] += 1
                            res += count[j][i]

        return 2 * res
```

```java
public class Solution {
    public long distinctNames(String[] ideas) {
        Map<String, boolean[]> mp = new HashMap<>();
        int[][] count = new int[26][26];
        long res = 0;

        for (String s : ideas) {
            int firstChar = s.charAt(0) - 'a';
            String suffix = s.substring(1);
            mp.putIfAbsent(suffix, new boolean[26]);
            mp.get(suffix)[firstChar] = true;
        }

        for (boolean[] arr : mp.values()) {
            for (int i = 0; i < 26; i++) {
                if (arr[i]) {
                    for (int j = 0; j < 26; j++) {
                        if (!arr[j]) {
                            count[i][j]++;
                            res += count[j][i];
                        }
                    }
                }
            }
        }
        return 2 * res;
    }
}
```

```cpp
class Solution {
public:
    long long distinctNames(vector<string>& ideas) {
        unordered_map<string, array<bool, 26>> mp;
        long long count[26][26] = {};
        long long res = 0;

        for (const string& s : ideas) {
            int firstChar = s[0] - 'a';
            string suffix = s.substr(1);
            mp[suffix][firstChar] = true;
        }

        for (auto& [suffix, arr] : mp) {
            for (int i = 0; i < 26; i++) {
                if (arr[i]) {
                    for (int j = 0; j < 26; j++) {
                        if (!arr[j]) {
                            count[i][j]++;
                            res += count[j][i];
                        }
                    }
                }
            }
        }
        return 2 * res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} ideas
     * @return {number}
     */
    distinctNames(ideas) {
        const mp = new Map();
        const count = Array.from({ length: 26 }, () => Array(26).fill(0));
        let res = 0;

        for (const s of ideas) {
            const firstChar = s.charCodeAt(0) - 97;
            const suffix = s.slice(1);
            if (!mp.has(suffix)) mp.set(suffix, new Array(26).fill(false));
            mp.get(suffix)[firstChar] = true;
        }

        for (const arr of mp.values()) {
            for (let i = 0; i < 26; i++) {
                if (arr[i]) {
                    for (let j = 0; j < 26; j++) {
                        if (!arr[j]) {
                            count[i][j]++;
                            res += count[j][i];
                        }
                    }
                }
            }
        }
        return 2 * res;
    }
}
```

```csharp
public class Solution {
    public long DistinctNames(string[] ideas) {
        var mp = new Dictionary<string, bool[]>();
        int[,] count = new int[26, 26];
        long res = 0;

        foreach (var s in ideas) {
            int firstChar = s[0] - 'a';
            string suffix = s.Substring(1);
            if (!mp.ContainsKey(suffix)) {
                mp[suffix] = new bool[26];
            }
            mp[suffix][firstChar] = true;
        }

        foreach (var arr in mp.Values) {
            for (int i = 0; i < 26; i++) {
                if (arr[i]) {
                    for (int j = 0; j < 26; j++) {
                        if (!arr[j]) {
                            count[i, j]++;
                            res += count[j, i];
                        }
                    }
                }
            }
        }
        return 2 * res;
    }
}
```

```go
func distinctNames(ideas []string) int64 {
    mp := make(map[string][]bool)
    count := make([][]int64, 26)
    for i := 0; i < 26; i++ {
        count[i] = make([]int64, 26)
    }
    var res int64 = 0

    for _, s := range ideas {
        firstChar := int(s[0] - 'a')
        suffix := s[1:]
        if mp[suffix] == nil {
            mp[suffix] = make([]bool, 26)
        }
        mp[suffix][firstChar] = true
    }

    for _, arr := range mp {
        for i := 0; i < 26; i++ {
            if arr[i] {
                for j := 0; j < 26; j++ {
                    if !arr[j] {
                        count[i][j]++
                        res += count[j][i]
                    }
                }
            }
        }
    }
    return 2 * res
}
```

```kotlin
class Solution {
    fun distinctNames(ideas: Array<String>): Long {
        val mp = HashMap<String, BooleanArray>()
        val count = Array(26) { LongArray(26) }
        var res = 0L

        for (s in ideas) {
            val firstChar = s[0] - 'a'
            val suffix = s.substring(1)
            mp.getOrPut(suffix) { BooleanArray(26) }[firstChar] = true
        }

        for (arr in mp.values) {
            for (i in 0 until 26) {
                if (arr[i]) {
                    for (j in 0 until 26) {
                        if (!arr[j]) {
                            count[i][j]++
                            res += count[j][i]
                        }
                    }
                }
            }
        }
        return 2 * res
    }
}
```

```swift
class Solution {
    func distinctNames(_ ideas: [String]) -> Int {
        var mp = [String: [Bool]]()
        var count = Array(repeating: Array(repeating: 0, count: 26), count: 26)
        var res = 0

        for s in ideas {
            let firstChar = Int(s.first!.asciiValue! - Character("a").asciiValue!)
            let suffix = String(s.dropFirst())
            if mp[suffix] == nil {
                mp[suffix] = Array(repeating: false, count: 26)
            }
            mp[suffix]![firstChar] = true
        }

        for arr in mp.values {
            for i in 0..<26 {
                if arr[i] {
                    for j in 0..<26 {
                        if !arr[j] {
                            count[i][j] += 1
                            res += count[j][i]
                        }
                    }
                }
            }
        }
        return 2 * res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $n$ is the size of the array $ideas$ and $m$ is the average length of the strings.

---

## Common Pitfalls

### Checking Both Swapped Names

A valid company name requires that both swapped names are new. Some solutions only check if one of the swapped names exists in the original set, forgetting that both must be absent. If either swapped name already exists as an original idea, the pair is invalid.

### Counting Pairs vs Ordered Names

The problem asks for distinct company names, which are ordered pairs (first name + second name). After finding a valid swap between two ideas, you must count both orderings. Forgetting to multiply by 2 or add both orderings leads to answers that are half the correct value.

### Same First Letter Produces No New Names

Swapping first letters between two ideas that start with the same letter produces the original names back. Solutions that do not skip pairs with identical first letters waste computation and may produce incorrect intersection counts in the optimized approaches.

### Off-by-One in Suffix Extraction

When grouping by first letter, the suffix is everything after the first character. Using `s[1:]` correctly extracts the suffix, but some implementations accidentally include the first character or miss the last character due to incorrect slicing, causing lookups to fail.

### Integer Overflow in Pair Counting

With up to 50,000 ideas, the number of valid pairs can exceed 32-bit integer limits. The product of two group sizes (each up to 50,000) requires 64-bit arithmetic. Using `int` instead of `long` in languages like Java causes overflow and wrong answers.
