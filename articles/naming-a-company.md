## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n ^ 2)$
- Space complexity: $O(m * n ^ 2)$

> Where $n$ is the size of the array $ideas$ and $m$ is the average length of the strings.

---

## 2. Group By First Letter (Hash Map)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $n$ is the size of the array $ideas$ and $m$ is the average length of the strings.

---

## 3. Group By First Letter (Array)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $n$ is the size of the array $ideas$ and $m$ is the average length of the strings.

---

## 4. Counting

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $n$ is the size of the array $ideas$ and $m$ is the average length of the strings.
