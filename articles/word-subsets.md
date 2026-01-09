## 1. Brute Force

::tabs-start

```python
class Solution:
    def wordSubsets(self, words1: List[str], words2: List[str]) -> List[str]:
        res = []
        for w1 in words1:
            count1 = Counter(w1)
            is_subset = True

            for w2 in words2:
                count2 = Counter(w2)
                for c in count2:
                    if count2[c] > count1[c]:
                        is_subset = False
                        break

                if not is_subset: break

            if is_subset:
                res.append(w1)

        return res
```

```java
public class Solution {
    public List<String> wordSubsets(String[] words1, String[] words2) {
        List<String> res = new ArrayList<>();

        for (String w1 : words1) {
            int[] count1 = new int[26];
            for (char c : w1.toCharArray()) count1[c - 'a']++;

            boolean isSubset = true;
            for (String w2 : words2) {
                int[] count2 = new int[26];
                for (char c : w2.toCharArray()) count2[c - 'a']++;

                for (int i = 0; i < 26; i++) {
                    if (count2[i] > count1[i]) {
                        isSubset = false;
                        break;
                    }
                }

                if (!isSubset) break;
            }

            if (isSubset) res.add(w1);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<string> wordSubsets(vector<string>& words1, vector<string>& words2) {
        vector<string> res;

        for (const string& w1 : words1) {
            vector<int> count1(26, 0);
            for (char c : w1) count1[c - 'a']++;

            bool isSubset = true;
            for (const string& w2 : words2) {
                vector<int> count2(26, 0);
                for (char c : w2) count2[c - 'a']++;

                for (int i = 0; i < 26; i++) {
                    if (count2[i] > count1[i]) {
                        isSubset = false;
                        break;
                    }
                }

                if (!isSubset) break;
            }

            if (isSubset) res.push_back(w1);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words1
     * @param {string[]} words2
     * @return {string[]}
     */
    wordSubsets(words1, words2) {
        const res = [];

        for (const w1 of words1) {
            const count1 = Array(26).fill(0);
            for (const c of w1) count1[c.charCodeAt(0) - 97]++;

            let isSubset = true;
            for (const w2 of words2) {
                const count2 = Array(26).fill(0);
                for (const c of w2) count2[c.charCodeAt(0) - 97]++;

                for (let i = 0; i < 26; i++) {
                    if (count2[i] > count1[i]) {
                        isSubset = false;
                        break;
                    }
                }

                if (!isSubset) break;
            }

            if (isSubset) res.push(w1);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public IList<string> WordSubsets(string[] words1, string[] words2) {
        List<string> res = new List<string>();

        foreach (string w1 in words1) {
            int[] count1 = new int[26];
            foreach (char c in w1) count1[c - 'a']++;

            bool isSubset = true;
            foreach (string w2 in words2) {
                int[] count2 = new int[26];
                foreach (char c in w2) count2[c - 'a']++;

                for (int i = 0; i < 26; i++) {
                    if (count2[i] > count1[i]) {
                        isSubset = false;
                        break;
                    }
                }

                if (!isSubset) break;
            }

            if (isSubset) res.Add(w1);
        }

        return res;
    }
}
```

```go
func wordSubsets(words1 []string, words2 []string) []string {
    res := []string{}

    for _, w1 := range words1 {
        count1 := [26]int{}
        for _, c := range w1 {
            count1[c-'a']++
        }

        isSubset := true
        for _, w2 := range words2 {
            count2 := [26]int{}
            for _, c := range w2 {
                count2[c-'a']++
            }

            for i := 0; i < 26; i++ {
                if count2[i] > count1[i] {
                    isSubset = false
                    break
                }
            }

            if !isSubset {
                break
            }
        }

        if isSubset {
            res = append(res, w1)
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun wordSubsets(words1: Array<String>, words2: Array<String>): List<String> {
        val res = mutableListOf<String>()

        for (w1 in words1) {
            val count1 = IntArray(26)
            for (c in w1) count1[c - 'a']++

            var isSubset = true
            for (w2 in words2) {
                val count2 = IntArray(26)
                for (c in w2) count2[c - 'a']++

                for (i in 0 until 26) {
                    if (count2[i] > count1[i]) {
                        isSubset = false
                        break
                    }
                }

                if (!isSubset) break
            }

            if (isSubset) res.add(w1)
        }

        return res
    }
}
```

```swift
class Solution {
    func wordSubsets(_ words1: [String], _ words2: [String]) -> [String] {
        var res = [String]()

        for w1 in words1 {
            var count1 = [Int](repeating: 0, count: 26)
            for c in w1 {
                count1[Int(c.asciiValue! - Character("a").asciiValue!)] += 1
            }

            var isSubset = true
            for w2 in words2 {
                var count2 = [Int](repeating: 0, count: 26)
                for c in w2 {
                    count2[Int(c.asciiValue! - Character("a").asciiValue!)] += 1
                }

                for i in 0..<26 {
                    if count2[i] > count1[i] {
                        isSubset = false
                        break
                    }
                }

                if !isSubset { break }
            }

            if isSubset {
                res.append(w1)
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N * n + N * M * m)$
- Space complexity:
    - $O(1)$ extra space, since we have at most $26$ different characters.
    - $O(N * n)$ space for the output list.

> Where $N$ is the size of the array $words1$, $n$ is the length of the longest word in $words1$, $M$ is the size of the array $words2$, and $m$ is the length of the longest word in $words2$.

---

## 2. Greedy + Hash Map

::tabs-start

```python
class Solution:
    def wordSubsets(self, words1: List[str], words2: List[str]) -> List[str]:
        count_2 = defaultdict(int)
        for w in words2:
            count_w = Counter(w)
            for c, cnt in count_w.items():
                count_2[c] = max(count_2[c], cnt)

        res = []
        for w in words1:
            count_w = Counter(w)
            flag = True
            for c, cnt in count_2.items():
                if count_w[c] < cnt:
                    flag = False
                    break
            if flag:
                res.append(w)

        return res
```

```java
public class Solution {
    public List<String> wordSubsets(String[] words1, String[] words2) {
        int[] count2 = new int[26];
        for (String w : words2) {
            int[] countW = new int[26];
            for (char c : w.toCharArray()) {
                countW[c - 'a']++;
            }
            for (int i = 0; i < 26; i++) {
                count2[i] = Math.max(count2[i], countW[i]);
            }
        }

        List<String> res = new ArrayList<>();
        for (String w : words1) {
            int[] countW = new int[26];
            for (char c : w.toCharArray()) {
                countW[c - 'a']++;
            }

            boolean flag = true;
            for (int i = 0; i < 26; i++) {
                if (countW[i] < count2[i]) {
                    flag = false;
                    break;
                }
            }

            if (flag) {
                res.add(w);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<string> wordSubsets(vector<string>& words1, vector<string>& words2) {
        vector<int> count2(26, 0);
        for (string& w : words2) {
            vector<int> countW(26, 0);
            for (char c : w) countW[c - 'a']++;
            for (int i = 0; i < 26; ++i)
                count2[i] = max(count2[i], countW[i]);
        }

        vector<string> res;
        for (string& w : words1) {
            vector<int> countW(26, 0);
            for (char c : w) countW[c - 'a']++;

            bool flag = true;
            for (int i = 0; i < 26; ++i) {
                if (countW[i] < count2[i]) {
                    flag = false;
                    break;
                }
            }

            if (flag) res.push_back(w);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words1
     * @param {string[]} words2
     * @return {string[]}
     */
    wordSubsets(words1, words2) {
        const count2 = new Array(26).fill(0);
        for (let w of words2) {
            const countW = new Array(26).fill(0);
            for (let c of w) {
                countW[c.charCodeAt(0) - 97]++;
            }
            for (let i = 0; i < 26; i++) {
                count2[i] = Math.max(count2[i], countW[i]);
            }
        }

        const res = [];
        for (let w of words1) {
            const countW = new Array(26).fill(0);
            for (let c of w) {
                countW[c.charCodeAt(0) - 97]++;
            }

            let flag = true;
            for (let i = 0; i < 26; i++) {
                if (countW[i] < count2[i]) {
                    flag = false;
                    break;
                }
            }

            if (flag) res.push(w);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public IList<string> WordSubsets(string[] words1, string[] words2) {
        int[] count2 = new int[26];
        foreach (string w in words2) {
            int[] countW = new int[26];
            foreach (char c in w) {
                countW[c - 'a']++;
            }
            for (int i = 0; i < 26; i++) {
                count2[i] = Math.Max(count2[i], countW[i]);
            }
        }

        List<string> res = new List<string>();
        foreach (string w in words1) {
            int[] countW = new int[26];
            foreach (char c in w) {
                countW[c - 'a']++;
            }

            bool flag = true;
            for (int i = 0; i < 26; i++) {
                if (countW[i] < count2[i]) {
                    flag = false;
                    break;
                }
            }

            if (flag) {
                res.Add(w);
            }
        }

        return res;
    }
}
```

```go
func wordSubsets(words1 []string, words2 []string) []string {
    count2 := [26]int{}
    for _, w := range words2 {
        countW := [26]int{}
        for _, c := range w {
            countW[c-'a']++
        }
        for i := 0; i < 26; i++ {
            if countW[i] > count2[i] {
                count2[i] = countW[i]
            }
        }
    }

    res := []string{}
    for _, w := range words1 {
        countW := [26]int{}
        for _, c := range w {
            countW[c-'a']++
        }

        flag := true
        for i := 0; i < 26; i++ {
            if countW[i] < count2[i] {
                flag = false
                break
            }
        }

        if flag {
            res = append(res, w)
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun wordSubsets(words1: Array<String>, words2: Array<String>): List<String> {
        val count2 = IntArray(26)
        for (w in words2) {
            val countW = IntArray(26)
            for (c in w) {
                countW[c - 'a']++
            }
            for (i in 0 until 26) {
                count2[i] = maxOf(count2[i], countW[i])
            }
        }

        val res = mutableListOf<String>()
        for (w in words1) {
            val countW = IntArray(26)
            for (c in w) {
                countW[c - 'a']++
            }

            var flag = true
            for (i in 0 until 26) {
                if (countW[i] < count2[i]) {
                    flag = false
                    break
                }
            }

            if (flag) {
                res.add(w)
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func wordSubsets(_ words1: [String], _ words2: [String]) -> [String] {
        var count2 = [Int](repeating: 0, count: 26)
        for w in words2 {
            var countW = [Int](repeating: 0, count: 26)
            for c in w {
                countW[Int(c.asciiValue! - Character("a").asciiValue!)] += 1
            }
            for i in 0..<26 {
                count2[i] = max(count2[i], countW[i])
            }
        }

        var res = [String]()
        for w in words1 {
            var countW = [Int](repeating: 0, count: 26)
            for c in w {
                countW[Int(c.asciiValue! - Character("a").asciiValue!)] += 1
            }

            var flag = true
            for i in 0..<26 {
                if countW[i] < count2[i] {
                    flag = false
                    break
                }
            }

            if flag {
                res.append(w)
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N * n + M * m)$
- Space complexity:
    - $O(1)$ extra space, since we have at most $26$ different characters.
    - $O(N * n)$ space for the output list.

> Where $N$ is the size of the array $words1$, $n$ is the length of the longest word in $words1$, $M$ is the size of the array $words2$, and $m$ is the length of the longest word in $words2$.
