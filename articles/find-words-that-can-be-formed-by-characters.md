## 1. Hash Map (Two Pass)

### Intuition

A word can be formed from `chars` if every character in the word appears in `chars` with at least the same frequency. We first count character frequencies in `chars`, then for each word, count its character frequencies and verify that `chars` has enough of each character.

### Algorithm

1. Build a frequency map `count` for all characters in `chars`.
2. For each word:
   - Build a frequency map `cur_word` for the word.
   - Check if every character in `cur_word` has a count less than or equal to its count in `count`.
   - If valid, add the word's length to `res`.
3. Return the total length.

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

```csharp
public class Solution {
    public int CountCharacters(string[] words, string chars) {
        Dictionary<char, int> count = new Dictionary<char, int>();
        foreach (char c in chars) {
            if (!count.ContainsKey(c)) count[c] = 0;
            count[c]++;
        }
        int res = 0;
        foreach (string w in words) {
            Dictionary<char, int> curWord = new Dictionary<char, int>();
            foreach (char c in w) {
                if (!curWord.ContainsKey(c)) curWord[c] = 0;
                curWord[c]++;
            }
            bool good = true;
            foreach (var kvp in curWord) {
                int available = count.ContainsKey(kvp.Key) ? count[kvp.Key] : 0;
                if (kvp.Value > available) {
                    good = false;
                    break;
                }
            }
            if (good) {
                res += w.Length;
            }
        }
        return res;
    }
}
```

```go
func countCharacters(words []string, chars string) int {
    count := make(map[rune]int)
    for _, c := range chars {
        count[c]++
    }
    res := 0
    for _, w := range words {
        curWord := make(map[rune]int)
        for _, c := range w {
            curWord[c]++
        }
        good := true
        for c, cnt := range curWord {
            if cnt > count[c] {
                good = false
                break
            }
        }
        if good {
            res += len(w)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun countCharacters(words: Array<String>, chars: String): Int {
        val count = mutableMapOf<Char, Int>()
        for (c in chars) {
            count[c] = count.getOrDefault(c, 0) + 1
        }
        var res = 0
        for (w in words) {
            val curWord = mutableMapOf<Char, Int>()
            for (c in w) {
                curWord[c] = curWord.getOrDefault(c, 0) + 1
            }
            var good = true
            for ((c, cnt) in curWord) {
                if (cnt > count.getOrDefault(c, 0)) {
                    good = false
                    break
                }
            }
            if (good) {
                res += w.length
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func countCharacters(_ words: [String], _ chars: String) -> Int {
        var count = [Character: Int]()
        for c in chars {
            count[c, default: 0] += 1
        }
        var res = 0
        for w in words {
            var curWord = [Character: Int]()
            for c in w {
                curWord[c, default: 0] += 1
            }
            var good = true
            for (c, cnt) in curWord {
                if cnt > (count[c] ?? 0) {
                    good = false
                    break
                }
            }
            if good {
                res += w.count
            }
        }
        return res
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

### Intuition

Instead of building the complete frequency map for each word first, we can check character availability on the fly. As we iterate through each character of a word, we increment its count in a temporary map and immediately check if it exceeds the available count in `chars`. This allows early termination if a word is invalid.

### Algorithm

1. Build a frequency map `count` for all characters in `chars`.
2. For each word:
   - Initialize an empty frequency map `cur_word`.
   - For each character in the word:
     - Increment its count in `cur_word`.
     - If it exceeds the count in `count`, mark the word as invalid and break.
   - If the word is valid, add its length to `res`.
3. Return the total length.

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

```csharp
public class Solution {
    public int CountCharacters(string[] words, string chars) {
        Dictionary<char, int> count = new Dictionary<char, int>();
        foreach (char c in chars) {
            if (!count.ContainsKey(c)) count[c] = 0;
            count[c]++;
        }
        int res = 0;
        foreach (string w in words) {
            Dictionary<char, int> curWord = new Dictionary<char, int>();
            bool good = true;
            foreach (char c in w) {
                if (!curWord.ContainsKey(c)) curWord[c] = 0;
                curWord[c]++;
                int available = count.ContainsKey(c) ? count[c] : 0;
                if (curWord[c] > available) {
                    good = false;
                    break;
                }
            }
            if (good) {
                res += w.Length;
            }
        }
        return res;
    }
}
```

```go
func countCharacters(words []string, chars string) int {
    count := make(map[rune]int)
    for _, c := range chars {
        count[c]++
    }
    res := 0
    for _, w := range words {
        curWord := make(map[rune]int)
        good := true
        for _, c := range w {
            curWord[c]++
            if curWord[c] > count[c] {
                good = false
                break
            }
        }
        if good {
            res += len(w)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun countCharacters(words: Array<String>, chars: String): Int {
        val count = mutableMapOf<Char, Int>()
        for (c in chars) {
            count[c] = count.getOrDefault(c, 0) + 1
        }
        var res = 0
        for (w in words) {
            val curWord = mutableMapOf<Char, Int>()
            var good = true
            for (c in w) {
                curWord[c] = curWord.getOrDefault(c, 0) + 1
                if (curWord[c]!! > count.getOrDefault(c, 0)) {
                    good = false
                    break
                }
            }
            if (good) {
                res += w.length
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func countCharacters(_ words: [String], _ chars: String) -> Int {
        var count = [Character: Int]()
        for c in chars {
            count[c, default: 0] += 1
        }
        var res = 0
        for w in words {
            var curWord = [Character: Int]()
            var good = true
            for c in w {
                curWord[c, default: 0] += 1
                if curWord[c]! > (count[c] ?? 0) {
                    good = false
                    break
                }
            }
            if good {
                res += w.count
            }
        }
        return res
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

### Intuition

Since we only have lowercase letters, we can use a fixed-size array of 26 elements instead of a hash map. This is more cache-friendly and avoids hash function overhead. We decrement counts as we use characters and reset the array for each new word using a stored original copy.

### Algorithm

1. Create an array `count` of size 26 and populate it with frequencies from `chars`.
2. Store a copy of `count` as `org` for resetting.
3. For each word:
   - For each character, decrement `count[c - 'a']`.
   - If it goes negative, the word is invalid; break early.
   - If valid, add the word's length to `res`.
   - Reset `count` to `org` for the next word.
4. Return the total length.

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

```csharp
public class Solution {
    public int CountCharacters(string[] words, string chars) {
        int[] count = new int[26];
        foreach (char c in chars) {
            count[c - 'a']++;
        }

        int[] org = (int[])count.Clone();
        int res = 0;

        foreach (string w in words) {
            bool good = true;
            foreach (char c in w) {
                int i = c - 'a';
                count[i]--;
                if (count[i] < 0) {
                    good = false;
                    break;
                }
            }
            if (good) {
                res += w.Length;
            }
            for (int i = 0; i < 26; i++) {
                count[i] = org[i];
            }
        }
        return res;
    }
}
```

```go
func countCharacters(words []string, chars string) int {
    count := make([]int, 26)
    for _, c := range chars {
        count[c-'a']++
    }

    org := make([]int, 26)
    copy(org, count)
    res := 0

    for _, w := range words {
        good := true
        for _, c := range w {
            i := c - 'a'
            count[i]--
            if count[i] < 0 {
                good = false
                break
            }
        }
        if good {
            res += len(w)
        }
        copy(count, org)
    }
    return res
}
```

```kotlin
class Solution {
    fun countCharacters(words: Array<String>, chars: String): Int {
        val count = IntArray(26)
        for (c in chars) {
            count[c - 'a']++
        }

        val org = count.copyOf()
        var res = 0

        for (w in words) {
            var good = true
            for (c in w) {
                val i = c - 'a'
                count[i]--
                if (count[i] < 0) {
                    good = false
                    break
                }
            }
            if (good) {
                res += w.length
            }
            for (i in 0 until 26) {
                count[i] = org[i]
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func countCharacters(_ words: [String], _ chars: String) -> Int {
        var count = [Int](repeating: 0, count: 26)
        let aValue = Int(Character("a").asciiValue!)
        for c in chars {
            count[Int(c.asciiValue!) - aValue] += 1
        }

        let org = count
        var res = 0

        for w in words {
            var good = true
            for c in w {
                let i = Int(c.asciiValue!) - aValue
                count[i] -= 1
                if count[i] < 0 {
                    good = false
                    break
                }
            }
            if good {
                res += w.count
            }
            count = org
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + (m * k))$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

> Where $n$ is the length of $chars$, $m$ is the number of words and $k$ is the average length of each word.
