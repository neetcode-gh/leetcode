## 1. Brute Force

::tabs-start

```python
class Solution:
    def stringMatching(self, words: List[str]) -> List[str]:
        res = []

        for i in range(len(words)):
            for j in range(len(words)):
                if i == j:
                    continue

                if words[i] in words[j]:
                    res.append(words[i])
                    break

        return res
```

```java
public class Solution {
    public List<String> stringMatching(String[] words) {
        List<String> res = new ArrayList<>();

        for (int i = 0; i < words.length; i++) {
            for (int j = 0; j < words.length; j++) {
                if (i == j) {
                    continue;
                }

                if (words[j].contains(words[i])) {
                    res.add(words[i]);
                    break;
                }
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<string> stringMatching(vector<string>& words) {
        vector<string> res;

        for (int i = 0; i < words.size(); i++) {
            for (int j = 0; j < words.size(); j++) {
                if (i == j) {
                    continue;
                }

                if (words[j].find(words[i]) != string::npos) {
                    res.push_back(words[i]);
                    break;
                }
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
    stringMatching(words) {
        let res = [];

        for (let i = 0; i < words.length; i++) {
            for (let j = 0; j < words.length; j++) {
                if (i === j) {
                    continue;
                }

                if (words[j].includes(words[i])) {
                    res.push(words[i]);
                    break;
                }
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * m ^ 2)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n * m)$ space for the output list.

> Where $n$ is the number of words, and $m$ is the length of the longest word.

---

## 2. Sorting

::tabs-start

```python
class Solution:
    def stringMatching(self, words: List[str]) -> List[str]:
        res = []
        words.sort(key=len)

        for i in range(len(words)):
            for j in range(i + 1, len(words)):
                if words[i] in words[j]:
                    res.append(words[i])
                    break

        return res
```

```java
public class Solution {
    public List<String> stringMatching(String[] words) {
        List<String> res = new ArrayList<>();
        Arrays.sort(words, Comparator.comparingInt(String::length));

        for (int i = 0; i < words.length; i++) {
            for (int j = i + 1; j < words.length; j++) {
                if (words[j].contains(words[i])) {
                    res.add(words[i]);
                    break;
                }
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<string> stringMatching(vector<string>& words) {
        vector<string> res;
        sort(words.begin(), words.end(), [](const string& a, const string& b) {
            return a.length() < b.length();
        });

        for (int i = 0; i < words.size(); i++) {
            for (int j = i + 1; j < words.size(); j++) {
                if (words[j].find(words[i]) != string::npos) {
                    res.push_back(words[i]);
                    break;
                }
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
    stringMatching(words) {
        let res = [];
        words.sort((a, b) => a.length - b.length);

        for (let i = 0; i < words.length; i++) {
            for (let j = i + 1; j < words.length; j++) {
                if (words[j].includes(words[i])) {
                    res.push(words[i]);
                    break;
                }
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * m ^ 2)$
- Space complexity:
    - $O(1)$ or $O(n)$ depending on the sorting algorithm.
    - $O(n * m)$ space for the output list.

> Where $n$ is the number of words, and $m$ is the length of the longest word.

---

## 3. Knuth-Morris-Pratt (KMP) Algorithm

::tabs-start

```python
class Solution:
    def stringMatching(self, words: List[str]) -> List[str]:
        def kmp(word1: str, word2: str) -> int:
            lps = [0] * len(word2)
            prevLPS, i = 0, 1

            while i < len(word2):
                if word2[i] == word2[prevLPS]:
                    lps[i] = prevLPS + 1
                    prevLPS += 1
                    i += 1
                elif prevLPS == 0:
                    lps[i] = 0
                    i += 1
                else:
                    prevLPS = lps[prevLPS - 1]

            i = j = 0
            while i < len(word1):
                if word1[i] == word2[j]:
                    i += 1
                    j += 1
                else:
                    if j == 0:
                        i += 1
                    else:
                        j = lps[j - 1]

                if j == len(word2):
                    return i - len(word2)

            return -1

        res = []
        words.sort(key=len)

        for i in range(len(words)):
            for j in range(i + 1, len(words)):
                if kmp(words[j], words[i]) != -1:
                    res.append(words[i])
                    break

        return res
```

```java
public class Solution {
    public List<String> stringMatching(String[] words) {
        List<String> res = new ArrayList<>();
        Arrays.sort(words, Comparator.comparingInt(String::length));

        for (int i = 0; i < words.length; i++) {
            for (int j = i + 1; j < words.length; j++) {
                if (kmp(words[j], words[i]) != -1) {
                    res.add(words[i]);
                    break;
                }
            }
        }

        return res;
    }

    private int kmp(String word1, String word2) {
        int[] lps = new int[word2.length()];
        int prevLPS = 0, i = 1;

        while (i < word2.length()) {
            if (word2.charAt(i) == word2.charAt(prevLPS)) {
                lps[i] = prevLPS + 1;
                prevLPS++;
                i++;
            } else if (prevLPS == 0) {
                lps[i] = 0;
                i++;
            } else {
                prevLPS = lps[prevLPS - 1];
            }
        }

        i = 0;
        int j = 0;
        while (i < word1.length()) {
            if (word1.charAt(i) == word2.charAt(j)) {
                i++;
                j++;
            } else {
                if (j == 0) {
                    i++;
                } else {
                    j = lps[j - 1];
                }
            }

            if (j == word2.length()) {
                return i - word2.length();
            }
        }

        return -1;
    }
}
```

```cpp
class Solution {
public:
    vector<string> stringMatching(vector<string>& words) {
        vector<string> res;
        sort(words.begin(), words.end(), [](const string& a, const string& b) {
            return a.length() < b.length();
        });

        for (int i = 0; i < words.size(); i++) {
            for (int j = i + 1; j < words.size(); j++) {
                if (kmp(words[j], words[i]) != -1) {
                    res.push_back(words[i]);
                    break;
                }
            }
        }

        return res;
    }

private:
    int kmp(const string& word1, const string& word2) {
        vector<int> lps(word2.size(), 0);
        int prevLPS = 0, i = 1;

        while (i < word2.size()) {
            if (word2[i] == word2[prevLPS]) {
                lps[i++] = ++prevLPS;
            } else if (prevLPS == 0) {
                lps[i++] = 0;
            } else {
                prevLPS = lps[prevLPS - 1];
            }
        }

        i = 0;
        int j = 0;
        while (i < word1.size()) {
            if (word1[i] == word2[j]) {
                i++;
                j++;
            } else {
                if (j == 0) {
                    i++;
                } else {
                    j = lps[j - 1];
                }
            }

            if (j == word2.size()) {
                return i - word2.size();
            }
        }

        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @return {string[]}
     */
    stringMatching(words) {
        const kmp = (word1, word2) => {
            const lps = Array(word2.length).fill(0);
            let prevLPS = 0,
                i = 1;

            while (i < word2.length) {
                if (word2[i] === word2[prevLPS]) {
                    lps[i++] = ++prevLPS;
                } else if (prevLPS === 0) {
                    lps[i++] = 0;
                } else {
                    prevLPS = lps[prevLPS - 1];
                }
            }

            i = 0;
            let j = 0;
            while (i < word1.length) {
                if (word1[i] === word2[j]) {
                    i++;
                    j++;
                } else {
                    if (j === 0) {
                        i++;
                    } else {
                        j = lps[j - 1];
                    }
                }

                if (j === word2.length) {
                    return i - word2.length;
                }
            }

            return -1;
        };

        let res = [];
        words.sort((a, b) => a.length - b.length);

        for (let i = 0; i < words.length; i++) {
            for (let j = i + 1; j < words.length; j++) {
                if (kmp(words[j], words[i]) !== -1) {
                    res.push(words[i]);
                    break;
                }
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * m)$
- Space complexity:
    - $O(m)$ extra space.
    - $O(1)$ or $O(n)$ space depending on the sorting algorithm.
    - $O(n * m)$ space for the output list.

> Where $n$ is the number of words, and $m$ is the length of the longest word.

---

## 4. Rabin-Karp Algorithm (Rolling Hash)

::tabs-start

```python
class Solution:
    def stringMatching(self, words: List[str]) -> List[str]:
        def rabinKarp(word1: str, word2: str) -> int:
            base1, mod1 = 31, 768258391
            base2, mod2 = 37, 685683731
            n, m = len(word1), len(word2)

            power1, power2 = 1, 1
            for _ in range(m):
                power1 = (power1 * base1) % mod1
                power2 = (power2 * base2) % mod2

            word1_hash1 = word1_hash2 = 0
            word2_hash1 = word2_hash2 = 0

            for i in range(m):
                word1_hash1 = (word1_hash1 * base1 + ord(word2[i])) % mod1
                word1_hash2 = (word1_hash2 * base2 + ord(word2[i])) % mod2
                word2_hash1 = (word2_hash1 * base1 + ord(word1[i])) % mod1
                word2_hash2 = (word2_hash2 * base2 + ord(word1[i])) % mod2

            for i in range(n - m + 1):
                if word2_hash1 == word1_hash1 and word2_hash2 == word1_hash2:
                    return i

                if i + m < n:
                    word2_hash1 = (word2_hash1 * base1 - ord(word1[i]) * power1 + ord(word1[i + m])) % mod1
                    word2_hash2 = (word2_hash2 * base2 - ord(word1[i]) * power2 + ord(word1[i + m])) % mod2

                    word2_hash1 = (word2_hash1 + mod1) % mod1
                    word2_hash2 = (word2_hash2 + mod2) % mod2

            return -1

        res = []
        words.sort(key=len)

        for i in range(len(words)):
            for j in range(i + 1, len(words)):
                if rabinKarp(words[j], words[i]) != -1:
                    res.append(words[i])
                    break

        return res
```

```java
public class Solution {
    public List<String> stringMatching(String[] words) {
        List<String> res = new ArrayList<>();
        Arrays.sort(words, Comparator.comparingInt(String::length));

        for (int i = 0; i < words.length; i++) {
            for (int j = i + 1; j < words.length; j++) {
                if (rabinKarp(words[j], words[i]) != -1) {
                    res.add(words[i]);
                    break;
                }
            }
        }

        return res;
    }

    private int rabinKarp(String word1, String word2) {
        int base1 = 31, mod1 = 768258391;
        int base2 = 37, mod2 = 685683731;
        int n = word1.length(), m = word2.length();

        long power1 = 1, power2 = 1;
        for (int k = 0; k < m; k++) {
            power1 = (power1 * base1) % mod1;
            power2 = (power2 * base2) % mod2;
        }

        long word1Hash1 = 0, word1Hash2 = 0;
        long word2Hash1 = 0, word2Hash2 = 0;

        for (int i = 0; i < m; i++) {
            word1Hash1 = (word1Hash1 * base1 + word2.charAt(i)) % mod1;
            word1Hash2 = (word1Hash2 * base2 + word2.charAt(i)) % mod2;
            word2Hash1 = (word2Hash1 * base1 + word1.charAt(i)) % mod1;
            word2Hash2 = (word2Hash2 * base2 + word1.charAt(i)) % mod2;
        }

        for (int i = 0; i <= n - m; i++) {
            if (word2Hash1 == word1Hash1 && word2Hash2 == word1Hash2) {
                return i;
            }

            if (i + m < n) {
                word2Hash1 = (word2Hash1 * base1 - word1.charAt(i) * power1 + word1.charAt(i + m)) % mod1;
                word2Hash2 = (word2Hash2 * base2 - word1.charAt(i) * power2 + word1.charAt(i + m)) % mod2;

                if (word2Hash1 < 0) word2Hash1 += mod1;
                if (word2Hash2 < 0) word2Hash2 += mod2;
            }
        }

        return -1;
    }
}
```

```cpp
class Solution {
public:
    vector<string> stringMatching(vector<string>& words) {
        vector<string> res;
        sort(words.begin(), words.end(), [](const string& a, const string& b) {
            return a.length() < b.length();
        });

        for (int i = 0; i < words.size(); i++) {
            for (int j = i + 1; j < words.size(); j++) {
                if (rabinKarp(words[j], words[i]) != -1) {
                    res.push_back(words[i]);
                    break;
                }
            }
        }

        return res;
    }

private:
    int rabinKarp(const string& word1, const string& word2) {
        int base1 = 31, mod1 = 768258391;
        int base2 = 37, mod2 = 685683731;
        int n = word1.size(), m = word2.size();

        long long power1 = 1, power2 = 1;
        for (int i = 0; i < m; i++) {
            power1 = (power1 * base1) % mod1;
            power2 = (power2 * base2) % mod2;
        }

        long long word1Hash1 = 0, word1Hash2 = 0;
        long long word2Hash1 = 0, word2Hash2 = 0;

        for (int i = 0; i < m; i++) {
            word1Hash1 = (word1Hash1 * base1 + word2[i]) % mod1;
            word1Hash2 = (word1Hash2 * base2 + word2[i]) % mod2;
            word2Hash1 = (word2Hash1 * base1 + word1[i]) % mod1;
            word2Hash2 = (word2Hash2 * base2 + word1[i]) % mod2;
        }

        for (int i = 0; i <= n - m; i++) {
            if (word2Hash1 == word1Hash1 && word2Hash2 == word1Hash2) {
                return i;
            }

            if (i + m < n) {
                word2Hash1 = (word2Hash1 * base1 - word1[i] * power1 + word1[i + m]) % mod1;
                word2Hash2 = (word2Hash2 * base2 - word1[i] * power2 + word1[i + m]) % mod2;

                if (word2Hash1 < 0) word2Hash1 += mod1;
                if (word2Hash2 < 0) word2Hash2 += mod2;
            }
        }

        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @return {string[]}
     */
    stringMatching(words) {
        const rabinKarp = (word1, word2) => {
            const base1 = 31,
                mod1 = 768258391;
            const base2 = 37,
                mod2 = 685683731;
            const n = word1.length,
                m = word2.length;

            let power1 = 1,
                power2 = 1;
            for (let k = 0; k < m; k++) {
                power1 = (power1 * base1) % mod1;
                power2 = (power2 * base2) % mod2;
            }

            let hash1 = 0,
                hash2 = 0;
            let cur1 = 0,
                cur2 = 0;

            for (let i = 0; i < m; i++) {
                hash1 = (hash1 * base1 + word2.charCodeAt(i)) % mod1;
                hash2 = (hash2 * base2 + word2.charCodeAt(i)) % mod2;
                cur1 = (cur1 * base1 + word1.charCodeAt(i)) % mod1;
                cur2 = (cur2 * base2 + word1.charCodeAt(i)) % mod2;
            }

            for (let i = 0; i <= n - m; i++) {
                if (cur1 === hash1 && cur2 === hash2) {
                    return i;
                }

                if (i + m < n) {
                    cur1 =
                        (cur1 * base1 -
                            word1.charCodeAt(i) * power1 +
                            word1.charCodeAt(i + m)) %
                        mod1;
                    cur2 =
                        (cur2 * base2 -
                            word1.charCodeAt(i) * power2 +
                            word1.charCodeAt(i + m)) %
                        mod2;

                    cur1 = (cur1 + mod1) % mod1;
                    cur2 = (cur2 + mod2) % mod2;
                }
            }

            return -1;
        };

        words.sort((a, b) => a.length - b.length);
        let res = [];

        for (let i = 0; i < words.length; i++) {
            for (let j = i + 1; j < words.length; j++) {
                if (rabinKarp(words[j], words[i]) !== -1) {
                    res.push(words[i]);
                    break;
                }
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * m)$
- Space complexity:
    - $O(1)$ or $O(n)$ space depending on the sorting algorithm.
    - $O(n * m)$ space for the output list.

> Where $n$ is the number of words, and $m$ is the length of the longest word.

---

## 5. Z-Algorithm

::tabs-start

```python
class Solution:
    def stringMatching(self, words: List[str]) -> List[str]:
        def zAlgorithm(word1: str, word2: str) -> int:
            s = word2 + "$" + word1
            n = len(s)
            z = [0] * n
            l, r = 0, 0

            for i in range(1, n):
                if i <= r:
                    z[i] = min(r - i + 1, z[i - l])
                while i + z[i] < n and s[z[i]] == s[i + z[i]]:
                    z[i] += 1
                if i + z[i] - 1 > r:
                    l, r = i, i + z[i] - 1

            for i in range(len(word2) + 1, n):
                if z[i] == len(word2):
                    return i - len(word2) - 1

            return -1

        res = []
        words.sort(key=len)

        for i in range(len(words)):
            for j in range(i + 1, len(words)):
                if zAlgorithm(words[j], words[i]) != -1:
                    res.append(words[i])
                    break

        return res
```

```java
public class Solution {
    public List<String> stringMatching(String[] words) {
        List<String> res = new ArrayList<>();
        Arrays.sort(words, Comparator.comparingInt(String::length));

        for (int i = 0; i < words.length; i++) {
            for (int j = i + 1; j < words.length; j++) {
                if (zAlgorithm(words[j], words[i]) != -1) {
                    res.add(words[i]);
                    break;
                }
            }
        }

        return res;
    }

    private int zAlgorithm(String word1, String word2) {
        String s = word2 + "$" + word1;
        int n = s.length();
        int[] z = new int[n];
        int l = 0, r = 0;

        for (int i = 1; i < n; i++) {
            if (i <= r) {
                z[i] = Math.min(r - i + 1, z[i - l]);
            }
            while (i + z[i] < n && s.charAt(z[i]) == s.charAt(i + z[i])) {
                z[i]++;
            }
            if (i + z[i] - 1 > r) {
                l = i;
                r = i + z[i] - 1;
            }
        }

        for (int i = word2.length() + 1; i < n; i++) {
            if (z[i] == word2.length()) {
                return i - word2.length() - 1;
            }
        }

        return -1;
    }
}
```

```cpp
class Solution {
public:
    vector<string> stringMatching(vector<string>& words) {
        vector<string> res;
        sort(words.begin(), words.end(), [](const string& a, const string& b) {
            return a.length() < b.length();
        });

        for (int i = 0; i < words.size(); i++) {
            for (int j = i + 1; j < words.size(); j++) {
                if (zAlgorithm(words[j], words[i]) != -1) {
                    res.push_back(words[i]);
                    break;
                }
            }
        }

        return res;
    }

private:
    int zAlgorithm(const string& word1, const string& word2) {
        string s = word2 + "$" + word1;
        int n = s.size();
        vector<int> z(n, 0);
        int l = 0, r = 0;

        for (int i = 1; i < n; i++) {
            if (i <= r) {
                z[i] = min(r - i + 1, z[i - l]);
            }
            while (i + z[i] < n && s[z[i]] == s[i + z[i]]) {
                z[i]++;
            }
            if (i + z[i] - 1 > r) {
                l = i;
                r = i + z[i] - 1;
            }
        }

        for (int i = word2.size() + 1; i < n; i++) {
            if (z[i] == word2.size()) {
                return i - word2.size() - 1;
            }
        }

        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @return {string[]}
     */
    stringMatching(words) {
        const zAlgorithm = (word1, word2) => {
            const s = word2 + '$' + word1;
            const n = s.length;
            const z = Array(n).fill(0);
            let l = 0,
                r = 0;

            for (let i = 1; i < n; i++) {
                if (i <= r) {
                    z[i] = Math.min(r - i + 1, z[i - l]);
                }
                while (i + z[i] < n && s[z[i]] === s[i + z[i]]) {
                    z[i]++;
                }
                if (i + z[i] - 1 > r) {
                    l = i;
                    r = i + z[i] - 1;
                }
            }

            for (let i = word2.length + 1; i < n; i++) {
                if (z[i] === word2.length) {
                    return i - word2.length - 1;
                }
            }

            return -1;
        };

        words.sort((a, b) => a.length - b.length);
        let res = [];

        for (let i = 0; i < words.length; i++) {
            for (let j = i + 1; j < words.length; j++) {
                if (zAlgorithm(words[j], words[i]) !== -1) {
                    res.push(words[i]);
                    break;
                }
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * m)$
- Space complexity:
    - $O(m)$ extra space.
    - $O(1)$ or $O(n)$ space depending on the sorting algorithm.
    - $O(n * m)$ space for the output list.

> Where $n$ is the number of words, and $m$ is the length of the longest word.

---

## 6. Trie

::tabs-start

```python
class TrieNode:
    def __init__(self):
        self.children = [None] * 26
        self.cnt = 0

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert_suffixes(self, word: str) -> None:
        for i in range(len(word)):
            node = self.root
            for j in range(i, len(word)):
                idx = ord(word[j]) - ord('a')
                if not node.children[idx]:
                    node.children[idx] = TrieNode()

                node = node.children[idx]
                node.cnt += 1

    def search(self, word: str) -> bool:
        node = self.root
        for c in word:
            idx = ord(c) - ord('a')
            node = node.children[idx]
        return node.cnt > 1

class Solution:
    def stringMatching(self, words: List[str]) -> List[str]:
        res = []
        trie = Trie()

        for word in words:
            trie.insert_suffixes(word)

        for word in words:
            if trie.search(word):
                res.append(word)

        return res
```

```java
class TrieNode {
    TrieNode[] children;
    int cnt;

    TrieNode() {
        children = new TrieNode[26];
        cnt = 0;
    }
}

class Trie {
    TrieNode root;

    Trie() {
        root = new TrieNode();
    }

    void insertSuffixes(String word) {
        for (int i = 0; i < word.length(); i++) {
            TrieNode node = root;
            for (int j = i; j < word.length(); j++) {
                int idx = word.charAt(j) - 'a';
                if (node.children[idx] == null) {
                    node.children[idx] = new TrieNode();
                }

                node = node.children[idx];
                node.cnt++;
            }
        }
    }

    boolean search(String word) {
        TrieNode node = root;
        for (int i = 0; i < word.length(); i++) {
            int idx = word.charAt(i) - 'a';
            node = node.children[idx];
        }
        return node.cnt > 1;
    }
}

class Solution {
    public List<String> stringMatching(String[] words) {
        List<String> res = new ArrayList<>();
        Trie trie = new Trie();

        for (String word : words) {
            trie.insertSuffixes(word);
        }

        for (String word : words) {
            if (trie.search(word)) {
                res.add(word);
            }
        }

        return res;
    }
}
```

```cpp
class TrieNode {
public:
    TrieNode* children[26];
    int cnt;

    TrieNode() {
        for (int i = 0; i < 26; i++) children[i] = nullptr;
        cnt = 0;
    }
};

class Trie {
public:
    TrieNode* root;

    Trie() {
        root = new TrieNode();
    }

    void insertSuffixes(const string& word) {
        for (int i = 0; i < word.size(); i++) {
            TrieNode* node = root;
            for (int j = i; j < word.size(); j++) {
                int idx = word[j] - 'a';
                if (!node->children[idx]) {
                    node->children[idx] = new TrieNode();
                }

                node = node->children[idx];
                node->cnt++;
            }
        }
    }

    bool search(const string& word) {
        TrieNode* node = root;
        for (char c : word) {
            int idx = c - 'a';
            node = node->children[idx];
        }
        return node->cnt > 1;
    }
};

class Solution {
public:
    vector<string> stringMatching(vector<string>& words) {
        vector<string> res;
        Trie trie;

        for (const string& word : words) {
            trie.insertSuffixes(word);
        }

        for (const string& word : words) {
            if (trie.search(word)) {
                res.push_back(word);
            }
        }

        return res;
    }
};
```

```javascript
class TrieNode {
    constructor() {
        this.children = new Array(26).fill(null);
        this.cnt = 0;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    /**
     * @param {string} word
     * @return {void}
     */
    insertSuffixes(word) {
        for (let i = 0; i < word.length; i++) {
            let node = this.root;
            for (let j = i; j < word.length; j++) {
                let idx = word.charCodeAt(j) - 97;
                if (!node.children[idx]) {
                    node.children[idx] = new TrieNode();
                }

                node = node.children[idx];
                node.cnt++;
            }
        }
    }

    /**
     * @param {string} word
     * @return {boolean}
     */
    search(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            let idx = word.charCodeAt(i) - 97;
            node = node.children[idx];
        }
        return node.cnt > 1;
    }
}

class Solution {
    /**
     * @param {string[]} words
     * @return {string[]}
     */
    stringMatching(words) {
        const res = [];
        const trie = new Trie();

        for (let word of words) {
            trie.insertSuffixes(word);
        }

        for (let word of words) {
            if (trie.search(word)) {
                res.push(word);
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m ^ 2)$
- Space complexity:
    - $O(n * m ^ 2)$ extra space.
    - $O(n * m)$ space for the output list.

> Where $n$ is the number of words, and $m$ is the length of the longest word.
