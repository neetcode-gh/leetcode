## 1. Concatenate Strings

::tabs-start

```python
class Solution:
    def arrayStringsAreEqual(self, word1: List[str], word2: List[str]) -> bool:
        return "".join(word1) == "".join(word2)
```

```java
public class Solution {
    public boolean arrayStringsAreEqual(String[] word1, String[] word2) {
        return String.join("", word1).equals(String.join("", word2));
    }
}
```

```cpp
class Solution {
public:
    bool arrayStringsAreEqual(vector<string>& word1, vector<string>& word2) {
        string str1 = accumulate(word1.begin(), word1.end(), string());
        string str2 = accumulate(word2.begin(), word2.end(), string());
        return str1 == str2;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} word1
     * @param {string[]} word2
     * @return {boolean}
     */
    arrayStringsAreEqual(word1, word2) {
        return word1.join('') === word2.join('');
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$

> Where $n$ and $m$ are the total number of characters in both the arrays $word1$ and $word2$, respectively.

---

## 2. Concatenate Strings Of One Array

::tabs-start

```python
class Solution:
    def arrayStringsAreEqual(self, word1: List[str], word2: List[str]) -> bool:
        s1 = "".join(word1)
        i = 0
        for w in word2:
            for c in w:
                if i == len(s1) or s1[i] != c:
                    return False
                i += 1
        return i == len(s1)
```

```java
public class Solution {
    public boolean arrayStringsAreEqual(String[] word1, String[] word2) {
        StringBuilder s1 = new StringBuilder();
        for (String w : word1) {
            s1.append(w);
        }

        int i = 0;
        for (String w : word2) {
            for (char c : w.toCharArray()) {
                if (i == s1.length() || s1.charAt(i) != c) {
                    return false;
                }
                i++;
            }
        }
        return i == s1.length();
    }
}
```

```cpp
class Solution {
public:
    bool arrayStringsAreEqual(vector<string>& word1, vector<string>& word2) {
        string s1 = "";
        for (string w : word1) s1 += w;

        int i = 0;
        for (string w : word2) {
            for (char c : w) {
                if (i == s1.length() || s1[i] != c) return false;
                i++;
            }
        }
        return i == s1.length();
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} word1
     * @param {string[]} word2
     * @return {boolean}
     */
    arrayStringsAreEqual(word1, word2) {
        let s1 = word1.join('');
        let i = 0;

        for (let w of word2) {
            for (let c of w) {
                if (i === s1.length || s1[i] !== c) {
                    return false;
                }
                i++;
            }
        }
        return i === s1.length;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n)$

> Where $n$ and $m$ are the total number of characters in both the arrays $word1$ and $word2$, respectively.

---

## 3. Two Pointers

::tabs-start

```python
class Solution:
    def arrayStringsAreEqual(self, word1: List[str], word2: List[str]) -> bool:
        w1 = w2 = 0  # Index of word
        i = j = 0    # Index of character

        while w1 < len(word1) and w2 < len(word2):
            if word1[w1][i] != word2[w2][j]:
                return False

            i, j = i + 1, j + 1

            if i == len(word1[w1]):
                w1 += 1
                i = 0
            if j == len(word2[w2]):
                w2 += 1
                j = 0

        return w1 == len(word1) and w2 == len(word2)
```

```java
public class Solution {
    public boolean arrayStringsAreEqual(String[] word1, String[] word2) {
        int w1 = 0, w2 = 0; // Index of word
        int i = 0, j = 0;   // Index of character

        while (w1 < word1.length && w2 < word2.length) {
            if (word1[w1].charAt(i) != word2[w2].charAt(j)) {
                return false;
            }

            i++;
            j++;

            if (i == word1[w1].length()) {
                w1++;
                i = 0;
            }
            if (j == word2[w2].length()) {
                w2++;
                j = 0;
            }
        }
        return w1 == word1.length && w2 == word2.length;
    }
}
```

```cpp
class Solution {
public:
    bool arrayStringsAreEqual(vector<string>& word1, vector<string>& word2) {
        int w1 = 0, w2 = 0; // Index of word
        int i = 0, j = 0;   // Index of character

        while (w1 < word1.size() && w2 < word2.size()) {
            if (word1[w1][i] != word2[w2][j]) {
                return false;
            }

            i++;
            j++;

            if (i == word1[w1].size()) {
                w1++;
                i = 0;
            }
            if (j == word2[w2].size()) {
                w2++;
                j = 0;
            }
        }
        return w1 == word1.size() && w2 == word2.size();
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} word1
     * @param {string[]} word2
     * @return {boolean}
     */
    arrayStringsAreEqual(word1, word2) {
        let w1 = 0,
            w2 = 0; // Index of word
        let i = 0,
            j = 0; // Index of character

        while (w1 < word1.length && w2 < word2.length) {
            if (word1[w1][i] !== word2[w2][j]) {
                return false;
            }

            i++;
            j++;

            if (i === word1[w1].length) {
                w1++;
                i = 0;
            }
            if (j === word2[w2].length) {
                w2++;
                j = 0;
            }
        }
        return w1 === word1.length && w2 === word2.length;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(1)$ extra space.

> Where $n$ and $m$ are the total number of characters in both the arrays $word1$ and $word2$, respectively.
