## 1. Two Hash Maps

::tabs-start

```python
class Solution:
    def wordPattern(self, pattern: str, s: str) -> bool:
        words = s.split(" ")
        if len(pattern) != len(words):
            return False

        charToWord = {}
        wordToChar = {}

        for c, w in zip(pattern, words):
            if c in charToWord and charToWord[c] != w:
                return False
            if w in wordToChar and wordToChar[w] != c:
                return False
            charToWord[c] = w
            wordToChar[w] = c
        return True
```

```java
public class Solution {
    public boolean wordPattern(String pattern, String s) {
        String[] words = s.split(" ");
        if (pattern.length() != words.length) {
            return false;
        }

        Map<Character, String> charToWord = new HashMap<>();
        Map<String, Character> wordToChar = new HashMap<>();

        for (int i = 0; i < pattern.length(); i++) {
            char c = pattern.charAt(i);
            String w = words[i];

            if (charToWord.containsKey(c) && !charToWord.get(c).equals(w)) {
                return false;
            }
            if (wordToChar.containsKey(w) && wordToChar.get(w) != c) {
                return false;
            }

            charToWord.put(c, w);
            wordToChar.put(w, c);
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool wordPattern(string pattern, string s) {
        vector<string> words;
        string word;
        stringstream ss(s);
        while (ss >> word) {
            words.push_back(word);
        }

        if (pattern.length() != words.size()) {
            return false;
        }

        unordered_map<char, string> charToWord;
        unordered_map<string, char> wordToChar;

        for (int i = 0; i < pattern.length(); i++) {
            char c = pattern[i];
            string& w = words[i];

            if (charToWord.count(c) && charToWord[c] != w) {
                return false;
            }
            if (wordToChar.count(w) && wordToChar[w] != c) {
                return false;
            }

            charToWord[c] = w;
            wordToChar[w] = c;
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} pattern
     * @param {string} s
     * @return {boolean}
     */
    wordPattern(pattern, s) {
        const words = s.split(' ');
        if (pattern.length !== words.length) {
            return false;
        }

        const charToWord = new Map();
        const wordToChar = new Map();

        for (let i = 0; i < pattern.length; i++) {
            const c = pattern[i];
            const w = words[i];

            if (charToWord.has(c) && charToWord.get(c) !== w) {
                return false;
            }
            if (wordToChar.has(w) && wordToChar.get(w) !== c) {
                return false;
            }

            charToWord.set(c, w);
            wordToChar.set(w, c);
        }
        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(m)$

> Where $n$ is the length of the string $pattern$ and $m$ is the length of the string $s$.

---

## 2. Two Hash Maps (Optimal)

::tabs-start

```python
class Solution:
    def wordPattern(self, pattern: str, s: str) -> bool:
        charToWord = {}
        wordToChar = {}
        words = s.split()

        if len(pattern) != len(words):
            return False

        for i, (c, word) in enumerate(zip(pattern, words)):
            if charToWord.get(c, 0) != wordToChar.get(word, 0):
                return False
            charToWord[c] = i + 1
            wordToChar[word] = i + 1

        return True
```

```java
public class Solution {
    public boolean wordPattern(String pattern, String s) {
        Map<Character, Integer> charToWord = new HashMap<>();
        Map<String, Integer> wordToChar = new HashMap<>();
        String[] words = s.split(" ");

        if (words.length != pattern.length()) return false;

        for (int i = 0; i < pattern.length(); i++) {
            if (charToWord.containsKey(pattern.charAt(i)) &&
                !words[charToWord.get(pattern.charAt(i))].equals(words[i])) {
                return false;
            }

            if (wordToChar.containsKey(words[i]) &&
                pattern.charAt(wordToChar.get(words[i])) != pattern.charAt(i)) {
                return false;
            }

            charToWord.put(pattern.charAt(i), i);
            wordToChar.put(words[i], i);
        }

        return true;
    }
}
```

```cpp
class Solution {
public:
    bool wordPattern(string pattern, string s) {
        unordered_map<char, int> charToWord;
        unordered_map<string, int> wordToChar;
        istringstream in(s);
        int i = 0, n = pattern.size();
        for (string word; in >> word; ++i) {
            if (i == n || charToWord[pattern[i]] != wordToChar[word]) {
                return false;
            }
            charToWord[pattern[i]] = wordToChar[word] = i + 1;
        }
        return i == n;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} pattern
     * @param {string} s
     * @return {boolean}
     */
    wordPattern(pattern, s) {
        const charToWord = new Map();
        const wordToChar = new Map();
        const words = s.split(' ');

        if (pattern.length !== words.length) {
            return false;
        }

        for (let i = 0; i < words.length; i++) {
            const c = pattern[i];
            const word = words[i];

            if ((charToWord.get(c) || 0) !== (wordToChar.get(word) || 0)) {
                return false;
            }

            charToWord.set(c, i + 1);
            wordToChar.set(word, i + 1);
        }

        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(m)$

> Where $n$ is the length of the string $pattern$ and $m$ is the length of the string $s$.

---

## 3. Hash Set

::tabs-start

```python
class Solution:
    def wordPattern(self, pattern: str, s: str) -> bool:
        words = s.split()
        if len(pattern) != len(words):
            return False

        charToWord = {}
        store = set()

        for i, (c, w) in enumerate(zip(pattern, words)):
            if c in charToWord:
                if words[charToWord[c]] != w:
                    return False
            else:
                if w in store:
                    return False
                charToWord[c] = i
                store.add(w)

        return True
```

```java
public class Solution {
    public boolean wordPattern(String pattern, String s) {
        String[] words = s.split(" ");
        if (pattern.length() != words.length) return false;

        Map<Character, Integer> charToWord = new HashMap<>();
        Set<String> store = new HashSet<>();

        for (int i = 0; i < pattern.length(); i++) {
            char c = pattern.charAt(i);

            if (charToWord.containsKey(c)) {
                if (!words[charToWord.get(c)].equals(words[i])) {
                    return false;
                }
            } else {
                if (store.contains(words[i])) {
                    return false;
                }
                charToWord.put(c, i);
                store.add(words[i]);
            }
        }

        return true;
    }
}
```

```cpp
class Solution {
public:
    bool wordPattern(string pattern, string s) {
        stringstream ss(s);
        string word;
        vector<string> words;

        while (ss >> word) {
            words.push_back(word);
        }

        if (pattern.length() != words.size()) return false;

        unordered_map<char, int> charToWord;
        set<string> store;

        for (int i = 0; i < pattern.length(); i++) {
            char c = pattern[i];

            if (charToWord.count(c)) {
                if (words[charToWord[c]] != words[i]) {
                    return false;
                }
            } else {
                if (store.count(words[i])) {
                    return false;
                }
                charToWord[c] = i;
                store.insert(words[i]);
            }
        }

        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} pattern
     * @param {string} s
     * @return {boolean}
     */
    wordPattern(pattern, s) {
        const charToWord = new Map();
        const wordToChar = new Map();
        const words = s.split(' ');

        if (pattern.length !== words.length) {
            return false;
        }

        for (let i = 0; i < words.length; i++) {
            const c = pattern[i];
            const word = words[i];

            if ((charToWord.get(c) || 0) !== (wordToChar.get(word) || 0)) {
                return false;
            }

            charToWord.set(c, i + 1);
            wordToChar.set(word, i + 1);
        }

        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(m)$

> Where $n$ is the length of the string $pattern$ and $m$ is the length of the string $s$.

---

## 4. Single Hash Map

::tabs-start

```python
class Solution:
    def wordPattern(self, pattern: str, s: str) -> bool:
        words = s.split()
        if len(pattern) != len(words):
            return False

        charToWord = {}

        for i, (c, w) in enumerate(zip(pattern, words)):
            if c in charToWord:
                if words[charToWord[c]] != w:
                    return False
            else:
                # iterates atmost 26 times (a - z)
                for k in charToWord:
                    if words[charToWord[k]] == w:
                        return False
                charToWord[c] = i

        return True
```

```java
public class Solution {
    public boolean wordPattern(String pattern, String s) {
        String[] words = s.split(" ");
        if (pattern.length() != words.length) {
            return false;
        }

        Map<Character, Integer> charToWord = new HashMap<>();
        for (int i = 0; i < pattern.length(); i++) {
            char c = pattern.charAt(i);
            String w = words[i];

            if (charToWord.containsKey(c)) {
                if (!words[charToWord.get(c)].equals(w)) {
                    return false;
                }
            } else {
                for (Map.Entry<Character, Integer> entry : charToWord.entrySet()) {
                    if (words[entry.getValue()].equals(w)) {
                        return false;
                    }
                }
                charToWord.put(c, i);
            }
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool wordPattern(string pattern, string s) {
        vector<string> words;
        string word;
        stringstream ss(s);
        while (ss >> word) {
            words.push_back(word);
        }

        if (pattern.size() != words.size()) {
            return false;
        }

        unordered_map<char, int> charToWord;
        for (int i = 0; i < pattern.size(); ++i) {
            char c = pattern[i];
            const string& w = words[i];

            if (charToWord.count(c)) {
                if (words[charToWord[c]] != w) {
                    return false;
                }
            } else {
                for (const auto& [key, val] : charToWord) {
                    if (words[val] == w) {
                        return false;
                    }
                }
                charToWord[c] = i;
            }
        }

        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} pattern
     * @param {string} s
     * @return {boolean}
     */
    wordPattern(pattern, s) {
        const words = s.split(' ');
        if (pattern.length !== words.length) {
            return false;
        }

        const charToWord = new Map();
        for (let i = 0; i < pattern.length; i++) {
            const c = pattern[i];
            const w = words[i];

            if (charToWord.has(c)) {
                if (words[charToWord.get(c)] !== w) {
                    return false;
                }
            } else {
                for (const [key, index] of charToWord.entries()) {
                    if (words[index] === w) {
                        return false;
                    }
                }
                charToWord.set(c, i);
            }
        }

        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(m)$

> Where $n$ is the length of the string $pattern$ and $m$ is the length of the string $s$.
