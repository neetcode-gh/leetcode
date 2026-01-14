## 1. Concatenate Strings

### Intuition

The simplest approach is to concatenate all strings in each array into a single string, then compare the two resulting strings. If they match character by character, the arrays represent the same string.

### Algorithm

1. Join all strings in `word1` into a single string.
2. Join all strings in `word2` into a single string.
3. Compare the two concatenated strings.
4. Return `true` if they are equal, `false` otherwise.

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

```csharp
public class Solution {
    public bool ArrayStringsAreEqual(string[] word1, string[] word2) {
        return string.Join("", word1) == string.Join("", word2);
    }
}
```

```go
func arrayStringsAreEqual(word1 []string, word2 []string) bool {
    return strings.Join(word1, "") == strings.Join(word2, "")
}
```

```kotlin
class Solution {
    fun arrayStringsAreEqual(word1: Array<String>, word2: Array<String>): Boolean {
        return word1.joinToString("") == word2.joinToString("")
    }
}
```

```swift
class Solution {
    func arrayStringsAreEqual(_ word1: [String], _ word2: [String]) -> Bool {
        return word1.joined() == word2.joined()
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

### Intuition

We can reduce space usage by only concatenating one of the arrays. We then iterate through the second array character by character, comparing each character against the concatenated string. This way, we only build one full string instead of two.

### Algorithm

1. Concatenate all strings in `word1` into a single string `s1`.
2. Initialize an index pointer `i` to `0`.
3. Iterate through each string in `word2`, then through each character in that string.
4. For each character, check if the index has exceeded `s1`'s length or if the characters do not match.
5. If either condition is true, return `false` immediately.
6. Increment the index after each successful comparison.
7. After processing all of `word2`, return `true` only if `i` equals the length of `s1` (ensuring both have the same length).

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

```csharp
public class Solution {
    public bool ArrayStringsAreEqual(string[] word1, string[] word2) {
        string s1 = string.Join("", word1);
        int i = 0;

        foreach (string w in word2) {
            foreach (char c in w) {
                if (i == s1.Length || s1[i] != c) {
                    return false;
                }
                i++;
            }
        }
        return i == s1.Length;
    }
}
```

```go
func arrayStringsAreEqual(word1 []string, word2 []string) bool {
    s1 := strings.Join(word1, "")
    i := 0

    for _, w := range word2 {
        for _, c := range w {
            if i == len(s1) || rune(s1[i]) != c {
                return false
            }
            i++
        }
    }
    return i == len(s1)
}
```

```kotlin
class Solution {
    fun arrayStringsAreEqual(word1: Array<String>, word2: Array<String>): Boolean {
        val s1 = word1.joinToString("")
        var i = 0

        for (w in word2) {
            for (c in w) {
                if (i == s1.length || s1[i] != c) {
                    return false
                }
                i++
            }
        }
        return i == s1.length
    }
}
```

```swift
class Solution {
    func arrayStringsAreEqual(_ word1: [String], _ word2: [String]) -> Bool {
        let s1 = word1.joined()
        var i = 0
        let s1Array = Array(s1)

        for w in word2 {
            for c in w {
                if i == s1Array.count || s1Array[i] != c {
                    return false
                }
                i += 1
            }
        }
        return i == s1Array.count
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

### Intuition

We can avoid creating any concatenated strings by using four pointers: two to track which string we are currently in (one for each array), and two to track the character position within those strings. We compare characters one at a time, advancing through both arrays simultaneously.

### Algorithm

1. Initialize four pointers: `w1` and `w2` for the current word index in each array, `i` and `j` for the character position within the current words.
2. While both arrays have more content to process:
   - Compare the current characters from both arrays.
   - If they differ, return `false`.
   - Advance both character pointers.
   - If a character pointer reaches the end of its current word, move to the next word and reset the character pointer to `0`.
3. After the loop, check that both arrays have been fully processed (both word pointers have reached the end).
4. Return `true` if both arrays are exhausted, `false` otherwise.

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

```csharp
public class Solution {
    public bool ArrayStringsAreEqual(string[] word1, string[] word2) {
        int w1 = 0, w2 = 0; // Index of word
        int i = 0, j = 0;   // Index of character

        while (w1 < word1.Length && w2 < word2.Length) {
            if (word1[w1][i] != word2[w2][j]) {
                return false;
            }

            i++;
            j++;

            if (i == word1[w1].Length) {
                w1++;
                i = 0;
            }
            if (j == word2[w2].Length) {
                w2++;
                j = 0;
            }
        }
        return w1 == word1.Length && w2 == word2.Length;
    }
}
```

```go
func arrayStringsAreEqual(word1 []string, word2 []string) bool {
    w1, w2 := 0, 0 // Index of word
    i, j := 0, 0   // Index of character

    for w1 < len(word1) && w2 < len(word2) {
        if word1[w1][i] != word2[w2][j] {
            return false
        }

        i++
        j++

        if i == len(word1[w1]) {
            w1++
            i = 0
        }
        if j == len(word2[w2]) {
            w2++
            j = 0
        }
    }
    return w1 == len(word1) && w2 == len(word2)
}
```

```kotlin
class Solution {
    fun arrayStringsAreEqual(word1: Array<String>, word2: Array<String>): Boolean {
        var w1 = 0
        var w2 = 0 // Index of word
        var i = 0
        var j = 0   // Index of character

        while (w1 < word1.size && w2 < word2.size) {
            if (word1[w1][i] != word2[w2][j]) {
                return false
            }

            i++
            j++

            if (i == word1[w1].length) {
                w1++
                i = 0
            }
            if (j == word2[w2].length) {
                w2++
                j = 0
            }
        }
        return w1 == word1.size && w2 == word2.size
    }
}
```

```swift
class Solution {
    func arrayStringsAreEqual(_ word1: [String], _ word2: [String]) -> Bool {
        var w1 = 0, w2 = 0 // Index of word
        var i = 0, j = 0   // Index of character
        let word1Arrays = word1.map { Array($0) }
        let word2Arrays = word2.map { Array($0) }

        while w1 < word1Arrays.count && w2 < word2Arrays.count {
            if word1Arrays[w1][i] != word2Arrays[w2][j] {
                return false
            }

            i += 1
            j += 1

            if i == word1Arrays[w1].count {
                w1 += 1
                i = 0
            }
            if j == word2Arrays[w2].count {
                w2 += 1
                j = 0
            }
        }
        return w1 == word1Arrays.count && w2 == word2Arrays.count
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(1)$ extra space.

> Where $n$ and $m$ are the total number of characters in both the arrays $word1$ and $word2$, respectively.

---

## Common Pitfalls

### Forgetting the Final Length Check
When iterating through one array while comparing to the concatenated string of the other, returning `true` after matching all characters without verifying both strings have the same length. If `word2` is shorter than `word1`, all characters may match but the strings are not equivalent.

```python
# Wrong: missing final length check
return True

# Correct: verify all characters were consumed
return i == len(s1)
```

### Comparing Array Lengths Instead of Total Characters
Assuming arrays with the same number of elements will produce equivalent strings. The arrays `["ab", "c"]` and `["a", "bc"]` have different lengths but represent the same string `"abc"`.
