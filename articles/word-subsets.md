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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N * n + M * m)$
- Space complexity:
    - $O(1)$ extra space, since we have at most $26$ different characters.
    - $O(N * n)$ space for the output list.

> Where $N$ is the size of the array $words1$, $n$ is the length of the longest word in $words1$, $M$ is the size of the array $words2$, and $m$ is the length of the longest word in $words2$.
