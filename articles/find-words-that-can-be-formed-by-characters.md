## 1. Hash Map (Two Pass)

::tabs-start

```python
class Solution:
    def countCharacters(self, words: List[str], chars: str) -> int:
        count = Counter(chars)
        res = 0

        for w in words:
            cur_word = Counter(w)
            good = True
            for c in cur_word:
                if cur_word[c] > count[c]:
                    good = False
                    break
            if good:
                res += len(w)
        return res
```

```java
public class Solution {
    public int countCharacters(String[] words, String chars) {
        Map<Character, Integer> count = new HashMap<>();
        for (char c : chars.toCharArray()) {
            count.put(c, count.getOrDefault(c, 0) + 1);
        }
        int res = 0;
        for (String w : words) {
            Map<Character, Integer> curWord = new HashMap<>();
            for (char c : w.toCharArray()) {
                curWord.put(c, curWord.getOrDefault(c, 0) + 1);
            }
            boolean good = true;
            for (char c : curWord.keySet()) {
                if (curWord.get(c) > count.getOrDefault(c, 0)) {
                    good = false;
                    break;
                }
            }
            if (good) {
                res += w.length();
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int countCharacters(vector<string>& words, string chars) {
        unordered_map<char, int> count;
        for (char c : chars) {
            count[c]++;
        }
        int res = 0;
        for (const string& w : words) {
            unordered_map<char, int> curWord;
            for (char c : w) {
                curWord[c]++;
            }
            bool good = true;
            for (const auto& p : curWord) {
                if (p.second > count[p.first]) {
                    good = false;
                    break;
                }
            }
            if (good) {
                res += w.size();
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
     * @param {string} chars
     * @return {number}
     */
    countCharacters(words, chars) {
        const count = {};
        for (const c of chars) {
            count[c] = (count[c] || 0) + 1;
        }
        let res = 0;
        for (const w of words) {
            const curWord = {};
            for (const c of w) {
                curWord[c] = (curWord[c] || 0) + 1;
            }
            let good = true;
            for (const c in curWord) {
                if (curWord[c] > (count[c] || 0)) {
                    good = false;
                    break;
                }
            }
            if (good) {
                res += w.length;
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + (m * k))$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

> Where $n$ is the length of $chars$, $m$ is the number of words and $k$ is the average length of each word.

---

## 2. Hash Map (One Pass)

::tabs-start

```python
class Solution:
    def countCharacters(self, words: List[str], chars: str) -> int:
        count = Counter(chars)
        res = 0

        for w in words:
            cur_word = defaultdict(int)
            good = True
            for c in w:
                cur_word[c] += 1
                if cur_word[c] > count[c]:
                    good = False
                    break
            if good:
                res += len(w)
        return res
```

```java
public class Solution {
    public int countCharacters(String[] words, String chars) {
        Map<Character, Integer> count = new HashMap<>();
        for (char c : chars.toCharArray()) {
            count.put(c, count.getOrDefault(c, 0) + 1);
        }
        int res = 0;
        for (String w : words) {
            Map<Character, Integer> curWord = new HashMap<>();
            boolean good = true;
            for (char c : w.toCharArray()) {
                curWord.put(c, curWord.getOrDefault(c, 0) + 1);
                if (curWord.get(c) > count.getOrDefault(c, 0)) {
                    good = false;
                    break;
                }
            }
            if (good) {
                res += w.length();
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int countCharacters(vector<string>& words, string chars) {
        unordered_map<char, int> count;
        for (char c : chars) {
            count[c]++;
        }
        int res = 0;
        for (const string& w : words) {
            unordered_map<char, int> curWord;
            bool good = true;
            for (char c : w) {
                curWord[c]++;
                if (curWord[c] > count[c]) {
                    good = false;
                    break;
                }
            }
            if (good) {
                res += w.size();
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
     * @param {string} chars
     * @return {number}
     */
    countCharacters(words, chars) {
        const count = {};
        for (const c of chars) {
            count[c] = (count[c] || 0) + 1;
        }
        let res = 0;
        for (const w of words) {
            const curWord = {};
            let good = true;
            for (const c of w) {
                curWord[c] = (curWord[c] || 0) + 1;
                if (curWord[c] > (count[c] || 0)) {
                    good = false;
                    break;
                }
            }
            if (good) {
                res += w.length;
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + (m * k))$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

> Where $n$ is the length of $chars$, $m$ is the number of words and $k$ is the average length of each word.

---

## 3. Hash Table

::tabs-start

```python
class Solution:
    def countCharacters(self, words: List[str], chars: str) -> int:
        count = [0] * 26
        for c in chars:
            count[ord(c) - ord('a')] += 1

        org = count[:]
        res = 0

        for w in words:
            good = True
            for c in w:
                i = ord(c) - ord('a')
                count[i] -= 1
                if count[i] < 0:
                    good = False
                    break
            if good:
                res += len(w)

            for i in range(26):
                count[i] = org[i]
        return res
```

```java
public class Solution {
    public int countCharacters(String[] words, String chars) {
        int[] count = new int[26];
        for (char c : chars.toCharArray()) {
            count[c - 'a']++;
        }

        int[] org = count.clone();
        int res = 0;

        for (String w : words) {
            boolean good = true;
            for (int i = 0; i < w.length(); i++) {
                int j = w.charAt(i) - 'a';
                count[j]--;
                if (count[j] < 0) {
                    good = false;
                    break;
                }
            }
            if (good) {
                res += w.length();
            }
            for (int i = 0; i < 26; i++) {
                count[i] = org[i];
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int countCharacters(vector<string>& words, string chars) {
        vector<int> count(26, 0);
        for (char c : chars) {
            count[c - 'a']++;
        }

        vector<int> org = count;
        int res = 0;

        for (string& w : words) {
            bool good = true;
            for (char& c : w) {
                int i = c - 'a';
                count[i]--;
                if (count[i] < 0) {
                    good = false;
                    break;
                }
            }
            if (good) {
                res += w.length();
            }
            for (int i = 0; i < 26; i++) {
                count[i] = org[i];
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
     * @param {string} chars
     * @return {number}
     */
    countCharacters(words, chars) {
        const count = new Array(26).fill(0);
        for (let c of chars) {
            count[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }

        const org = [...count];
        let res = 0;

        for (let w of words) {
            let good = true;
            for (let c of w) {
                const i = c.charCodeAt(0) - 'a'.charCodeAt(0);
                count[i]--;
                if (count[i] < 0) {
                    good = false;
                    break;
                }
            }

            if (good) {
                res += w.length;
            }
            for (let i = 0; i < 26; i++) {
                count[i] = org[i];
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + (m * k))$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

> Where $n$ is the length of $chars$, $m$ is the number of words and $k$ is the average length of each word.
