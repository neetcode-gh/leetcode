## 1. Frequency Count

::tabs-start

```python
class Solution:
    def commonChars(self, words: List[str]) -> List[str]:
        cnt = Counter(words[0])

        for w in words:
            cur_cnt = Counter(w)
            for c in cnt:
                cnt[c] = min(cnt[c], cur_cnt[c])

        res = []
        for c in cnt:
            for i in range(cnt[c]):
                res.append(c)

        return res
```

```java
public class Solution {
    public List<String> commonChars(String[] words) {
        int[] cnt = new int[26];
        Arrays.fill(cnt, Integer.MAX_VALUE);

        for (String word : words) {
            int[] curCnt = new int[26];
            for (char c : word.toCharArray()) {
                curCnt[c - 'a']++;
            }

            for (int i = 0; i < 26; i++) {
                cnt[i] = Math.min(cnt[i], curCnt[i]);
            }
        }

        List<String> res = new ArrayList<>();
        for (int i = 0; i < 26; i++) {
            for (int j = 0; j < cnt[i]; j++) {
                res.add(String.valueOf((char) (i + 'a')));
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<string> commonChars(vector<string>& words) {
        vector<int> cnt(26, INT_MAX);

        for (string& word : words) {
            vector<int> curCnt(26, 0);
            for (char c : word) {
                curCnt[c - 'a']++;
            }

            for (int i = 0; i < 26; i++) {
                cnt[i] = min(cnt[i], curCnt[i]);
            }
        }

        vector<string> res;
        for (int i = 0; i < 26; i++) {
            for (int j = 0; j < cnt[i]; j++) {
                res.push_back(string(1, i + 'a'));
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @return {string[]}
     */
    commonChars(words) {
        const cnt = new Array(26).fill(Infinity);

        for (let word of words) {
            const curCnt = new Array(26).fill(0);
            for (let c of word) {
                curCnt[c.charCodeAt(0) - 97]++;
            }

            for (let i = 0; i < 26; i++) {
                cnt[i] = Math.min(cnt[i], curCnt[i]);
            }
        }

        const res = [];
        for (let i = 0; i < 26; i++) {
            for (let j = 0; j < cnt[i]; j++) {
                res.push(String.fromCharCode(i + 97));
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity:
    - $O(1)$ extra space, since we have at most $26$ different characters.
    - $O(n * m)$ space for the output list.

> Where $n$ is the number of words and $m$ is the length of the longest word.
