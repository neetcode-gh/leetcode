## 1. Sorting

### Intuition
If the words are sorted according to the alien dictionary order, they should remain in the same order after sorting. The key insight is that we can create a mapping from each character to its position in the alien alphabet, then use this mapping to define a custom comparator for sorting.

### Algorithm
1. Create a mapping from each character to its index position in the `order` string.
2. Define a comparison function that compares two words character by character using the alien order indices.
3. For characters that differ, the word with the smaller index character comes first.
4. If all compared characters are equal, the shorter word comes first.
5. Sort a copy of the `words` array using this custom comparator.
6. Compare the sorted array with the original array and return `true` if they are identical.

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

```go
func isAlienSorted(words []string, order string) bool {
    orderIndex := make([]int, 26)
    for i, c := range order {
        orderIndex[c-'a'] = i
    }

    compare := func(w1, w2 string) bool {
        for i := 0; i < len(w1) && i < len(w2); i++ {
            if w1[i] != w2[i] {
                return orderIndex[w1[i]-'a'] < orderIndex[w2[i]-'a']
            }
        }
        return len(w1) <= len(w2)
    }

    sortedWords := make([]string, len(words))
    copy(sortedWords, words)
    sort.Slice(sortedWords, func(i, j int) bool {
        return compare(sortedWords[i], sortedWords[j])
    })

    for i := range words {
        if words[i] != sortedWords[i] {
            return false
        }
    }
    return true
}
```

```kotlin
class Solution {
    fun isAlienSorted(words: Array<String>, order: String): Boolean {
        val orderIndex = IntArray(26)
        for (i in order.indices) {
            orderIndex[order[i] - 'a'] = i
        }

        val compare = Comparator<String> { w1, w2 ->
            for (i in 0 until minOf(w1.length, w2.length)) {
                if (w1[i] != w2[i]) {
                    return@Comparator orderIndex[w1[i] - 'a'] - orderIndex[w2[i] - 'a']
                }
            }
            w1.length - w2.length
        }

        val sortedWords = words.clone()
        sortedWords.sortWith(compare)

        for (i in words.indices) {
            if (words[i] != sortedWords[i]) {
                return false
            }
        }
        return true
    }
}
```

```swift
class Solution {
    func isAlienSorted(_ words: [String], _ order: String) -> Bool {
        var orderIndex = [Int](repeating: 0, count: 26)
        for (i, c) in order.enumerated() {
            orderIndex[Int(c.asciiValue! - Character("a").asciiValue!)] = i
        }

        let sortedWords = words.sorted { w1, w2 in
            let arr1 = Array(w1), arr2 = Array(w2)
            for i in 0..<min(arr1.count, arr2.count) {
                if arr1[i] != arr2[i] {
                    let idx1 = Int(arr1[i].asciiValue! - Character("a").asciiValue!)
                    let idx2 = Int(arr2[i].asciiValue! - Character("a").asciiValue!)
                    return orderIndex[idx1] < orderIndex[idx2]
                }
            }
            return arr1.count < arr2.count
        }

        return words == sortedWords
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

### Intuition
For a list to be sorted, each adjacent pair must be in the correct order. Instead of sorting, we can directly verify that each word is lexicographically less than or equal to the next word according to the alien order. This avoids the overhead of sorting.

### Algorithm
1. Create a mapping from each character to its index position in the `order` string.
2. Iterate through adjacent pairs of words (`w1`, `w2`) in the array.
3. Compare characters at each position until a difference is found or one word ends.
4. If `w1` is longer than `w2` and all compared characters match, return `false` (prefix violation).
5. If characters differ, check that `w1`'s character has a smaller index than `w2`'s character in alien order. If not, return `false`.
6. If all adjacent pairs pass validation, return `true`.

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

```go
func isAlienSorted(words []string, order string) bool {
    orderIndex := make([]int, 26)
    for i, c := range order {
        orderIndex[c-'a'] = i
    }

    for i := 0; i < len(words)-1; i++ {
        w1, w2 := words[i], words[i+1]

        for j := 0; j < len(w1); j++ {
            if j == len(w2) {
                return false
            }

            if w1[j] != w2[j] {
                if orderIndex[w1[j]-'a'] > orderIndex[w2[j]-'a'] {
                    return false
                }
                break
            }
        }
    }
    return true
}
```

```kotlin
class Solution {
    fun isAlienSorted(words: Array<String>, order: String): Boolean {
        val orderIndex = IntArray(26)
        for (i in order.indices) {
            orderIndex[order[i] - 'a'] = i
        }

        for (i in 0 until words.size - 1) {
            val w1 = words[i]
            val w2 = words[i + 1]

            for (j in w1.indices) {
                if (j == w2.length) {
                    return false
                }

                if (w1[j] != w2[j]) {
                    if (orderIndex[w1[j] - 'a'] > orderIndex[w2[j] - 'a']) {
                        return false
                    }
                    break
                }
            }
        }
        return true
    }
}
```

```swift
class Solution {
    func isAlienSorted(_ words: [String], _ order: String) -> Bool {
        var orderIndex = [Int](repeating: 0, count: 26)
        for (i, c) in order.enumerated() {
            orderIndex[Int(c.asciiValue! - Character("a").asciiValue!)] = i
        }

        for i in 0..<words.count - 1 {
            let w1 = Array(words[i])
            let w2 = Array(words[i + 1])

            for j in 0..<w1.count {
                if j == w2.count {
                    return false
                }

                if w1[j] != w2[j] {
                    let idx1 = Int(w1[j].asciiValue! - Character("a").asciiValue!)
                    let idx2 = Int(w2[j].asciiValue! - Character("a").asciiValue!)
                    if orderIndex[idx1] > orderIndex[idx2] {
                        return false
                    }
                    break
                }
            }
        }
        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(1)$ since we have $26$ different characters.

> Where $n$ is the number of words and $m$ is the average length of a word.

---

## Common Pitfalls

### Ignoring the Prefix Case

When comparing two words where one is a prefix of the other (e.g., "apple" and "app"), the shorter word must come first. If the longer word appears before its prefix in the list, the order is invalid. Many solutions forget to check this case and only compare differing characters.

### Breaking Too Early or Too Late in Character Comparison

When comparing adjacent words character by character, you must break out of the loop as soon as you find the first differing character. Continuing to compare after finding a difference can lead to incorrect conclusions, as only the first difference determines the relative order of two words.
