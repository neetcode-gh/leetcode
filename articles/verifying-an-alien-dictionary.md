## 1. Sorting

::tabs-start

```python
class Solution:
    def isAlienSorted(self, words: List[str], order: str) -> bool:
        order_index = {c: i for i, c in enumerate(order)}

        def compare(word):
            return [order_index[c] for c in word]

        return words == sorted(words, key=compare)
```

```java
public class Solution {
    public boolean isAlienSorted(String[] words, String order) {
        int[] orderIndex = new int[26];
        for (int i = 0; i < order.length(); i++)
            orderIndex[order.charAt(i) - 'a'] = i;

        Comparator<String> compare = (w1, w2) -> {
            for (int i = 0; i < Math.min(w1.length(), w2.length()); i++) {
                if (w1.charAt(i) != w2.charAt(i))
                    return orderIndex[w1.charAt(i) - 'a'] - orderIndex[w2.charAt(i) - 'a'];
            }
            return w1.length() - w2.length();
        };

        String[] sortedWords = words.clone();
        Arrays.sort(sortedWords, compare);
        return Arrays.equals(words, sortedWords);
    }
}
```

```cpp
class Solution {
public:
    bool isAlienSorted(vector<string>& words, string order) {
        int orderIndex[26];
        for (int i = 0; i < order.size(); ++i)
            orderIndex[order[i] - 'a'] = i;

        auto compare = [&](const string &a, const string &b) {
            for (int i = 0; i < min(a.size(), b.size()); ++i) {
                if (a[i] != b[i])
                    return orderIndex[a[i] - 'a'] < orderIndex[b[i] - 'a'];
            }
            return a.size() < b.size();
        };

        return is_sorted(words.begin(), words.end(), compare);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @param {string} order
     * @return {boolean}
     */
    isAlienSorted(words, order) {
        let orderIndex = new Array(26).fill(0);
        for (let i = 0; i < order.length; i++) {
            orderIndex[order.charCodeAt(i) - 97] = i;
        }

        const compare = (w1, w2) => {
            for (let i = 0; i < Math.min(w1.length, w2.length); i++) {
                if (w1[i] !== w2[i]) {
                    return (
                        orderIndex[w1.charCodeAt(i) - 97] -
                        orderIndex[w2.charCodeAt(i) - 97]
                    );
                }
            }
            return w1.length - w2.length;
        };

        let sortedWords = [...words].sort(compare);
        return words.join() === sortedWords.join();
    }
}
```

```csharp
public class Solution {
    public bool IsAlienSorted(string[] words, string order) {
        int[] orderIndex = new int[26];
        for (int i = 0; i < order.Length; i++) {
            orderIndex[order[i] - 'a'] = i;
        }

        string[] sortedWords = (string[])words.Clone();
        Array.Sort(sortedWords, (w1, w2) => {
            for (int i = 0; i < Math.Min(w1.Length, w2.Length); i++) {
                if (w1[i] != w2[i]) {
                    return orderIndex[w1[i] - 'a'] - orderIndex[w2[i] - 'a'];
                }
            }
            return w1.Length - w2.Length;
        });

        for (int i = 0; i < words.Length; i++) {
            if (!words[i].Equals(sortedWords[i])) {
                return false;
            }
        }

        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m\log n)$
- Space complexity: $O(n * m)$

> Where $n$ is the number of words and $m$ is the average length of a word.

---

## 2. Comparing adjacent words

::tabs-start

```python
class Solution:
    def isAlienSorted(self, words: List[str], order: str) -> bool:
        order_index = {c: i for i, c in enumerate(order)}

        for i in range(len(words) - 1):
            w1, w2 = words[i], words[i + 1]

            for j in range(len(w1)):
                if j == len(w2):
                    return False

                if w1[j] != w2[j]:
                    if order_index[w1[j]] > order_index[w2[j]]:
                        return False
                    break
        return True
```

```java
public class Solution {
    public boolean isAlienSorted(String[] words, String order) {
        int[] orderIndex = new int[26];
        for (int i = 0; i < order.length(); i++)
            orderIndex[order.charAt(i) - 'a'] = i;

        for (int i = 0; i < words.length - 1; i++) {
            String w1 = words[i], w2 = words[i + 1];
            int j = 0;

            for (; j < w1.length(); j++) {
                if (j == w2.length()) return false;
                if (w1.charAt(j) != w2.charAt(j)) {
                    if (orderIndex[w1.charAt(j) - 'a'] > orderIndex[w2.charAt(j) - 'a']) {
                        return false;
                    }
                    break;
                }
            }
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool isAlienSorted(vector<string>& words, string order) {
        int orderIndex[26] = {0};
        for (int i = 0; i < order.size(); ++i)
            orderIndex[order[i] - 'a'] = i;

        for (int i = 0; i < words.size() - 1; ++i) {
            string w1 = words[i], w2 = words[i + 1];
            int j = 0;

            for (; j < w1.size(); ++j) {
                if (j == w2.size()) return false;
                if (w1[j] != w2[j]) {
                    if (orderIndex[w1[j] - 'a'] > orderIndex[w2[j] - 'a'])
                        return false;
                    break;
                }
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
     * @param {string} order
     * @return {boolean}
     */
    isAlienSorted(words, order) {
        let orderIndex = new Array(26).fill(0);
        for (let i = 0; i < order.length; i++) {
            orderIndex[order.charCodeAt(i) - 97] = i;
        }

        for (let i = 0; i < words.length - 1; i++) {
            let w1 = words[i],
                w2 = words[i + 1];

            for (let j = 0; j < w1.length; j++) {
                if (j === w2.length) return false;

                if (w1[j] !== w2[j]) {
                    if (
                        orderIndex[w1.charCodeAt(j) - 97] >
                        orderIndex[w2.charCodeAt(j) - 97]
                    )
                        return false;
                    break;
                }
            }
        }
        return true;
    }
}
```

```csharp
public class Solution {
    public bool IsAlienSorted(string[] words, string order) {
        Dictionary<char, int> orderIndex = new Dictionary<char, int>();
        for (int i = 0; i < order.Length; i++) {
            orderIndex[order[i]] = i;
        }

        for (int i = 0; i < words.Length - 1; i++) {
            string w1 = words[i];
            string w2 = words[i + 1];

            for (int j = 0; j < w1.Length; j++) {
                if (j == w2.Length) {
                    return false;
                }

                if (w1[j] != w2[j]) {
                    if (orderIndex[w1[j]] > orderIndex[w2[j]]) {
                        return false;
                    }
                    break;
                }
            }
        }

        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(1)$ since we have $26$ different characters.

> Where $n$ is the number of words and $m$ is the average length of a word.
