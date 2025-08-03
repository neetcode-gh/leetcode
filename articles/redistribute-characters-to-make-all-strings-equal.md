## 1. Frequency Count (Hash Map)

::tabs-start

```python
class Solution:
    def makeEqual(self, words: List[str]) -> bool:
        char_cnt = defaultdict(int)

        for w in words:
            for c in w:
                char_cnt[c] += 1

        for c in char_cnt:
            if char_cnt[c] % len(words):
                return False
        return True
```

```java
public class Solution {
    public boolean makeEqual(String[] words) {
        Map<Character, Integer> charCnt = new HashMap<>();

        for (String w : words) {
            for (char c : w.toCharArray()) {
                charCnt.put(c, charCnt.getOrDefault(c, 0) + 1);
            }
        }

        for (int count : charCnt.values()) {
            if (count % words.length != 0) {
                return false;
            }
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool makeEqual(vector<string>& words) {
        unordered_map<char, int> charCnt;

        for (const string& w : words) {
            for (char c : w) {
                charCnt[c]++;
            }
        }

        for (const auto& entry : charCnt) {
            if (entry.second % words.size() != 0) {
                return false;
            }
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @return {boolean}
     */
    makeEqual(words) {
        const charCnt = {};

        for (let w of words) {
            for (let c of w) {
                charCnt[c] = (charCnt[c] || 0) + 1;
            }
        }

        for (let count of Object.values(charCnt)) {
            if (count % words.length !== 0) {
                return false;
            }
        }
        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

> Where $n$ is the number of words and $m$ is the average length of each word.

---

## 2. Frequency Count (Array)

::tabs-start

```python
class Solution:
    def makeEqual(self, words: List[str]) -> bool:
        freq = [0] * 26
        flag = 0
        n = len(words)

        for w in words:
            for c in w:
                i = ord(c) - ord('a')
                if freq[i] != 0:
                    freq[i] += 1
                    if freq[i] % n == 0:
                        flag += 1
                else:
                    freq[i] += 1
                    if freq[i] % n != 0:
                        flag -= 1
                freq[i] %= n

        return flag == 0
```

```java
public class Solution {
    public boolean makeEqual(String[] words) {
        int[] freq = new int[26];
        int flag = 0;
        int n = words.length;

        for (String w : words) {
            for (char c : w.toCharArray()) {
                int i = c - 'a';
                if (freq[i] != 0) {
                    freq[i]++;
                    if (freq[i] % n == 0) {
                        flag++;
                    }
                } else {
                    freq[i]++;
                    if (freq[i] % n != 0) {
                        flag--;
                    }
                }
                freq[i] %= n;
            }
        }

        return flag == 0;
    }
}
```

```cpp
class Solution {
public:
    bool makeEqual(vector<string>& words) {
        vector<int> freq(26, 0);
        int flag = 0;
        int n = words.size();

        for (const string& w : words) {
            for (char c : w) {
                int i = c - 'a';
                if (freq[i] != 0) {
                    freq[i]++;
                    if (freq[i] % n == 0) {
                        flag++;
                    }
                } else {
                    freq[i]++;
                    if (freq[i] % n != 0) {
                        flag--;
                    }
                }
                freq[i] %= n;
            }
        }

        return flag == 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @return {boolean}
     */
    makeEqual(words) {
        const freq = Array(26).fill(0);
        let flag = 0;
        const n = words.length;

        for (let w of words) {
            for (let c of w) {
                const i = c.charCodeAt(0) - 'a'.charCodeAt(0);
                if (freq[i] !== 0) {
                    freq[i]++;
                    if (freq[i] % n === 0) {
                        flag++;
                    }
                } else {
                    freq[i]++;
                    if (freq[i] % n !== 0) {
                        flag--;
                    }
                }
                freq[i] %= n;
            }
        }

        return flag === 0;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

> Where $n$ is the number of words and $m$ is the average length of each word.
